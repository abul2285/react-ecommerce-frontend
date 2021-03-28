import React, { useEffect, useState } from 'react';
import AdminNav from '../../components/nav/AdminNav';
import { getOrders, updateStatus } from '../../functions/admin';
import { useSelector } from 'react-redux';
import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState();
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = () =>
    getOrders(auth.token).then((res) => {
      setOrders(res.data);
    });

  const handleOrderStatus = (orderId, orderStatus) => {
    updateStatus(orderId, orderStatus, auth.token).then((res) => {
      setOrderStatus(res.data);
      loadAllOrders();
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <Orders orders={orders} handleOrderStatus={handleOrderStatus} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
