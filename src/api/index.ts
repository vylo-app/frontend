import axios from 'axios';
import {
  CreateProductDto,
  SignInDto,
  SignUpDto,
  UpdateUserDto,
  type Product,
  type User,
  type CreateProductReviewDto,
  type ProductReview,
  type ProductWithMeta,
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

export const fetchProductById = async (id: string): Promise<Product & ProductWithMeta> => {
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

export const getOrders = async () => {
  const res = await api.get('/api/orders');
  return res.data;
};

export const addToOrder = async (productId: string): Promise<void> => {
  const res = await api.post(`/api/order-items/${productId}`);
  return res.data;
};

export const removeFromOrder = async (productId: string): Promise<void> => {
  const res = await api.delete(`/api/order-items/${productId}`);
  return res.data;
};

export const getProductReviews = async (productId: string): Promise<ProductReview[]> => {
  const res = await api.get(`/api/product-reviews/${productId}`);
  return res.data;
};

export const createProductReview = async (data: CreateProductReviewDto): Promise<ProductReview> => {
  const res = await api.post('/api/product-reviews', data);
  return res.data;
};

export const deleteProductReview = async (reviewId: string): Promise<void> => {
  await api.delete(`/api/product-reviews/${reviewId}`);
};

export const getFavorites = async () => {
  const res = await api.get('/api/favorites');
  return res.data;
};

export const addFavorite = async (productId: string) => {
  const res = await api.post(`/api/favorites/${productId}`);
  return res.data;
};

export const removeFavorite = async (productId: string) => {
  const res = await api.delete(`/api/favorites/${productId}`);
  return res.data;
};

export const unfavoriteProduct = async (productId: string): Promise<void> => {
  const res = await api.delete(`/api/favorites/${productId}`);
  return res.data;
};
