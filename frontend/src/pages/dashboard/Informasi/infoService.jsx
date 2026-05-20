import API from 'api/axiosInstance';
const API_BASE_URL = '/informasi';

export const InfoService = {
  getAllInformasi: async () => {
    return await API.get(API_BASE_URL);
  },

  createInformasi: async (formData) => {
    return await API.post(API_BASE_URL, formData);
  },

  updateInformasi: async (id, formData) => {
    return await API.put(`${API_BASE_URL}/${id}`, formData);
  },

  deleteInformasi: async (id, kategori) => {
    return await API.delete(`${API_BASE_URL}/${id}?kategori=${kategori}`);
  }
};