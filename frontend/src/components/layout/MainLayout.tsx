// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { BottomTabBar } from './BottomTabBar';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 pb-16">
        <Outlet /> {/* 페이지 컴포넌트가 여기에 렌더링됩니다 */}
      </main>
      
      {/* 하단 탭바 (고정) */}
      <div className="fixed bottom-0 left-0 right-0">
        <BottomTabBar />
      </div>
    </div>
  );
}