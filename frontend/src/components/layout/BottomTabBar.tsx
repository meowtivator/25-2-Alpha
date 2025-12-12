// src/components/layout/BottomTabBar.tsx
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MarkerIcon, SettingIcon, SymptomsIcon } from '@/assets/icons';
import { ROUTES } from '@/lib/constants/routes';
import { useSettingsStore } from '@/stores/settingsStore';

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
  const { t, i18n } = useTranslation();
  const { textSize } = useSettingsStore();

  // Hide icons for Vietnamese and English when text size is large
  const shouldHideIcon = textSize === 'large' && (i18n.language === 'vi' || i18n.language === 'en');

  return (
    <nav className="bg-blue-50 border-t border-blue-100 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map(({ labelKey, href, icon: Icon }) => {
          const isActive = pathname === href;
          // Settings 아이콘은 항상 표시, 나머지는 shouldHideIcon 조건 적용
          const showIcon = labelKey === 'settings' || !shouldHideIcon;

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
              <div className="w-6 h-6 mb-1 flex items-center justify-center">
                {showIcon && <Icon className="w-6 h-6" />}
              </div>
              <span className="text-caption text-center whitespace-pre-line wrap-break-word">{t(labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
