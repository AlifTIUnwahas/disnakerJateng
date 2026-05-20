import API from 'api/axiosInstance';
const API_BASE_URL = '/bursa-kerja';

export const getAllBursaKerja = async () => {
  const response = await API.get(API_BASE_URL);
  return response.data;
};
export const getBursaKerjaById = async (id) => {
  const response = await API.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const createBursaKerja = async (payload) => {
  const response = await API.post(API_BASE_URL, payload);
  return response.data.data;
};

export const updateBursaKerja = async (id, payload) => {
  const response = await API.put(`${API_BASE_URL}/${id}`, payload);
  return response.data.data;
};

export const deleteBursaKerja = async (id) => {
  const response = await API.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};