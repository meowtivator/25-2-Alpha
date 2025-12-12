// src/pages/HospitalSearchPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import type { HospitalSearchItem } from '@/types/hospital';
import { AlertIcon, HospitalIcon, EmergencyHospitalIcon } from '@/assets/icons';
import { searchHospitals } from '@/api/hospitalApi';
import { ROUTES } from '@/lib/constants/routes';

export default function HospitalSearchPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<HospitalSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);

  // 사용자 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          console.log('📍 사용자 현재 위치:', { lat: latitude, lon: longitude });
        },
        (error) => {
          console.error('❌ 위치 정보를 가져올 수 없습니다:', error);
        }
      );
    }
  }, []);

  // 두 지점 간의 거리 계산 (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // 지구 반지름 (미터)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // 미터 단위로 반환
  };

  const handleBack = () => {
    // 증상 결과 페이지로 이동 (DiagnosisResultPage)
    navigate(ROUTES.DIAGNOSIS_RESULT);
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchHospitals(value, 0, 20);
      setSearchResults(response.content);
    } catch (err) {
      console.error('병원 검색 실패:', err);
      setError('검색에 실패했습니다. 다시 시도해주세요.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (hospital: HospitalSearchItem) => {
    // 디버깅: 선택된 병원 정보 출력
    console.group('🏥 선택된 병원 정보');
    console.log('병원 ID:', hospital.id);
    console.log('병원 이름:', hospital.name);
    console.log('위치 (위도):', hospital.lat);
    console.log('위치 (경도):', hospital.lon);
    console.log('짧은 주소:', hospital.shortAddress);
    console.log('응급실 여부:', hospital.hasEmergencyRoom);
    console.log('거리 (미터):', hospital.distanceM);
    console.log('전체 객체:', hospital);
    console.groupEnd();

    // 병원 위치로 지도 이동
    navigate(ROUTES.HOSPITAL_MAP, {
      state: {
        selectedHospital: hospital,
      },
    });
  };

  return (
    <div className="w-full h-screen bg-background">
      {/* 검색바 */}
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
        onBack={handleBack}
        leftIcon={<ChevronLeft size={30} className="text-blue-900" />}
        rightIcon={<X size={20} className="text-blue-900" />}
        placeholder="병원을 검색하세요."
        autoFocus={true}
      />

      <button className="ml-3 px-5 py-2 text-caption rounded-full border-2 border-blue-200 text-foreground mb-3">
        최근 검색
      </button>

      {/* 검색 결과 영역 */}
      <div className="overflow-y-auto h-[calc(100%-76px)]">
        {searchValue ? (
          <div className="px-4 py-3">
            {loading ? (
              <p className="text-alert text-foreground/60 py-8 text-center">
                검색 중...
              </p>
            ) : error ? (
              <p className="text-alert text-red-600 py-8 text-center">
                {error}
              </p>
            ) : searchResults.length > 0 ? (
              <div className="space-y-3">
                {searchResults.map((hospital) => (
                  <div
                    key={hospital.id}
                    onClick={() => handleNavigate(hospital)}
                    className="p-4 bg-white border border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* 병원 아이콘 */}
                      <div className="flex-shrink-0">
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
                            <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-caption rounded-full flex-shrink-0">
                              응급실
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-body-small text-foreground/70">
                            {hospital.shortAddress}
                          </p>
                          {userLocation && (
                            <p className="text-body-small text-blue-600 font-semibold">
                              약 {calculateDistance(
                                userLocation.lat,
                                userLocation.lon,
                                hospital.lat,
                                hospital.lon
                              )}m
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-alert text-foreground/60 py-8 text-center">
                검색 결과가 없습니다
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-col relative top-2/5 items-center justify-center">
            <AlertIcon size={60} className="text-blue-900" />
            <p className="text-alert text-foreground py-4">
              병원 이름, 주소를 검색하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
