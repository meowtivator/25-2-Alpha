// src/stores/settingsStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TypographyMode = 'default' | 'senior';

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
        const size: 'default' | 'large' = mode === 'senior' ? 'large' : 'default';
        set({ typographyMode: mode, textSize: size });
        // body에 클래스 적용
        document.body.classList.remove('typography-default', 'typography-senior');
        document.body.classList.add(`typography-${mode}`);
      },

      // 지도 설정 기본값
      textSize: 'default',
      setTextSize: (size) => {
        // textSize 변경 시 typographyMode도 함께 변경
        const mode: TypographyMode = size === 'large' ? 'senior' : 'default';
        set({ textSize: size, typographyMode: mode });
        // body에 클래스 적용
        document.body.classList.remove('typography-default', 'typography-senior');
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
    }),
    // persist 옵션
    {
      name: 'shelter-settings', // localStorage 키
    }
  )
);