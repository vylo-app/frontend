import { useEffect, useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { addToCart, fetchProductById } from '@/api';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    price: number;
  } | null;
}

export function ProductPage() {
  const { productId } = useParams('/products/$productId');
  const [product, setProduct] = useState<Product | null>(null);
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

  const handleAddToCart = async () => {
    if (!product) return;
    setAdding(true);
    try {
      await addToCart(product.id);
      alert('Added to cart');
    } catch {
      alert('Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading product...</p>;
  if (error || !product)
    return <p className="text-center mt-20 text-red-500">{error || 'Not found'}</p>;

  return (
    <>
      <div className="max-w-md mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-6">
          Price: ${product.price?.price.toFixed(2) || '0.00'}
        </p>

        <Button onClick={handleAddToCart} disabled={adding}>
          {adding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </div>

      <BottomNavigation />
    </>
  );
}
