import API from 'api/axiosInstance';
 
const API_BASE_URL = '/admin/berita';
 
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
 
export const PostService = {
  getAll: () =>
    API.get(API_BASE_URL, { headers: authHeaders() }),
  getById: (id) =>
    API.get(`${API_BASE_URL}/${id}`, { headers: authHeaders() }),
  create: (data) =>
    API.post(API_BASE_URL, data, { headers: authHeaders() }),
  update: (id, data) =>
    API.put(`${API_BASE_URL}/${id}`, data, { headers: authHeaders() }),
  delete: (id) =>
    API.delete(`${API_BASE_URL}/${id}`, { headers: authHeaders() }),
};