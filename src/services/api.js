import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('video', file);
  const response = await api.post('/controllers/videoController', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const getVideos = async () => {
  const response = await api.get('/api/videos');
  return response.data;
};

export const deleteVideo = async (id) => {
  const response = await api.delete(`/api/videos/${id}`);
  return response.data;
};