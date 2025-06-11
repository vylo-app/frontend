import { ProtectedRoute } from '@/components/ProtectedRoute';

export const About = () => {
  return (
    <ProtectedRoute>
      <div>About</div>
    </ProtectedRoute>
  );
};
