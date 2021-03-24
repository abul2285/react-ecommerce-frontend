import axios from 'axios';

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    '/create-or-update-user',
    {},
    { headers: { authToken } }
  );
};

export const currentUser = async (authToken) => {
  return await axios.post('/current-user', {}, { headers: { authToken } });
};

export const currentAdmin = async (authToken) => {
  return await axios.post('/current-admin', {}, { headers: { authToken } });
};
