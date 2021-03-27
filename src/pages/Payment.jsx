import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/forms/CheckoutForm';
import '../stripe.css';

// load stripe outside of components render to avoiding recreating stripe object in every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Payment = () => {
  return (
    <div className='container p-5 text-center stripe-payment'>
      <h4>Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className='col-md-8 offset-md-2'>
          <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
