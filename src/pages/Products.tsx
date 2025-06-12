import { useEffect, useState } from 'react';
import { type Product } from '@vylo-app/shared-contract';
import { fetchProducts } from '@/api';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Link } from '@tanstack/react-router';

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <h1 className="text-3xl font-bold">Products</h1>
        {products.map((product) => (
          <Link
            to="/products/$productId"
            params={{ productId: product.id }}
            key={product.id}
            className="block p-4 border rounded-xl shadow-sm hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
          </Link>
        ))}
      </div>

      <BottomNavigation />
    </>
  );
}
