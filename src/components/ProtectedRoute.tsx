// src/components/ProtectedRoute.tsx
import { useAuth } from '@/context/Auth';
import { Navigate } from '@tanstack/react-router';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>; // or a spinner

  if (!accessToken) return <Navigate to="/login" />;

  return <>{children}</>;
};
