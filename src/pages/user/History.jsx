import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../functions/user';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    loadAllOrders();
  }, []);

  const showOrders = () => {
    orders.map((order) => {
      return (
        <div key={order._id} className='m-5 p-3 cart'>
          <p>Show payment inof</p>
        </div>
      );
    });
  };

  const loadAllOrders = () =>
    getUserOrders(auth.token).then((res) => setOrders(res.data));
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-7'>
          <div className='text-center'>
            {orders.lenght < 0 ? <p>No order history</p> : <p>Order history</p>}
          </div>
          {showOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
