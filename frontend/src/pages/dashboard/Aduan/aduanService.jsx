import API from 'api/axiosInstance';

export const getPermohonan = async () => {
  const response = await API.get('/permohonan');
  if (response.data && response.data.success && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return Array.isArray(response.data) ? response.data : [];
};

export const updateStatusPermohonan = async (id, status) => {
  const response = await API.patch(`/permohonan/${id}/status`, { status });
  return response.data;
};

export const getKeberatan = async () => {
  const response = await API.get('/keberatan');
  if (response.data && response.data.success && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return Array.isArray(response.data) ? response.data : [];
};

export const updateStatusKeberatan = async (id, statusKeberatan) => {
  const response = await API.patch(`/keberatan/${id}/status`, { statusKeberatan });
  return response.data;
};