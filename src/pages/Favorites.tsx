import { useEffect, useState } from 'react';
import { getFavorites, unfavoriteProduct } from '@/api';
import { type Product } from '@vylo-app/shared-contract';
import { Header } from '@/components/Header';
import { BottomNavigation } from '@/components/BottomNavigation';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function Favorites() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleUnfavorite = async (productId: string) => {
    try {
      await unfavoriteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch {
      alert('Failed to remove from favorites');
    }
  };

  useEffect(() => {
    const fetchFavoritesWithDetails = async () => {
      try {
        const favoriteList = await getFavorites();
        setProducts(favoriteList);
      } catch {
        console.error('Failed to load favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritesWithDetails();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading favorites...</p>;

  return (
    <div style={{ paddingBottom: '55px' }}>
      <Header />
      <div className="max-w-md mx-auto px-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">Favorites</h1>
        {products.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded p-4 flex justify-between items-start hover:bg-muted relative"
              >
                <div
                  className="cursor-pointer w-full"
                  onClick={() => navigate({ to: `/products/${product.id}` })}
                >
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive ml-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnfavorite(product.id);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNavigation />
    </div>
  );
}
