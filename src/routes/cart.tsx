import { CartPage } from '@/pages/Cart';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CartPage />;
}
