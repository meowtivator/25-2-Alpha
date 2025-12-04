// src/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from '@/locales/en.json';
import ko from '@/locales/ko.json';
import ja from '@/locales/ja.json';
import vi from '@/locales/vi.json';
import zh from '@/locales/zh.json';

// Language codes
export const LANGUAGES = {
  EN: 'en',
  KO: 'ko',
  JA: 'ja',
  VI: 'vi',
  ZH: 'zh',
} as const;

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES];

// Language display names
export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  ko: '한국어',
  ja: '日本語',
  vi: 'Tiếng Việt',
  zh: '中文',
};

// Get language from localStorage or use default
const getStoredLanguage = (): Language => {
  const stored = localStorage.getItem('language');
  if (stored && Object.values(LANGUAGES).includes(stored as Language)) {
    return stored as Language;
  }
  return LANGUAGES.KO; // Default to Korean
};

// Initialize i18next
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: en },
      ko: { translation: ko },
      ja: { translation: ja },
      vi: { translation: vi },
      zh: { translation: zh },
    },
    lng: getStoredLanguage(), // default language
    fallbackLng: 'ko', // fallback language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Save language to localStorage when changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
