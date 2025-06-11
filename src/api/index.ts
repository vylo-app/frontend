import axios from 'axios';
import { SignInDto, SignUpDto } from '@vylo-app/shared-contract';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

export const signIn = async (data: SignInDto) => {
  const res = await api.post('/api/auth/sign-in', data, { withCredentials: true });
  return res.data;
};

export const signOut = async () => {
  return api.post('/api/auth/logout');
};

export const refresh = async () => {
  const res = await api.post('/api/auth/refresh');
  return res.data;
};

export const signUp = async (data: SignUpDto) => {
  const res = await api.post('/api/auth/sign-up', data);
  return res.data;
};
