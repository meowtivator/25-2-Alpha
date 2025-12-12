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
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/stores/settingsStore';

export default function SearchPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const showColdShelters = useSettingsStore((state) => state.showColdShelters);
  const seasonType = showColdShelters ? 'winter' : 'summer';
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ShelterSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<'searchFailed' | null>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      setSearchResults([]);
      setErrorKey(null);
      return;
    }

    try {
      setLoading(true);
      setErrorKey(null);
      const response = await searchShelters(value, 0, 20, seasonType);
      setSearchResults(response.content);
    } catch (err) {
      console.error('쉼터 검색 실패:', err);
      setErrorKey('searchFailed');
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
      alert(t('shelterDetailFetchFailed'));
    }
  };

  return (
    <div className="w-full h-[calc(100vh-env(safe-area-inset-bottom))] bg-background">
      {/* 검색바 */}
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onSubmit={handleSearch}
        onBack={handleBack}
        leftIcon={<ChevronLeft size={30} className="text-blue-900" />}
        rightIcon={<X size={20} className="text-blue-900" />}
        placeholder={t('searchShelterPlaceholder')}
        autoFocus={true}
      />

      <button className="ml-3 px-5 py-2 text-caption rounded-full border-2 border-blue-200 text-foreground mb-3">
        {t('recentSearch')}
        {/* TODO: onClick={() => 최근 검색 기록} */}
      </button>
      {/* 검색 결과 영역 */}
      <div className="overflow-y-auto h-[calc(100%-76px)]">
        {searchValue ? (
          <div className="px-4 py-3">
            {loading ? (
              <p className="text-alert text-foreground/60 py-8 text-center">
                {t('searching')}
              </p>
            ) : errorKey ? (
              <p className="text-alert text-red-600 py-8 text-center">
                {t(errorKey)}
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
                {t('noSearchResults')}
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
              {t('searchHint')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
