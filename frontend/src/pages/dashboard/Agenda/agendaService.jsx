import axios from "axios";

const BASE_URL = "http://localhost:5000/api/agenda";

export const getAllAgenda = async () => {
  const response = await axios.get(BASE_URL);
  return response.data.data;
};
export const getAgendaById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};
export const createAgenda = async (formData) => {
  const response = await axios.post(BASE_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};
export const updateAgenda = async (id, formData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};
export const deleteAgenda = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};