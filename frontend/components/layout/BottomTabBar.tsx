"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { LucideAArrowUp, LucideHome, LucideSettings } from "lucide-react";

const tabs = [
  {
    name: "쉼터 위치",
    href: ROUTES.HOME,
    icon: LucideHome,
  },
  {
    name: "증상도우미",
    href: ROUTES.HELPER,
    icon: LucideAArrowUp,
  },
  {
    name: "설정",
    href: ROUTES.SETTINGS,
    icon: LucideSettings,
  },
];

//export default와 export의 차이
export function BottomTabBar(){
  const pathname = usePathname();

  return (
    <nav className="bg-blue-50 border-t border-blue-100 shadow-lg">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`
                flex flex-col items-center justify-center flex-1 h-full transition-colors
                ${isActive
                  ? "text-blue-700"
                  : "text-blue-600 hover:text-blue-700"
                }
              `}
            >
              <span className="text-2xl mb-1">{tab.icon}</span>
              <span className="text-caption">{tab.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}