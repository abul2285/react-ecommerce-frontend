import { Button, Input, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  userCoupon,
  createCashOrder,
} from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const dispatch = useDispatch();
  const [address, setAddress] = useState('');
  const [addressSave, setAddressSave] = useState(false);
  const { auth } = useSelector((state) => state.user);
  const COD = useSelector((state) => state.COD);
  const couponApplied = useSelector((state) => state.coupon);
  const [coupon, setCoupon] = useState();

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
      setCoupon('');
      setTotalAfterDiscount(0);
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

  const applyCoupon = () => {
    userCoupon({ coupon }, auth.token).then((res) => {
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({ type: 'APPLIED_COUPON', payload: false });
      }
      if (res.data.totalAfterDiscount) {
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        dispatch({ type: 'APPLIED_COUPON', payload: true });
      }
    });
  };

  const handleCashOnDelivery = () => {
    createCashOrder(couponApplied, COD, auth.token).then((res) => {
      if (res.data.ok) {
        localStorage.removeItem('cart');
        dispatch({ type: 'EMPTY_CART' });
        dispatch({ type: 'COD', payload: false });
        dispatch({ type: 'APPLIED_COUPON', payload: false });
        emptyUserCart(auth.token);
        setTimeout(() => {
          history.push('/user/history');
        }, 1000);
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
          <h4>Got Coupon?</h4>
          <Input
            size='large'
            onChange={(e) => {
              setDiscountError('');
              setCoupon(e.target.value);
            }}
            value={coupon}
          />
          <Button onClick={applyCoupon} type='link'>
            Apply
          </Button>
          {discountError && <p className='bg-danger'>{discountError}</p>}
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
          {totalAfterDiscount > 0 && (
            <p className='bg-success'>
              Coupon Appliyed: Total payable ${totalAfterDiscount}
            </p>
          )}
          <hr />
          <div className='row'>
            <div className='col-md-6'>
              {COD ? (
                <button
                  className='btn btn-primary'
                  onClick={handleCashOnDelivery}
                  disabled={!products.length || !addressSave}>
                  Place Order
                </button>
              ) : (
                <button
                  className='btn btn-primary'
                  onClick={() => history.push('/payment')}
                  disabled={!products.length || !addressSave}>
                  Place Order
                </button>
              )}
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
