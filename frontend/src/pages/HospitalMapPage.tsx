// src/pages/HospitalMapPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ChevronLeft } from 'lucide-react';
import { Map, CustomOverlayMap } from 'react-kakao-maps-sdk';
import { SearchBar } from '@/components/ui/SearchBar';
import { fetchNearbyHospitals } from '@/api/hospitalApi';
import type { HospitalGroup, HospitalSearchItem } from '@/types/hospital';
import { HospitalIcon, EmergencyHospitalIcon } from '@/assets/icons';
import { ROUTES } from '@/lib/constants/routes';
import { useSettingsStore } from '@/stores/settingsStore';

export default function HospitalMapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { autoLocateOnLaunch } = useSettingsStore();

  // 지도 중심 좌표 state
  const [mapCenter, setMapCenter] = useState({
    latitude: 37.5665,
    longitude: 126.978,
  });

  const [hospitalGroups, setHospitalGroups] = useState<HospitalGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<HospitalGroup | null>(null);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<HospitalSearchItem | null>(null);

  // 페이지 초기화 - 검색에서 선택한 병원 또는 현재 위치
  useEffect(() => {
    if (isInitialized) return; // 이미 초기화되었으면 실행하지 않음

    const state = location.state as { selectedHospital?: HospitalSearchItem };

    const initializeMap = async () => {
      if (state?.selectedHospital) {
        // 디버깅: HospitalSearchPage에서 전달받은 병원 정보
        console.group('📍 HospitalMapPage - 전달받은 병원 정보');
        console.log('병원 이름:', state.selectedHospital.name);
        console.log('위도:', state.selectedHospital.lat);
        console.log('경도:', state.selectedHospital.lon);
        console.log('전체 객체:', state.selectedHospital);
        console.groupEnd();

        const hospital = state.selectedHospital;

        // 선택된 병원 좌표로 지도 중심 설정
        setMapCenter({
          latitude: hospital.lat,
          longitude: hospital.lon,
        });

        // 선택된 병원 마커 표시를 위해 state 설정
        setSelectedHospital(hospital);

        console.log('🗺️ 지도 중심 설정:', { lat: hospital.lat, lon: hospital.lon });

        // 사용자 현재 위치 가져오기 (거리 계산용)
        // autoLocateOnLaunch가 켜져있을 때만 위치 탐색
        if (autoLocateOnLaunch && navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lon: longitude });
              console.log('✅ 사용자 현재 위치 (거리 계산용):', { lat: latitude, lon: longitude });

              // 사용자 위치 기준으로 근처 병원 조회
              try {
                setLoading(true);
                console.log('🔍 사용자 위치 기준 근처 병원 조회 시작...');
                const groups = await fetchNearbyHospitals(latitude, longitude, 2000);
                console.log('✅ 조회된 병원 그룹:', groups.length, '개');
                setHospitalGroups(groups);
              } catch (error) {
                console.error('❌ 근처 병원 조회 실패:', error);
              } finally {
                setLoading(false);
              }
            },
            async (error) => {
              console.error('❌ 위치 정보를 가져올 수 없습니다. 선택한 병원 좌표 사용:', error);
              // 위치 정보를 가져올 수 없으면 선택한 병원 좌표 사용
              try {
                setLoading(true);
                console.log('🔍 선택한 병원 좌표 기준 근처 병원 조회...');
                const groups = await fetchNearbyHospitals(hospital.lat, hospital.lon, 2000);
                console.log('✅ 조회된 병원 그룹:', groups.length, '개');
                setHospitalGroups(groups);
              } catch (err) {
                console.error('❌ 근처 병원 조회 실패:', err);
              } finally {
                setLoading(false);
              }
            }
          );
        } else if (!autoLocateOnLaunch) {
          // 자동 위치 탐색이 꺼져있으면 선택한 병원 좌표 기준으로 조회
          console.log('📍 자동 위치 탐색이 비활성화되어 선택한 병원 좌표 사용');
          try {
            setLoading(true);
            const groups = await fetchNearbyHospitals(hospital.lat, hospital.lon, 2000);
            console.log('✅ 조회된 병원 그룹:', groups.length, '개');
            setHospitalGroups(groups);
          } catch (err) {
            console.error('❌ 근처 병원 조회 실패:', err);
          } finally {
            setLoading(false);
          }
        }

        // state 초기화 (뒤로가기 시 다시 표시 방지)
        navigate(location.pathname, { replace: true, state: {} });
      } else if (autoLocateOnLaunch && navigator.geolocation) {
        // 검색에서 선택한 병원이 없고 자동 위치 탐색이 켜져있으면 현재 위치 사용
        console.log('📍 현재 위치 가져오기 시작...');
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log('✅ 현재 위치:', { latitude, longitude });

            setMapCenter({ latitude, longitude });
            setUserLocation({ lat: latitude, lon: longitude });

            // 근처 병원 조회
            try {
              setLoading(true);
              console.log('🔍 현재 위치 근처 병원 조회 시작...');
              const groups = await fetchNearbyHospitals(latitude, longitude, 2000);
              console.log('✅ 조회된 병원 그룹:', groups.length, '개');
              setHospitalGroups(groups);
            } catch (error) {
              console.error('❌ 근처 병원 조회 실패:', error);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.error('❌ 위치 정보를 가져올 수 없습니다:', error);
          }
        );
      } else {
        // 자동 위치 탐색이 꺼져있으면 기본 좌표 유지
        console.log('📍 자동 위치 탐색이 비활성화되어 기본 좌표 사용');
      }

      setIsInitialized(true);
    };

    initializeMap();
  }, [location.state, navigate, location.pathname, isInitialized, autoLocateOnLaunch]);

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
        <Map
          center={{ lat: mapCenter.latitude, lng: mapCenter.longitude }}
          style={{ width: '100%', height: '100%' }}
          level={4}
        >
          {/* 병원 그룹 마커들 */}
          {hospitalGroups.map((group, index) => {
            // 그룹 내 응급실 병원이 있는지 확인
            const hasEmergency = group.hospitals.some(h => h.hasEmergencyRoom);

            return (
              <CustomOverlayMap
                key={`${group.lat}-${group.lon}-${index}`}
                position={{ lat: group.lat, lng: group.lon }}
                yAnchor={1}
              >
                <div
                  onClick={() => handleMarkerClick(group)}
                  className="cursor-pointer transform hover:scale-110 transition-transform"
                >
                  {hasEmergency ? (
                    <EmergencyHospitalIcon size={35} />
                  ) : (
                    <HospitalIcon size={35} />
                  )}
                </div>
              </CustomOverlayMap>
            );
          })}

          {/* 검색에서 선택된 병원 마커 (더 크고 눈에 띄게) */}
          {selectedHospital && (
            <CustomOverlayMap
              position={{ lat: selectedHospital.lat, lng: selectedHospital.lon }}
              yAnchor={1}
            >
              <div
                onClick={() => {
                  // 선택된 병원의 그룹을 생성하여 모달 표시
                  const hospitalGroup: HospitalGroup = {
                    lat: selectedHospital.lat,
                    lon: selectedHospital.lon,
                    addrRoad: selectedHospital.shortAddress,
                    addrJibun: '',
                    hospitals: [
                      {
                        id: selectedHospital.id,
                        name: selectedHospital.name,
                        addrRoad: selectedHospital.shortAddress,
                        addrJibun: '',
                        lat: selectedHospital.lat,
                        lon: selectedHospital.lon,
                        hasEmergencyRoom: selectedHospital.hasEmergencyRoom,
                        distanceM: selectedHospital.distanceM,
                      },
                    ],
                  };
                  handleMarkerClick(hospitalGroup);
                }}
                className="cursor-pointer transform hover:scale-110 transition-transform"
              >
                {selectedHospital.hasEmergencyRoom ? (
                  <EmergencyHospitalIcon size={50} />
                ) : (
                  <HospitalIcon size={50} />
                )}
              </div>
            </CustomOverlayMap>
          )}
        </Map>
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
