// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { KakaoMap } from '@/components/map/KakaoMap';
import { SearchBar } from '@/components/ui/SearchBar';
import { ShelterInfoModal } from '@/components/map/ShelterInfoModal';
import type { ShelterResult } from '@/types/shelter';
import { ROUTES } from '@/lib/constants/routes';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // 지도 중심 좌표 state
  const [mapCenter, setMapCenter] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });

  // 선택된 쉼터 state (마커 라벨 표시용)
  const [selectedShelter, setSelectedShelter] = useState<ShelterResult | null>(
    null,
  );

  // SearchPage에서 전달받은 state 처리
  useEffect(() => {
    const state = location.state as { selectedShelter?: ShelterResult };

    if (state?.selectedShelter) {
      const shelter = state.selectedShelter;

      // 백엔드에서 좌표를 제공하므로 바로 사용
      setMapCenter({
        latitude: shelter.latitude,
        longitude: shelter.longitude,
      });

      // 선택된 쉼터 저장 (마커 라벨 표시용)
      setSelectedShelter(shelter);

      console.log('선택된 쉼터:', shelter);

      // state 초기화 (뒤로가기 시 다시 표시 방지)
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSearchBarFocus = () => {
    navigate(ROUTES.SEARCH); // 검색 페이지로 이동
  };

  const handleCloseModal = () => {
    setSelectedShelter(null);
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* 지도 - 화면 높이에서 하단 탭바(4rem) 제외 */}
      <KakaoMap
        width="100%"
        height="100%"
        latitude={mapCenter.latitude}
        longitude={mapCenter.longitude}
        level={3}
        useCustomMarker={true}
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

      {/* 쉼터 정보 모달 - 선택된 쉼터가 있을 때만 표시 */}
      {selectedShelter && (
        <ShelterInfoModal
          shelter={selectedShelter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
