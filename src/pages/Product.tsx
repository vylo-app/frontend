import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { addToOrder, fetchProductById, removeFromOrder } from '@/api';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { type Product, type ProductWithMeta } from '@vylo-app/shared-contract';
import { Header } from '@/components/Header';

export function ProductPage() {
  const { productId } = useParams({ from: '/products/$productId' });
  const [product, setProduct] = useState<(Product & ProductWithMeta) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetchProductById(productId);
        setProduct(res);
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleToggleCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      if (product.isInCart) {
        await removeFromOrder(product.id);
        setProduct({ ...product, isInCart: false });
      } else {
        await addToOrder(product.id);
        setProduct({ ...product, isInCart: true });
      }
    } catch {
      alert('Failed to update cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (error || !product)
    return <p className="text-center mt-20 text-red-500">{error || 'Not found'}</p>;

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-6">
          {/* Price: ${product.price?.price.toFixed(2) || '0.00'} */}
        </p>

        <Button
          onClick={handleToggleCart}
          disabled={adding}
          className="cursor-pointer"
          variant={product?.isInCart ? 'outline' : 'default'}
        >
          {adding
            ? product?.isInCart
              ? 'Removing...'
              : 'Adding...'
            : product?.isInCart
              ? 'Remove from Cart'
              : 'Add to Cart'}
        </Button>
      </div>

      <BottomNavigation />
    </>
  );
}
