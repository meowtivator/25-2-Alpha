// src/pages/HomePage.tsx
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { KakaoMap } from '@/components/map/KakaoMap';
import { SearchBar } from '@/components/ui/SearchBar';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchBarFocus = () => {
    navigate('/search'); // 검색 페이지로 이동
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* 지도 - 화면 높이에서 하단 탭바(4rem) 제외 */}
      <KakaoMap
        width="100%"
        height="100%"
        latitude={37.5665}
        longitude={126.9780}
        level={3}
      />

      {/* 검색바 오버레이 - 클릭하면 검색 페이지로 이동 */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <SearchBar
          value=""
          onChange={() => {}} // 읽기 전용이므로 빈 함수
          onFocus={handleSearchBarFocus} // input 클릭 시 검색 페이지로 이동
          leftIcon={<Search size={20} className="text-blue-900" />}
          placeholder="쉼터 위치를 검색하세요."
          readOnly={true} // 읽기 전용
        />
      </div>
    </div>
  );
}