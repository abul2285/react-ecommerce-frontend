import React, { useEffect, useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../functions/user';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import OrderInfo from '../../components/cards/OrderInfo';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Invoice from '../../components/order/Invoice.jsx';

const History = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    loadAllOrders();
  }, []);

  const showPDFLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName='invoice.pdf'
      className='btn btn-sm btn-block btn-outlined-primary'>
      DownLoad PDF
    </PDFDownloadLink>
  );

  const showOrderInTable = (order) => (
    <table className='table table-border'>
      <thead className='thead-light'>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Count</th>
          <th>Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products.map((p) => (
          <tr key={p._id}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>${p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === 'Yes' ? (
                <CheckCircleOutlined className='text-success' />
              ) : (
                <CloseCircleOutlined className='text-danger' />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showOrders = () =>
    orders.reverse().map((order) => (
      <div key={order._id} className='m-5 p-3 cart'>
        <OrderInfo orderStatus={order.orderStatus} {...order.paymentIntent} />
        {showOrderInTable(order)}
        <div className='row'>
          <div className='col'>{showPDFLink(order)}</div>
        </div>
      </div>
    ));

  const loadAllOrders = () =>
    getUserOrders(auth.token).then((res) => setOrders(res.data));
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>
          <UserNav />
        </div>
        <div className='col-md-7 text-center'>
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
