import axios from 'axios';

const userCart = async (cart, authtoken) => {
  return await axios.post('/user/cart', { cart }, { headers: { authtoken } });
};

const getUserCart = async (authtoken) => {
  return await axios.get('/user/cart', { headers: { authtoken } });
};
const getUserOrders = async (authtoken) => {
  return await axios.get('/user/orders', { headers: { authtoken } });
};

const emptyUserCart = async (authtoken) => {
  return await axios.delete('/user/cart', { headers: { authtoken } });
};

const saveUserAddress = async (address, authtoken) => {
  return await axios.post(
    '/user/address',
    { address },
    { headers: { authtoken } }
  );
};

const userCoupon = async (coupon, authtoken) => {
  return await axios.post('/user/cart/coupon', coupon, {
    headers: { authtoken },
  });
};

const createOrder = async (stripeResponse, authtoken) => {
  return await axios.post(
    '/user/order',
    { stripeResponse },
    {
      headers: { authtoken },
    }
  );
};

export {
  userCart,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  userCoupon,
  createOrder,
  getUserOrders,
};
