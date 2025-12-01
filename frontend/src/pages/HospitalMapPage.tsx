// src/pages/HospitalMapPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft } from 'lucide-react';
import { KakaoMap } from '@/components/map/KakaoMap';
import { SearchBar } from '@/components/ui/SearchBar';
import { fetchNearbyHospitals } from '@/api/hospitalApi';
import type { HospitalGroup } from '@/types/hospital';
import { HospitalIcon, EmergencyHospitalIcon } from '@/assets/icons';
import { ROUTES } from '@/lib/constants/routes';

export default function HospitalMapPage() {
  const navigate = useNavigate();

  // 지도 중심 좌표 state
  const [mapCenter, setMapCenter] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });

  const [hospitalGroups, setHospitalGroups] = useState<HospitalGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<HospitalGroup | null>(null);
  const [loading, setLoading] = useState(false);

  // 현재 위치 가져오기 및 근처 병원 조회
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ latitude, longitude });

          // 근처 병원 조회
          try {
            setLoading(true);
            const groups = await fetchNearbyHospitals(latitude, longitude, 2000);
            setHospitalGroups(groups);
          } catch (error) {
            console.error('근처 병원 조회 실패:', error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearchBarFocus = () => {
    navigate(ROUTES.HOSPITAL_SEARCH);
  };

  const handleMarkerClick = (group: HospitalGroup) => {
    setSelectedGroup(group);
  };

  const handleCloseModal = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="relative w-full h-screen bg-background">
      {/* 상단 헤더 */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center px-4 py-3">
          <button onClick={handleBack} className="mr-2">
            <ChevronLeft size={24} className="text-foreground" />
          </button>
          <h1 className="text-h3 text-foreground">내 주변 병원</h1>
        </div>
      </div>

      {/* 지도 */}
      <div className="absolute top-[60px] left-0 right-0 bottom-0">
        <KakaoMap
          width="100%"
          height="100%"
          latitude={mapCenter.latitude}
          longitude={mapCenter.longitude}
          level={3}
          useCustomMarker={true}
        />
      </div>

      {/* 검색바 오버레이 */}
      <div className="absolute top-[72px] left-0 right-0 z-10 px-4">
        <SearchBar
          value=""
          onChange={() => {}}
          onFocus={handleSearchBarFocus}
          leftIcon={<Search size={20} className="text-blue-900" />}
          placeholder="병원을 검색하세요."
          readOnly={true}
        />
      </div>

      {/* 로딩 표시 */}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-white px-6 py-3 rounded-full shadow-lg">
          <p className="text-body text-foreground">근처 병원 검색 중...</p>
        </div>
      )}

      {/* 병원 그룹 정보 모달 */}
      {selectedGroup && (
        <HospitalGroupModal group={selectedGroup} onClose={handleCloseModal} />
      )}
    </div>
  );
}

// 병원 그룹 모달 컴포넌트
interface HospitalGroupModalProps {
  group: HospitalGroup;
  onClose: () => void;
}

function HospitalGroupModal({ group, onClose }: HospitalGroupModalProps) {
  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* 모달 */}
      <div className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[70vh] overflow-hidden">
        {/* 드래그 핸들 */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 모달 내용 */}
        <div className="px-6 pb-6 overflow-y-auto max-h-[calc(70vh-32px)]">
          <h2 className="text-h3 font-bold text-foreground mb-2">
            이 위치의 병원 ({group.hospitals.length})
          </h2>
          <p className="text-body-small text-foreground/60 mb-4">
            {group.addrRoad || group.addrJibun}
          </p>

          {/* 병원 리스트 */}
          <div className="space-y-3">
            {group.hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="p-4 bg-blue-50 border border-blue-200 rounded-2xl"
              >
                <div className="flex items-start gap-3">
                  {/* 병원 아이콘 */}
                  <div className="shrink-0">
                    {hospital.hasEmergencyRoom ? (
                      <EmergencyHospitalIcon size={40} />
                    ) : (
                      <HospitalIcon size={40} />
                    )}
                  </div>

                  {/* 병원 정보 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-body font-bold text-foreground flex-1">
                        {hospital.name}
                      </h3>
                      {hospital.hasEmergencyRoom && (
                        <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-caption rounded-full shrink-0">
                          응급실
                        </span>
                      )}
                    </div>

                    <div className="space-y-1">
                      <p className="text-body-small text-foreground/70">
                        {hospital.addrRoad}
                      </p>
                      {hospital.distanceM !== undefined && (
                        <p className="text-body-small text-blue-600 font-semibold">
                          약 {hospital.distanceM}m
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 bg-blue-100 text-blue-900 rounded-full text-body-small font-semibold border border-blue-300 hover:bg-blue-200">
                        길찾기
                      </button>
                      <button className="flex-1 py-2 bg-white text-foreground rounded-full text-body-small font-semibold border border-gray-300 hover:bg-gray-50">
                        전화
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
