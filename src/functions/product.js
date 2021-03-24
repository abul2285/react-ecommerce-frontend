import axios from 'axios';

export const createProduct = async (product, authtoken) => {
  return await axios.post('/product', product, { headers: { authtoken } });
};

export const deleteProduct = async (slug, authtoken) => {
  return await axios.delete(`/product/${slug}`, { headers: { authtoken } });
};

export const getCategorySubs = async (_id) => {
  return await axios.get(`/category/subs/${_id}`);
};

export const getProductsByCount = async (count) => {
  return await axios.get(`/products/${count}`);
};

export const getProduct = async (slug) => {
  return await axios.get(`/product/${slug}`);
};

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(`/product/${slug}`, product, {
    headers: { authtoken },
  });
};

// WITHOUT PAGINATION
// export const getProducts = async (sort, order, limit) => {
//   return await axios.post(`/products`, { sort, order, limit });
// };

// WITH PAGINATION
export const getProducts = async (sort, order, page) => {
  return await axios.post(`/products`, { sort, order, page });
};

export const getProductsCount = async () => {
  return await axios.get(`/products/total`);
};
