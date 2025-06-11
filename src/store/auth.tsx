import { create } from 'zustand';
import { refresh } from '@/api';

interface AuthStore {
  accessToken: string | null;
  isLoading: boolean;
  refreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  isLoading: true,
  refreshToken: async () => {
    set({ isLoading: true });
    try {
      const res = await refresh();
      set({ accessToken: res.data.accessToken });
    } catch {
      set({ accessToken: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
