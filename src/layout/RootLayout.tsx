import { useAuthStore } from '@/store/auth';
import { useEffect, type ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { isLoading, isAuthenticated, initializeAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/sign-in' });
    }
  }, [isLoading, isAuthenticated, navigate]);

  return (
    <>
      <div className="min-h-screen">{children}</div>
    </>
  );
};
