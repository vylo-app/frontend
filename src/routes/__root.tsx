import { AuthProvider } from '@/context/Auth';
import { RootLayout } from '@/layout/RootLayout';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <AuthProvider>
        <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
      </AuthProvider>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </RootLayout>
  ),
});
