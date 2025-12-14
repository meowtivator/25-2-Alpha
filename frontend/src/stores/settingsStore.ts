// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TypographyMode = 'default' | 'senior';
type SeasonType = 'HEAT' | 'COLD';

// 최근 검색 아이템 타입
export interface RecentSearchItem {
  id: string; // 고유 ID (timestamp 기반)
  type: 'shelter' | 'keyword'; // 장소 또는 검색어
  shelterId?: number; // 장소인 경우 쉼터 ID
  name: string; // 표시할 이름
  address?: string; // 장소인 경우 주소
  timestamp: number; // 검색 시간
}

// store(저장소)의 구조
interface SettingsStore {
  // 타이포그래피 모드
  typographyMode: TypographyMode;
  setTypographyMode: (mode: TypographyMode) => void;

  // 지도 설정
  textSize: 'default' | 'large';
  setTextSize: (size: 'default' | 'large') => void;

  showSeniorFacilities: boolean;
  setShowSeniorFacilities: (show: boolean) => void;

  showColdShelters: boolean;
  setShowColdShelters: (show: boolean) => void;

  // 앱 설정
  language: string;
  setLanguage: (lang: string) => void;

  autoLocateOnLaunch: boolean;
  setAutoLocateOnLaunch: (auto: boolean) => void;

  // 최근 검색 (HEAT/COLD 별로 분리)
  recentSearchesHeat: RecentSearchItem[];
  recentSearchesCold: RecentSearchItem[];
  addRecentSearch: (item: Omit<RecentSearchItem, 'id' | 'timestamp'>, seasonType: SeasonType) => void;
  removeRecentSearch: (id: string, seasonType: SeasonType) => void;
  clearRecentSearches: (seasonType: SeasonType) => void;
  getRecentSearches: (seasonType: SeasonType) => RecentSearchItem[];
}

// typescript의 generic으로 타입 지정.
// 이중괄호 ()() => Currying
// TypeScript 타입 추론을 정확하게 하기 위해서 사용 -> 미들웨어와 타입을 같이 사용할 때 필요한 문법
// const createStore = create<SettingStore>(); create() 함수 실행
// const store = createStore(persist(...)); 반환된 함수에 persist를 전달

export const useSettingsStore = create<SettingsStore>()(
  persist(
    // 스토어 로직
    (set) => ({
      // 기본값: 일반 사용자 모드
      typographyMode: 'default',

      // 타이포그래피 모드 변경
      setTypographyMode: (mode) => {
        // typographyMode 변경 시 textSize도 함께 변경
        const size: 'default' | 'large' =
          mode === 'senior' ? 'large' : 'default';
        set({ typographyMode: mode, textSize: size });
        // body에 클래스 적용
        document.body.classList.remove(
          'typography-default',
          'typography-senior'
        );
        document.body.classList.add(`typography-${mode}`);
      },

      // 지도 설정 기본값
      textSize: 'default',
      setTextSize: (size) => {
        // textSize 변경 시 typographyMode도 함께 변경
        const mode: TypographyMode = size === 'large' ? 'senior' : 'default';
        set({ textSize: size, typographyMode: mode });
        // body에 클래스 적용
        document.body.classList.remove(
          'typography-default',
          'typography-senior'
        );
        document.body.classList.add(`typography-${mode}`);
      },

      showSeniorFacilities: true,
      setShowSeniorFacilities: (show) => set({ showSeniorFacilities: show }),

      showColdShelters: false,
      setShowColdShelters: (show) => set({ showColdShelters: show }),

      // 앱 설정 기본값
      language: '한국어',
      setLanguage: (lang) => set({ language: lang }),

      autoLocateOnLaunch: true,
      setAutoLocateOnLaunch: (auto) => set({ autoLocateOnLaunch: auto }),

      // 최근 검색 기본값
      recentSearchesHeat: [],
      recentSearchesCold: [],

      // 최근 검색 추가 (최대 10개 유지, 최신순)
      addRecentSearch: (item, seasonType) =>
        set((state) => {
          const searchList = seasonType === 'HEAT' ? state.recentSearchesHeat : state.recentSearchesCold;
          const newItem: RecentSearchItem = {
            ...item,
            id: `${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
          };

          // 중복 제거 (같은 shelterId 또는 같은 검색어)
          const filteredList = searchList.filter((existing) => {
            if (item.type === 'shelter' && existing.type === 'shelter') {
              return existing.shelterId !== item.shelterId;
            }
            if (item.type === 'keyword' && existing.type === 'keyword') {
              return existing.name !== item.name;
            }
            return true;
          });

          // 최신 항목을 맨 앞에 추가하고 최대 10개로 제한
          const updatedList = [newItem, ...filteredList].slice(0, 10);

          return seasonType === 'HEAT'
            ? { recentSearchesHeat: updatedList }
            : { recentSearchesCold: updatedList };
        }),

      // 최근 검색 삭제
      removeRecentSearch: (id, seasonType) =>
        set((state) => {
          const searchList = seasonType === 'HEAT' ? state.recentSearchesHeat : state.recentSearchesCold;
          const updatedList = searchList.filter((item) => item.id !== id);

          return seasonType === 'HEAT'
            ? { recentSearchesHeat: updatedList }
            : { recentSearchesCold: updatedList };
        }),

      // 최근 검색 전체 삭제
      clearRecentSearches: (seasonType) =>
        set(() =>
          seasonType === 'HEAT'
            ? { recentSearchesHeat: [] }
            : { recentSearchesCold: [] }
        ),

      // 최근 검색 목록 가져오기
      getRecentSearches: (seasonType) => {
        const state = useSettingsStore.getState();
        return seasonType === 'HEAT' ? state.recentSearchesHeat : state.recentSearchesCold;
      },
    }),
    // persist 옵션
    {
      name: 'shelter-settings', // localStorage 키
    }
  )
);
