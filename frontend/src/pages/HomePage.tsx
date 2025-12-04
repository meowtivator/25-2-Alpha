// src/pages/HomePage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { SearchBar } from '@/components/ui/SearchBar';
import { ShelterInfoModal } from '@/components/map/ShelterInfoModal';
import { MarkerIcon, CurrentLocationIcon } from '@/assets/icons';
import type { ShelterDetail } from '@/types/shelter';
import { ROUTES } from '@/lib/constants/routes';
import { useSettingsStore } from '@/stores/settingsStore';

export default function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { autoLocateOnLaunch } = useSettingsStore();
  const { t } = useTranslation();
  const mapLabel = t('mapArea');
  const markerLabel = t('shelterMarker');

  // 지도 중심 좌표 state
  const [mapCenter, setMapCenter] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });

  // 선택된 쉼터 state (마커 표시용)
  const [selectedShelter, setSelectedShelter] = useState<ShelterDetail | null>(
    null,
  );

  // 모달 표시 여부 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 사용자 현재 위치 state
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // 사용자 현재 위치 가져오기
  useEffect(() => {
    // autoLocateOnLaunch가 꺼져있으면 위치 탐색 안 함
    if (!autoLocateOnLaunch) {
      console.log('📍 자동 위치 탐색이 비활성화되어 있습니다.');
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          console.log('✅ 사용자 현재 위치:', { latitude, longitude });

          // 검색에서 선택한 쉼터가 없으면 현재 위치로 지도 중심 설정
          if (!selectedShelter) {
            setMapCenter({ latitude, longitude });
          }
        },
        (error) => {
          console.error('❌ 위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, [selectedShelter, autoLocateOnLaunch]);

  // SearchPage에서 전달받은 state 처리
  useEffect(() => {
    const state = location.state as { selectedShelter?: ShelterDetail };

    if (state?.selectedShelter) {
      const shelter = state.selectedShelter;

      // 백엔드에서 좌표를 제공하므로 바로 사용
      setMapCenter({
        latitude: shelter.lat,
        longitude: shelter.lon,
      });

      // 선택된 쉼터 저장 (마커 표시용)
      setSelectedShelter(shelter);

      // 모달 열기
      setIsModalOpen(true);

      console.log('선택된 쉼터:', shelter);

      // state 초기화 (뒤로가기 시 다시 표시 방지)
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  const handleSearchBarFocus = () => {
    navigate(ROUTES.SEARCH); // 검색 페이지로 이동
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달만 닫기 (마커는 유지)
  };

  const handleMarkerClick = () => {
    setIsModalOpen(true); // 마커 클릭 시 모달 열기
  };

  return (
    <div className="relative w-full h-[calc(100vh-4rem)]">
      {/* 지도 - 화면 높이에서 하단 탭바(4rem) 제외 */}
      <div role="region" aria-label={mapLabel} className='w-full h-full'>
        <Map
          center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
          style={{ width: '100%', height: '100%' }}
          level={3}
        >
          {/* 사용자 현재 위치 마커 */}
          {userLocation && (
            <CustomOverlayMap
              position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
              yAnchor={0.5}
            >
              <div className="transform" role="img" aria-label={t('currentLocation')}>
                <CurrentLocationIcon size={24} />
              </div>
            </CustomOverlayMap>
          )}

          {/* 선택된 쉼터 마커 */}
          {selectedShelter && (
            <CustomOverlayMap
              position={{ lat: selectedShelter.lat, lng: selectedShelter.lon }}
              yAnchor={1}
            >
              <div
                onClick={handleMarkerClick}
                className="cursor-pointer transform hover:scale-110 transition-transform"
                role="button"
                aria-label={markerLabel}
              >
                <MarkerIcon className="text-blue-900" size={35} />
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>

      {/* 검색바 오버레이 - 클릭하면 검색 페이지로 이동 */}
      <div className="absolute top-0 left-0 right-0 z-20">
        <SearchBar
          value=""
          onChange={() => {}} // 읽기 전용이므로 빈 함수
          onFocus={handleSearchBarFocus} // input 클릭 시 검색 페이지로 이동
          leftIcon={<Search size={20} className="text-blue-900" />}
          placeholder={t('searchShelterPlaceholder')}
          readOnly={true} // 읽기 전용
        />
      </div>

      {/* 쉼터 정보 모달 - 모달이 열려있고 선택된 쉼터가 있을 때만 표시 */}
      {isModalOpen && selectedShelter && (
        <ShelterInfoModal
          shelter={selectedShelter}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
