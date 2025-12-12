// src/pages/OnboardingPage.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';
import AppLogo from '@/assets/icons/AppLogo.svg';

export default function OnboardingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // 2초 후 홈 페이지로 자동 이동
    const timer = setTimeout(() => {
      navigate(ROUTES.HOME);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      {/* 앱 로고 */}
      <div className="mb-8">
        <img src={AppLogo} alt="앱 로고" />
      </div>

      {/* 앱 이름 */}
      <h1 className="text-h1 text-center text-foreground">
        온쉼 : 계절 쉼터 지도
      </h1>
    </div>
  );
}
