// src/pages/SearchPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import type { ShelterSearchItem } from '@/types/shelter';
import { SearchResultItemModal } from '@/components/search/SearchResultItemModal';
import { AlertIcon } from '@/assets/icons';
import { searchShelters, fetchShelterDetail } from '@/api/shelterApi';
import { ROUTES } from '@/lib/constants/routes';

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ShelterSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await searchShelters(value, 0, 20);
      setSearchResults(response.content);
    } catch (err) {
      console.error('쉼터 검색 실패:', err);
      setError('검색에 실패했습니다. 다시 시도해주세요.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = async (shelterId: number) => {
    try {
      const shelterDetail = await fetchShelterDetail(shelterId);
      navigate(ROUTES.HOME, {
        state: {
          selectedShelter: shelterDetail,
        },
      });
    } catch (err) {
      console.error('쉼터 정보 조회 실패:', err);
      alert('쉼터 정보를 불러오는데 실패했습니다.');
    }
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

      <button className="ml-3 px-5 py-2 text-caption rounded-full border-2 border-blue-200 text-foreground mb-3">
        최근 검색
        {/* TODO: onClick={() => 최근 검색 기록} */}
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
              <div className="">
                {searchResults.map((result) => (
                  <SearchResultItemModal
                    key={result.id}
                    name={result.name}
                    address={result.shortAddress}
                    detailAddress={result.addrRoad}
                    onNavigate={() => handleNavigate(result.id)}
                  />
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
            <AlertIcon
              size={60}
              className="text-blue-900"
            />
            <p className="text-alert text-foreground py-4">
              쉼터의 이름, 주소를 검색하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
