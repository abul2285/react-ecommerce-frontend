import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../../functions/stripe';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DollarOutlined, CheckOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart } from '../../functions/user';

export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const {
    user: { auth },
    coupon,
  } = useSelector((state) => ({ ...state }));
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payAble, setPayAble] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent(coupon, auth.token)
      .then((res) => {
        console.log({ res });
        setClientSecret(res.data.clientSecret);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayAble(res.data.payAble);
      })
      .catch((err) => console.log({ err }));
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      createOrder(payload, auth.token).then((res) => {
        if (res.data.ok) {
          localStorage.removeItem('cart');
          dispatch({ type: 'EMPTY_CART' });
          dispatch({ type: 'APPLIED_COUPON', payload: false });
          emptyUserCart(auth.token);
        }
      });
    }
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount ? (
            <p className='alert alert-success'>
              Total after discount : {totalAfterDiscount}
            </p>
          ) : (
            <p className='alert alert-danger'>No coupon applied</p>
          )}
        </div>
      )}
      <div class='row py-2 m-0 mb-3 '>
        <h4 className='col text-center text-info '>
          Total : <DollarOutlined />
          {cartTotal}
        </h4>
        <h4 className='col text-ceter text-success '>
          Payable : <CheckOutlined />
          {(payAble / 100).toFixed(2)}
        </h4>
      </div>
      <form id='payment-form' onSubmit={handleSubmit}>
        <CardElement
          id='card-element'
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id='submit'>
          <span id='button-text'>
            {processing ? (
              <div className='spinner' id='spinner'></div>
            ) : (
              'Pay now'
            )}
          </span>
        </button>
        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className='card-error' role='alert'>
            {error}
          </div>
        )}
        {/* Show a success message upon completion */}
        <p className={succeeded ? 'result-message' : 'result-message hidden'}>
          Payment succeeded, see the result in your
          <Link to='/user/history'>purchase history</Link>
          Refresh the page to pay again.
        </p>
      </form>
    </>
  );
}
