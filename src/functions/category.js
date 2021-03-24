import axios from 'axios';

export const createCategory = async (name, authtoken) => {
  return await axios.post('/category', name, { headers: { authtoken } });
};

export const getCategory = async (slug) => {
  return await axios.get(`/category/${slug}`);
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(`/category/${slug}`, category, {
    headers: { authtoken },
  });
};

export const deleteCategory = async (slug, authtoken) => {
  return await axios.delete(`/category/${slug}`, { headers: { authtoken } });
};

export const getCategories = async () => {
  return await axios.get('/categories');
};
