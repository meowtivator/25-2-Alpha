// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MainLayout } from '@/components/layout/MainLayout';
import HomePage from '@/pages/HomePage';
import HelperPage from '@/pages/HelperPage';
import SettingsPage from '@/pages/SettingsPage';
import { ROUTES } from '@/lib/constants/routes';
import { useSettingsStore } from '@/stores/settingsStore';

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
  
  // ⭐ 초기 로드 시 저장된 모드 적용
  useEffect(() => {
    document.body.classList.remove('typography-default', 'typography-senior');
    document.body.classList.add(`typography-${typographyMode}`);
  }, [typographyMode]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.HELPER} element={<HelperPage />} />
            <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;