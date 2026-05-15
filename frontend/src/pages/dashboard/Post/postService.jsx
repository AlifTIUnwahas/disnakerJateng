import axios from 'axios';

const API_BASE_URL = "http://localhost:5000/api/admin/berita";

export const PostService = {
  getAll: () => axios.get(API_BASE_URL),

  getById: (id) => axios.get(`${API_BASE_URL}/${id}`),

  create: (data) => axios.post(API_BASE_URL, data),

  update: (id, data) => axios.put(`${API_BASE_URL}/${id}`, data),

  delete: (id) => axios.delete(`${API_BASE_URL}/${id}`),
  
  create: (formData) => axios.post(API_BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  update: (id, formData) => axios.put(`${API_BASE_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};