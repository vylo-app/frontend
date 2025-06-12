import { create } from 'zustand';
import { refresh } from '@/api';

interface AuthStore {
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshToken: () => Promise<void>;
  logout: () => void;
  setAccessToken: (token: string) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isLoading: true,
  isAuthenticated: false,

  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const res = await refresh();
      set({
        accessToken: res.accessToken,
        isAuthenticated: true,
      });
    } catch {
      set({
        accessToken: null,
        isAuthenticated: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  setAccessToken: (token: string) => {
    set({ accessToken: token, isAuthenticated: true });
  },

  logout: () => {
    set({
      accessToken: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      set({ accessToken: null, isAuthenticated: false, isLoading: false });
      return;
    }

    set({ accessToken: token, isLoading: true });
    try {
      const res = await refresh();
      set({
        accessToken: res.accessToken,
        isAuthenticated: true,
      });
      localStorage.setItem('accessToken', res.accessToken);
    } catch {
      localStorage.removeItem('accessToken');
      set({ accessToken: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
