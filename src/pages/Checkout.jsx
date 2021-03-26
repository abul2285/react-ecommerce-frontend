import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCart, emptyUserCart, saveUserAddress } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [addressSave, setAddressSave] = useState(false);
  const { auth } = useSelector((state) => state.user);

  useEffect(() => {
    getUserCart(auth.token)
      .then((res) => {
        console.log({ res });
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const emptyCart = () => {
    emptyUserCart(auth.token).then((res) => {
      localStorage.removeItem('cart');
      dispatch({ type: 'EMPTY_CART' });
      notification.success({
        title: 'Cart is Empty. Go to Shopping',
        description: 'Cart is Empty. Go to Shopping',
      });
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(address, auth.token).then((res) => {
      console.log({ res });
      if (res.data.ok) {
        setAddressSave(true);
        notification.success({
          title: 'Address Saved Successfully',
          description: 'Address Saved Successfully',
        });
      }
    });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <h4>Delivery Address</h4>
          <ReactQuill value={address} onChange={setAddress} />
          <button
            onClick={saveAddressToDb}
            className='btn btn-primary btn-raised'>
            Save
          </button>
          <hr />
        </div>
        <div className='col-md-6'>
          <h4>Order Summary</h4>
          <hr />
          <p>products {products.length}</p>
          <hr />
          {products.map((p) => (
            <div key={p._id}>
              <p>
                {p.product.title} {p.color} x {p.product.count} = $
                {p.product.price * p.count}{' '}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total : ${total}</p>
          <hr />
          <div className='row'>
            <div className='col-md-6'>
              <button
                className='btn btn-primary'
                disabled={!products.length || !addressSave}>
                Place Order
              </button>
            </div>
            <div className='col-md-6'>
              <button className='btn btn-primary' onClick={emptyCart}>
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
