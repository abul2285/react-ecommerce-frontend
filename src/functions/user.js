import axios from 'axios';

const userCart = async (cart, authtoken) => {
  return await axios.post('/user/cart', { cart }, { headers: { authtoken } });
};
const getUserCart = async (authtoken) => {
  return await axios.get('/user/cart', { headers: { authtoken } });
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

export { userCart, getUserCart, emptyUserCart, saveUserAddress };
