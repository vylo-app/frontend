import { ProfilePage } from '@/pages/Profile';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/profile')({
  component: Profile,
  beforeLoad: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function Profile() {
  return <ProfilePage />;
}
