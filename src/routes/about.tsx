import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuthStore } from '@/store/auth';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
  beforeLoad: async () => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken === null) {
      throw redirect({ to: '/login' });
    }
  },
});

function About() {
  return (
    <ProtectedRoute>
      <div className="p-2">Hello from About!</div>
    </ProtectedRoute>
  );
}
