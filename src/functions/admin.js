import axios from 'axios';

const getOrders = async (authtoken) => {
  return await axios.get('/admin/orders', { headers: { authtoken } });
};

const updateStatus = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    '/admin/update-status',
    { orderId, orderStatus },
    { headers: { authtoken } }
  );
};

export { getOrders, updateStatus };
