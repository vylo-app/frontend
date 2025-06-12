import { useEffect, useState } from 'react';
import { api, getCart } from '@/api';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';

interface CartItem {
  id: string;
  product: {
    name: string;
    description: string;
    price: {
      price: number;
    } | null;
  };
}

interface Order {
  id: string;
  amount: number;
  totalPrice: number;
  items: CartItem[];
}

export function CartPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setOrders(res.data || []);
    } catch {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await api.delete(`/order-items/${itemId}`);
      await fetchCart();
    } catch {
      console.error('Failed to remove item');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading cart...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <>
      <div className="max-w-xl mx-auto mt-20 px-4">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="mb-10 border rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2">Order ID: {order.id}</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="border p-3 rounded">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.description}</p>
                    <p className="text-sm mt-1">
                      Price: ${item.product.price?.price.toFixed(2) || '0.00'}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-right text-base font-bold">
                Total: ${order.totalPrice.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      <BottomNavigation />
    </>
  );
}
