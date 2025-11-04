// src/components/layout/BottomTabBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { Home, ArrowUp, Settings } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

const tabs = [
  {
    name: '쉼터 위치',
    href: ROUTES.HOME,
    icon: Home,
  },
  {
    name: '증상도우미',
    href: ROUTES.HELPER,
    icon: ArrowUp,
  },
  {
    name: '설정',
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];

export function BottomTabBar() {
  const location = useLocation();
  const pathname = location.pathname;
  
  return (
    <nav className="bg-blue-50 border-t border-blue-100 shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.name}
              to={tab.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full transition-colors
                ${
                  isActive
                    ? 'text-blue-700'
                    : 'text-blue-600 hover:text-blue-700'
                }
              `}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-caption">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}