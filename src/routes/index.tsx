import { HomePage } from '@/pages/Home';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function Home() {
  return <HomePage />;
}
