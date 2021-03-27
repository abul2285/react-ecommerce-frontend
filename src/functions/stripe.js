import axios from 'axios';

const createPaymentIntent = async (coupon, authtoken) =>
  await axios.post(
    '/create-payment-intent',
    { couponApplied: coupon },
    { headers: { authtoken } }
  );

export { createPaymentIntent };
