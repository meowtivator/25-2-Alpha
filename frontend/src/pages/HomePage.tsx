// src/pages/HomePage.tsx
import { KakaoMap } from '@/components/map/KakaoMap';

export default function HomePage() {
  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      {/* 지도 - 화면 높이에서 하단 탭바(4rem) 제외 */}
      <KakaoMap
        width="100%"
        height="100%"
        latitude={37.5665}
        longitude={126.9780}
        level={3}
      />
    </div>
  );
}