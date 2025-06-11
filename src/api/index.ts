import axios from 'axios';
import { LoginDto } from '@vylo-app/shared-contract';

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL,
  withCredentials: true, // required for sending cookies (like refresh token)
});

// Optional: Inject access token if needed
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('access_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

export const login = async (dto: LoginDto) => {
  const res = await api.post('/auth/login', dto);
  return res.data;
};

export const logout = async () => {
  return api.post('/auth/logout');
};

export const refresh = async () => {
  const res = await api.post('/auth/refresh');
  return res.data;
};
