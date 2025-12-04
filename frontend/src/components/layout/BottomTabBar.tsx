// src/components/layout/BottomTabBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MarkerIcon, SettingIcon, SymptomsIcon } from '@/assets/icons';
import { ROUTES } from '@/lib/constants/routes';

const tabs = [
  {
    labelKey: 'centerLocations',
    href: ROUTES.HOME,
    icon: MarkerIcon,
  },
  {
    labelKey: 'symptomChecker',
    href: ROUTES.HELPER,
    icon: SymptomsIcon,
  },
  {
    labelKey: 'settings',
    href: ROUTES.SETTINGS,
    icon: SettingIcon,
  },
] as const;

export function BottomTabBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useTranslation();

  return (
    <nav className="bg-blue-50 border-t border-blue-100 shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map(({ labelKey, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              to={href}
              draggable={false}
              className={`
                flex flex-col items-center justify-center flex-1 h-full transition-colors
                ${
                  isActive
                    ? 'text-blue-900'
                    : 'text-blue-200 hover:text-blue-500'
                }
              `}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-caption">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
