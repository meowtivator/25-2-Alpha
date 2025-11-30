// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useKakaoLoader } from 'react-kakao-maps-sdk';

import { MainLayout } from '@/components/layout/MainLayout';
import OnboardingPage from '@/pages/OnboardingPage';
import HomePage from '@/pages/HomePage';
import HelperPage from '@/pages/HelperPage';
import DiagnosisResultPage from '@/pages/DiagnosisResultPage';
import GuidelinePage from '@/pages/GuidelinePage';
import SettingsPage from '@/pages/SettingsPage';
import SearchPage from '@/pages/SearchPage';
import { ROUTES } from '@/lib/constants/routes';
import { useSettingsStore } from '@/stores/settingsStore';
import { ENV } from '@/config/env';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

function App() {
  const typographyMode = useSettingsStore((state) => state.typographyMode);

  // 카카오맵 API 로드
  const [loading, error] = useKakaoLoader({
    appkey: ENV.KAKAO_MAP_KEY,
    libraries: ['services', 'clusterer'],
  });

  // ⭐ 초기 로드 시 저장된 모드 적용
  useEffect(() => {
    document.body.classList.remove('typography-default', 'typography-senior');
    document.body.classList.add(`typography-${typographyMode}`);
  }, [typographyMode]);

  // 카카오맵 로딩 중
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="text-h2 text-foreground mb-2">로딩 중...</div>
          <div className="text-body text-foreground/60">
            지도를 불러오는 중입니다.
          </div>
        </div>
      </div>
    );
  }

  // 카카오맵 로드 에러
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="text-h2 text-red-600 mb-2">오류 발생</div>
          <div className="text-body text-foreground/60">
            카카오맵을 불러오는 중 오류가 발생했습니다.
          </div>
          <div className="text-body-small text-foreground/40 mt-2">
            환경 변수 VITE_KAKAO_MAP_KEY를 확인하세요.
          </div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* 온보딩 페이지 - MainLayout 없이 전체 화면 */}
          <Route path={ROUTES.ONBOARDING} element={<OnboardingPage />} />

          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.HELPER} element={<HelperPage />} />
            <Route
              path={ROUTES.DIAGNOSIS_RESULT}
              element={<DiagnosisResultPage />}
            />
            <Route path={ROUTES.GUIDELINE} element={<GuidelinePage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
          {/* 검색 페이지 - MainLayout 없이 전체 화면 */}
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path="*" element={<Navigate to={ROUTES.ONBOARDING} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
