import React from 'react';

const OrderInfo = ({
  id,
  amount,
  currency,
  payment_method_types,
  status,
  created,
  orderStatus,
}) => {
  return (
    <div>
      <p>
        <span>Order ID : {id}</span> {' / '}
        <span>
          Amount :{' '}
          {(amount /= 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </span>
        {' / '}
        <span>Currency : {currency.toUpperCase()}</span> {' / '}
        <span>Method : {payment_method_types[0]}</span> {' / '}
        <span>Payment : {status.toUpperCase()}</span> {' / '}
        <span>Order On: {new Date(created * 1000).toLocaleString()}</span>{' '}
        {' / '}
        <span className='badge badge-primary text-white'>
          Status : {orderStatus}
        </span>
      </p>
    </div>
  );
};

export default OrderInfo;
