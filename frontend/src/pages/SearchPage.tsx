// src/pages/SearchPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { SearchBar } from '@/components/ui/SearchBar';
import type { ShelterSearchItem } from '@/types/shelter';
import { SearchResultItemModal } from '@/components/search/SearchResultItemModal';
import { RecentSearchItemComponent } from '@/components/search/RecentSearchItemComponent';
import { AlertIcon } from '@/assets/icons';
import { searchShelters, fetchShelterDetail } from '@/api/shelterApi';
import { ROUTES } from '@/lib/constants/routes';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/stores/settingsStore';

export default function SearchPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    showColdShelters,
    addRecentSearch,
    removeRecentSearch,
    recentSearchesHeat,
    recentSearchesCold,
  } = useSettingsStore();
  const seasonType = showColdShelters ? 'COLD' : 'HEAT';
  const recentSearches = showColdShelters ? recentSearchesCold : recentSearchesHeat;
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ShelterSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorKey, setErrorKey] = useState<'searchFailed' | null>(null);
  const [showRecentSearches, setShowRecentSearches] = useState(false);

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
      const response = await searchShelters(value, seasonType, undefined, 0, 20);
      setSearchResults(response.content);

      // 검색어를 최근 검색에 추가
      addRecentSearch(
        {
          type: 'keyword',
          name: value,
        },
        seasonType
      );
    } catch (err) {
      console.error('쉼터 검색 실패:', err);
      setErrorKey('searchFailed');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = async (shelterId: number, shelterName?: string, shelterAddress?: string) => {
    try {
      const shelterDetail = await fetchShelterDetail(shelterId, seasonType);

      // 장소를 최근 검색에 추가
      addRecentSearch(
        {
          type: 'shelter',
          shelterId: shelterId,
          name: shelterName || shelterDetail.name,
          address: shelterAddress || shelterDetail.addrRoad,
        },
        seasonType
      );

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

  // 최근 검색 아이템 선택 핸들러
  const handleRecentSearchSelect = async (item: typeof recentSearches[0]) => {
    if (item.type === 'shelter' && item.shelterId) {
      // 장소인 경우 해당 장소로 이동
      await handleNavigate(item.shelterId, item.name, item.address);
    } else if (item.type === 'keyword') {
      // 검색어인 경우 해당 검색어로 검색
      setSearchValue(item.name);
      await handleSearch(item.name);
    }
  };

  // 최근 검색 아이템 삭제 핸들러
  const handleRecentSearchRemove = (id: string) => {
    removeRecentSearch(id, seasonType);
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

      <button
        onClick={() => setShowRecentSearches(!showRecentSearches)}
        className="ml-3 px-5 py-2 text-caption rounded-full border-2 border-blue-200 text-foreground mb-3"
      >
        {t('recentSearch')}
      </button>

      {/* 검색 결과 영역 */}
      <div className="overflow-y-auto h-[calc(100%-76px)]">
        {showRecentSearches && !searchValue ? (
          // 최근 검색 표시
          <div>
            {recentSearches.length > 0 ? (
              <div className="divide-y divide-blue-100">
                {recentSearches.map((item) => (
                  <RecentSearchItemComponent
                    key={item.id}
                    item={item}
                    onSelect={() => handleRecentSearchSelect(item)}
                    onRemove={() => handleRecentSearchRemove(item.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col relative top-2/5 items-center justify-center">
                <AlertIcon size={60} className="text-blue-900" />
                <p className="text-alert text-foreground py-4">
                  {t('noRecentSearches')}
                </p>
              </div>
            )}
          </div>
        ) : searchValue ? (
          // 검색 결과 표시
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
                    onNavigate={() => handleNavigate(result.id, result.name, result.shortAddress)}
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
          // 기본 화면 (검색 힌트)
          <div className="flex flex-col relative top-2/5 items-center justify-center">
            <AlertIcon size={60} className="text-blue-900" />
            <p className="text-alert text-foreground py-4">
              {t('searchHint')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
