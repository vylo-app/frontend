import { ProductPage } from '@/pages/Product';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/products/$productId')({
  component: Product,
});

function Product() {
  return <ProductPage />;
}
