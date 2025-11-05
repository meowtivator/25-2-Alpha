// src/pages/SearchPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, CircleAlert } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import { SearchResultItem } from '@/components/search/SearchResultItem';
import { SearchResultItemModal } from '@/components/search/SearchResultItemModal';

// 쉼터 검색 결과 타입 정의
interface ShelterResult {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  operatingHours?: string;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ShelterResult[]>([]);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동 (HomePage)
  };

  const handleSearch = (value: string) => {
    console.log('검색:', value);
    // TODO: 실제 API 호출 및 검색 로직
    // 임시 결과 - 실제 데이터 형식에 맞춤
    setSearchResults([
      {
        id: '1',
        name: '정릉1동경로당',
        address: '서울 성북구 정릉동',
        detailAddress: '서울 성북구 정릉로 123',
        phone: '02-1234-5678',
        operatingHours: '09:00 - 18:00',
      },
      {
        id: '2',
        name: '정릉2동노인정',
        address: '서울 성북구 정릉동',
        detailAddress: '서울 성북구 정릉로 456',
        phone: '02-2345-6789',
        operatingHours: '10:00 - 17:00',
      },
      {
        id: '3',
        name: '정릉3동경로당',
        address: '서울 성북구 정릉동',
        detailAddress: '서울 성북구 정릉로 789',
      },
      {
        id: '4',
        name: '정릉푸르지오(아)경로당',
        address: '서울 성북구 정릉동',
      },
    ]);
  };

  const handleNavigate = (shelter: ShelterResult) => {
    console.log('길찾기:', shelter);
    // TODO: 선택한 쉼터 정보를 가지고 지도 페이지로 이동
    navigate('/', { state: { selectedShelter: shelter } });
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] bg-background">
      {/* 검색바 */}
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
        onBack={handleBack}
        leftIcon={<ChevronLeft size={30} className="text-blue-900" />}
        rightIcon={<X size={20} className="text-blue-900" />}
        placeholder="쉼터를 검색하세요."
        autoFocus={true}
      />

      <button 
        className="ml-3 px-5 py-2 text-caption rounded-full border-2 border-blue-200 text-foreground mb-3"
      >
        최근 검색
        {/* TODO: onClick={() => 최근 검색 기록} */}
      </button>
      {/* 검색 결과 영역 */}
      <div className="overflow-y-auto h-[calc(100%-76px)]">
        {searchValue ? (
          <div className="px-4 py-3">
            <p className="text-sm text-foreground/60 mb-3">
              '{searchValue}' 검색 결과 {searchResults.length}개
            </p>

            {/* 검색 결과 리스트 */}
            {searchResults.length > 0 ? (
              <div className="">
                {searchResults.map((result) => (
                  <SearchResultItem
                    key={result.id}
                    name={result.name}
                    address={result.address}
                    detailAddress={result.detailAddress}
                    phone={result.phone}
                    operatingHours={result.operatingHours}
                    onNavigate={() => handleNavigate(result)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-foreground/60 py-8">
                검색 결과가 없습니다
              </p>
            )}
          </div>
        ) : (
          <div className='flex flex-col relative top-2/5 items-center justify-center'>
            <CircleAlert size={60} strokeWidth={1.5} className='text-blue-900'/>
            <p className="text-center text-foreground py-4">
              쉼터의 이름, 주소를 검색하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
