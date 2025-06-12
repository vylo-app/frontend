import { HomeIcon, MagnifyingGlassIcon, PlusIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link, useRouter } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/products', label: 'Search', icon: MagnifyingGlassIcon },
  { to: '/products/new', label: 'Publish', icon: PlusIcon },
  { to: '/profile', label: 'Profile', icon: PersonIcon },
];

export const BottomNavigation = () => {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                'flex flex-col items-center text-xs transition-colors',
                isActive ? 'text-black font-semibold' : 'text-muted-foreground'
              )}
            >
              <Icon className="h-5 w-5 mb-0.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
