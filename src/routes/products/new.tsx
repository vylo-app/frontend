import NewProductPage from '@/pages/NewProduct';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/new')({
  component: NewProducts,
});

function NewProducts() {
  return <NewProductPage />;
}
