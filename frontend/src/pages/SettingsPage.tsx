// src/pages/SettingsPage.tsx
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '@/stores/settingsStore';
import { ToggleButtons } from '@/components/ui/ToggleButtons';
import { Switch } from '@/components/ui/Switch';
import { ListItem } from '@/components/ui/ListItem';

export default function SettingsPage() {
  const navigate = useNavigate();

  const {
    textSize,
    setTextSize,
    showSeniorFacilities,
    setShowSeniorFacilities,
    showColdShelters,
    setShowColdShelters,
    language,
    autoLocateOnLaunch,
    setAutoLocateOnLaunch,
  } = useSettingsStore();

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <header className="bg-blue-50 border-b border-foreground/10">
        <div className="flex items-center px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2"
            aria-label="뒤로가기"
          >
            <ChevronLeft className="w-8 h-8 text-blue-500" />
          </button>
          <h1 className="flex-1 text-center text-h2">설정</h1>
          <div className="w-10" /> {/* 중앙 정렬을 위한 스페이서 */}
        </div>
      </header>

      <div className="space-y-2">
        {/* 지도설정 섹션 */}
        <section>
          <h2 className="px-5 py-3 text-caption text-foreground/50 bg-background">
            지도설정
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 글자 크기 */}
            <div className="flex pl-5 pr-4 py-2 items-center justify-between bg-blue-50">
              <span className="text-foreground text-body">글자 크기</span>
              <ToggleButtons
                options={[
                  { value: 'default', label: '기본' },
                  { value: 'large', label: '크게' },
                ]}
                value={textSize}
                onChange={(value) => setTextSize(value as 'default' | 'large')}
              />
            </div>
            {/* 특정인 이용 시설 표시 */}
            <ListItem
              label="특정인 이용 시설 표시"
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
              label="한파쉼터 전환"
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
            앱설정
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 언어 */}
            <ListItem
              label="언어"
              value={language}
              showArrow
              onClick={() => {
                // TODO: 언어 선택 모달 또는 페이지로 이동
                console.log('언어 설정 페이지로 이동');
              }}
            />

            {/* 앱 실행 시 현위치 탐색 */}
            <ListItem
              label="앱 실행 시 현위치 탐색"
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
            약관 및 정책
          </h2>
          <div className="bg-background divide-y divide-foreground/5">
            {/* 위치기반서비스 이용약관 */}
            <ListItem
              label="위치기반서비스 이용약관"
              showArrow
              onClick={() => {
                // TODO: 약관 페이지로 이동
                console.log('위치기반서비스 이용약관 페이지로 이동');
              }}
            />

            {/* 서비스 이용약관 */}
            <ListItem
              label="서비스 이용약관"
              showArrow
              onClick={() => navigate('/terms/service')}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
