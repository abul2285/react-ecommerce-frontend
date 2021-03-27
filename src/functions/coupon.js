import axios from 'axios';

const createCoupon = async (coupon, authtoken) => {
  return await axios.post('/coupon', coupon, { headers: { authtoken } });
};

const deleteCoupon = async (couponId, authtoken) => {
  return await axios.delete(`/coupon/${couponId}`, { headers: { authtoken } });
};

const getCoupons = async () => {
  return await axios.get('/coupons');
};

export { createCoupon, deleteCoupon, getCoupons };
