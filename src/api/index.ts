import axios from 'axios';
import {
  CreateProductDto,
  SignInDto,
  SignUpDto,
  UpdateUserDto,
  type Product,
  type User,
} from '@vylo-app/shared-contract';
import { useAuthStore } from '@/store/auth';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await api.get('/api/products');
  return res.data;
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const res = await api.get(`/api/products/${id}`);
  return res.data;
};

export const createProduct = async (data: CreateProductDto): Promise<Product> => {
  const res = await api.post('/api/products', data);
  return res.data;
};

export const getProfile = async (): Promise<User> => {
  const res = await api.get('/api/users/me');
  return res.data;
};

export const updateProfile = async (data: UpdateUserDto): Promise<User> => {
  const res = await api.patch('/api/users/me', data);
  return res.data;
};
