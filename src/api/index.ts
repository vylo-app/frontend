import axios from 'axios';
import { LoginDto } from '@vylo-app/shared-contract';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export const login = async (data: LoginDto) => {
  const res = await api.post('/api/auth/login', data, { withCredentials: true });
  return res.data;
};

export const logout = async () => {
  return api.post('/auth/logout');
};

export const refresh = async () => {
  const res = await api.post('/api/auth/refresh');
  return res.data;
};
