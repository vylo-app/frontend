// src/components/Header.tsx
import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';
import { getCartCount } from '@/api';

export function Header() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartCount = await getCartCount();
        setCount(cartCount);
      } catch (error) {
        console.error('Failed to load cart count:', error);
      }
    };

    loadCart();
  }, []);

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold">
        AI Marketplace
      </Link>
      <Link to="/cart" className="relative">
        <ShoppingCart className="w-6 h-6" />
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            {count}
          </span>
        )}
      </Link>
    </header>
  );
}
