// src/pages/SettingsPage.tsx
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '@/stores/settingsStore';
import { ToggleButtons } from '@/components/ui/ToggleButtons';
import { Switch } from '@/components/ui/Switch';
import { ListItem } from '@/components/ui/ListItem';
import { LANGUAGE_NAMES, type Language } from '@/lib/i18n';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const {
    textSize,
    setTextSize,
    showSeniorFacilities,
    setShowSeniorFacilities,
    showColdShelters,
    setShowColdShelters,
    autoLocateOnLaunch,
    setAutoLocateOnLaunch,
    setLanguage,
  } = useSettingsStore();

  const currentLanguage = i18n.language as Language;

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-blue-50 border-b border-foreground/10">
        <div className="flex items-center px-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-4"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-12 h-12 text-blue-100" />
          </button>
          <h1 className="flex-1 text-center text-h2">{t('settings')}</h1>
          <div className="w-10" /> {/* 중앙 정렬을 위한 스페이서 */}
        </div>
      </header>

      <div className="space-y-2 whitespace-pre-wrap text-left">
        {/* 지도설정 섹션 */}
        <section>
          <h2 className="px-5 py-3 text-caption text-foreground/50 bg-background">
            {t('mapSettings')}
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 글자 크기 */}
            <div className="flex w-auto pl-5 pr-4 py-2 items-center justify-between bg-blue-50 whitespace-nowrap">
              <span className="text-foreground text-body">{t('textSize')}</span>
              <ToggleButtons
                options={[
                  { value: 'default', label: t('default') },
                  { value: 'large', label: t('large') },
                ]}
                value={textSize}
                onChange={(value) => setTextSize(value as 'default' | 'large')}
              />
            </div>
            {/* 특정인 이용 시설 표시 */}
            <ListItem
              label={t('showSpecificFacilities')}
              onClick={() => setShowSeniorFacilities(!showSeniorFacilities)}
              rightContent={
                <Switch
                  checked={showSeniorFacilities}
                  onChange={setShowSeniorFacilities}
                />
              }
            />

            {/* 한파쉼터 전환 */}
            <ListItem
              label={t('switchToColdShelter')}
              onClick={() => setShowColdShelters(!showColdShelters)}
              rightContent={
                <Switch
                  checked={showColdShelters}
                  onChange={setShowColdShelters}
                />
              }
            />

          </div>
        </section>

        {/* 앱설정 섹션 */}
        <section>
          <h2 className="px-5 py-3 text-caption text-foreground/50 bg-background">
            {t('appSettings')}
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 언어 */}
            <div className="relative">
              <ListItem
                label={t('language')}
                value={LANGUAGE_NAMES[currentLanguage]}
                showArrow
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              />

              {/* 언어 선택 드롭다운 */}
              {showLanguageDropdown && (
                <div className="absolute left-0 right-0 top-full bg-white border border-foreground/10 shadow-lg z-50 rounded-lg overflow-hidden">
                  {(Object.entries(LANGUAGE_NAMES) as [Language, string][]).map(([lang, name]) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full px-5 py-3 text-left text-body transition-colors ${
                        currentLanguage === lang
                          ? 'bg-blue-100 text-blue-900 font-semibold'
                          : 'bg-blue-50 text-foreground hover:bg-blue-100'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 앱 실행 시 현위치 탐색 */}
            <ListItem
              label={t('detectLocationOnLaunch')}
              onClick={() => setAutoLocateOnLaunch(!autoLocateOnLaunch)}
              rightContent={
                <Switch
                  checked={autoLocateOnLaunch}
                  onChange={setAutoLocateOnLaunch}
                />
              }
            />
          </div>
        </section>

        {/* 약관 및 정책 섹션 */}
        <section>
          <h2 className="px-5 py-3 text-caption text-foreground/50 bg-background">
            {t('termsAndPolicies')}
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 위치기반서비스 이용약관 */}
            <ListItem
              label={t('locationServiceTerms')}
              showArrow
              onClick={() => {
                // TODO: 약관 페이지로 이동
                console.log('위치기반서비스 이용약관 페이지로 이동');
              }}
            />

            {/* 서비스 이용약관 */}
            <ListItem
              label={t('serviceTerms')}
              showArrow
              onClick={() => navigate('/terms/service')}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
