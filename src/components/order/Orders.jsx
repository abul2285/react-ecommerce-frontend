import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const orderStatuses = [
  'Not Processed',
  'Processing',
  'Dispatched',
  'Cancelled',
  'Completed',
];

const Orders = ({ orders, handleOrderStatus }) => {
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
          <th>Order Status</th>
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
            <td>
              <select
                className='form-control'
                defaultValue={order.orderStatus}
                onChange={(e) => handleOrderStatus(order._id, e.target.value)}>
                {orderStatuses.map((status) => (
                  <option value={status}>{status}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return orders.map((order) => (
    <div key={order._id} className='m-5 p-3 cart'>
      {showOrderInTable(order)}
    </div>
  ));
};

export default Orders;
