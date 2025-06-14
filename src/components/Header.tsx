import { Link } from '@tanstack/react-router';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <Link to="/" className="text-xl font-bold">
        AI Marketplace
      </Link>
      <Link to="/cart" className="relative">
        <ShoppingCart className="w-6 h-6" />
      </Link>
    </header>
  );
}
