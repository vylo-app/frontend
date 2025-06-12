import { AboutPage } from '@/pages/About';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
  beforeLoad: async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken === null) {
      throw redirect({ to: '/sign-in' });
    }
  },
});

function About() {
  return <AboutPage />;
}
