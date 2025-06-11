import { useAuthStore } from '@/store/auth';
import { Navigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    useAuthStore.getState().refreshToken();
  }, []);

  const { accessToken, isLoading } = useAuthStore();
  if (isLoading) return <div>Loading...</div>; // or a spinner

  if (accessToken === null) return <Navigate to="/login" />;
  return <>{children}</>;
};
