import axios from 'axios';

export const createSub = async (name, authtoken) => {
  return await axios.post('/sub', name, { headers: { authtoken } });
};

export const getSub = async (slug) => {
  return await axios.get(`/sub/${slug}`);
};

export const updateSub = async (slug, category, authtoken) => {
  return await axios.put(`/sub/${slug}`, category, {
    headers: { authtoken },
  });
};

export const deleteSub = async (slug, authtoken) => {
  return await axios.delete(`/sub/${slug}`, { headers: { authtoken } });
};

export const getSubs = async () => {
  return await axios.get('/subs');
};
