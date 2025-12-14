# 🏥 온열질환 쉼터 & 증상 진단 서비스

온열질환 예방을 위한 무더위/한파 쉼터 찾기 및 AI 기반 증상 진단 서비스입니다.

## 📋 목차

- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [시작하기](#-시작하기)
- [환경 변수 설정](#-환경-변수-설정)
- [주요 페이지](#-주요-페이지)
- [API 엔드포인트](#-api-엔드포인트)
- [다국어 지원](#-다국어-지원)
- [접근성 기능](#-접근성-기능)
- [개발 가이드](#-개발-가이드)

## ✨ 주요 기능

### 1. 쉼터 찾기 (Shelter Locator)
- 📍 **카카오맵 기반 지도 인터페이스**
  - 사용자 현재 위치 자동 탐지
  - 무더위/한파 쉼터 실시간 검색
  - 쉼터 상세 정보 조회 (운영시간, 시설 정보, 수용 인원 등)

- 🗺️ **길찾기 기능**
  - 카카오맵 앱 연동 (출발/도착 경로 안내)
  - 앱 미설치 시 네이버 지도 웹으로 자동 폴백
  - 대중교통 경로 안내

- 🔍 **고급 검색**
  - 키워드 검색 (주소, 쉼터명)
  - 무더위/한파 쉼터 전환
  - 공공/민간 시설 필터링

### 2. 온열질환 증상 진단 (Symptom Checker)
- 🤖 **AI 기반 증상 진단**
  - 11개 증상 질문 기반 진단
  - 실시간 TTS(Text-to-Speech) 음성 안내
  - 다국어 질문/응답 지원

- 📊 **진단 결과**
  - 온열질환 의심 여부 판정
  - 질환별 가이드라인 제공 (7가지 질환)
  - 증상, 조치 방법 상세 안내

### 3. 응급 병원 찾기
- 🏥 **응급실 위치 검색**
  - 카카오맵 기반 병원 지도
  - 응급실 검색 및 상세 정보

### 4. 접근성 & 다국어
- 🌍 **5개 언어 지원**
  - 한국어, English, Tiếng Việt, 日本語, 中文
  - 모든 UI 및 진단 데이터 다국어화

- ♿ **시니어 모드**
  - 큰 글씨 타이포그래피
  - 고대비 색상 테마
  - 간소화된 UI

## 🛠 기술 스택

### Frontend Framework
- **React 19.1** - UI 라이브러리
- **TypeScript 5.9** - 타입 안전성
- **Vite 7** - 빌드 도구

### 상태 관리 & 데이터 페칭
- **Zustand 5.0** - 전역 상태 관리 (설정, 테마)
- **TanStack Query 5.90** - 서버 상태 관리
- **React Router 7.9** - 클라이언트 라우팅

### UI/UX
- **Tailwind CSS 4** - 유틸리티 CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리
- **React Kakao Maps SDK** - 카카오맵 통합

### 국제화
- **i18next 25.7** - 다국어 지원
- **react-i18next 16.3** - React 통합

### HTTP 클라이언트
- **Axios 1.13** - HTTP 요청
- **Fetch API** - 네이티브 HTTP 클라이언트

### 코드 품질
- **ESLint 9** - 정적 분석
- **Prettier 3** - 코드 포맷팅
- **TypeScript ESLint 8** - TypeScript 린팅

## 📁 프로젝트 구조

```
frontend/
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 통신 레이어
│   │   ├── shelterApi.ts     # 쉼터 API
│   │   ├── symptomApi.ts     # 증상 진단 API
│   │   └── hospitalApi.ts    # 병원 API
│   │
│   ├── assets/            # 정적 리소스
│   │   └── icons/            # 커스텀 아이콘
│   │
│   ├── components/        # 재사용 컴포넌트
│   │   ├── layout/           # 레이아웃 컴포넌트
│   │   │   ├── MainLayout.tsx
│   │   │   └── BottomTabBar.tsx
│   │   ├── map/              # 지도 관련 컴포넌트
│   │   │   ├── KakaoMap.tsx
│   │   │   └── ShelterInfoModal.tsx
│   │   ├── search/           # 검색 관련 컴포넌트
│   │   └── ui/               # 기본 UI 컴포넌트
│   │       ├── SearchBar.tsx
│   │       ├── Switch.tsx
│   │       └── ToggleButtons.tsx
│   │
│   ├── config/            # 환경 설정
│   │   └── env.ts            # 환경 변수
│   │
│   ├── data/              # 정적 데이터
│   │   └── symptomGuideData.ts  # 증상 가이드 다국어 데이터
│   │
│   ├── lib/               # 유틸리티 & 설정
│   │   ├── constants/        # 상수
│   │   │   ├── api.ts           # API 엔드포인트
│   │   │   └── routes.ts        # 라우트 경로
│   │   ├── i18n.ts              # i18next 설정
│   │   └── utils/            # 유틸리티 함수
│   │
│   ├── locales/           # 다국어 번역 파일
│   │   ├── ko.json           # 한국어
│   │   ├── en.json           # 영어
│   │   ├── vi.json           # 베트남어
│   │   ├── ja.json           # 일본어
│   │   └── zh.json           # 중국어
│   │
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── OnboardingPage.tsx      # 온보딩
│   │   ├── HomePage.tsx            # 홈 (쉼터 지도)
│   │   ├── SearchPage.tsx          # 쉼터 검색
│   │   ├── HelperPage.tsx          # 증상 진단
│   │   ├── DiagnosisResultPage.tsx # 진단 결과
│   │   ├── GuidelinePage.tsx       # 가이드라인
│   │   ├── HospitalMapPage.tsx     # 병원 지도
│   │   ├── HospitalSearchPage.tsx  # 병원 검색
│   │   └── SettingsPage.tsx        # 설정
│   │
│   ├── stores/            # Zustand 스토어
│   │   └── settingsStore.ts  # 앱 설정 스토어
│   │
│   ├── types/             # TypeScript 타입 정의
│   │   ├── shelter.ts        # 쉼터 타입
│   │   ├── symptom.ts        # 증상 진단 타입
│   │   └── hospital.ts       # 병원 타입
│   │
│   ├── App.tsx            # 앱 루트 컴포넌트
│   ├── main.tsx           # 엔트리 포인트
│   └── index.css          # 글로벌 스타일
│
├── .env.example           # 환경 변수 예시
├── package.json           # 의존성 관리
├── tsconfig.json          # TypeScript 설정
├── vite.config.ts         # Vite 설정
└── tailwind.config.ts     # Tailwind 설정
```

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **yarn**
- **카카오 개발자 계정** (카카오맵 API 키 발급용)

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**
   ```bash
   cp .env.example .env
   ```

   `.env` 파일을 열고 카카오맵 API 키를 입력하세요:
   ```env
   VITE_KAKAO_MAP_KEY=your_kakao_map_javascript_key
   VITE_API_URL=http://localhost:3000
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.

5. **프로덕션 빌드**
   ```bash
   npm run build
   npm run preview
   ```

### 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 (HMR 지원) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | ESLint 검사 |
| `npm run lint:fix` | ESLint 자동 수정 |
| `npm run format` | Prettier 포맷팅 |
| `npm run format:check` | Prettier 검사 |

## 🔐 환경 변수 설정

### `.env` 파일 구성

```env
# 카카오맵 JavaScript 키 (필수)
# https://developers.kakao.com 에서 발급
VITE_KAKAO_MAP_KEY=your_kakao_javascript_key_here

# 백엔드 API URL (선택)
# 개발: http://localhost:3000
# 프로덕션: https://api.yourdomain.com
VITE_API_URL=http://localhost:3000
```

### 카카오맵 API 키 발급 방법

1. [카카오 개발자 센터](https://developers.kakao.com) 접속
2. 내 애플리케이션 > 애플리케이션 추가
3. 앱 설정 > 플랫폼 설정 > Web 플랫폼 등록
4. 사이트 도메인 추가 (예: `http://localhost:3000`)
5. 앱 키 > JavaScript 키 복사
6. `.env` 파일에 붙여넣기

## 📄 주요 페이지

### 1. 온보딩 페이지 (`/`)
- 앱 소개 및 초기 설정
- 언어 선택
- 시니어 모드 선택

### 2. 홈 페이지 (`/home`)
- 카카오맵 기반 쉼터 지도
- 사용자 현재 위치 표시
- 쉼터 마커 및 상세 정보 모달
- 검색 바 (SearchPage로 연결)

### 3. 쉼터 검색 페이지 (`/search`)
- 키워드 기반 쉼터 검색
- 무더위/한파 쉼터 필터
- 검색 결과 리스트
- 쉼터 선택 → HomePage로 이동 (지도 표시)

### 4. 증상 진단 페이지 (`/helper`)
- 11개 증상 질문
- TTS 음성 안내
- Yes/No 답변 수집
- 진단 결과 제출

### 5. 진단 결과 페이지 (`/helper/result`)
- 온열질환 의심 여부 표시
- 조치 방법 안내
- 가이드라인 페이지 연결

### 6. 가이드라인 페이지 (`/helper/guideline`)
- 7가지 온열질환 정보
  - 열경련, 열탈진, 열실신, 열발진
  - 일광화상, 열사병, 열부종
- 질환별 정의, 증상, 조치 방법
- 다국어 지원

### 7. 병원 페이지 (`/hospital`)
- 응급실 지도
- 병원 검색 (`/hospital/search`)

### 8. 설정 페이지 (`/settings`)
- 언어 선택 (5개 언어)
- 타이포그래피 모드 (일반/시니어)
- 무더위/한파 쉼터 전환
- 자동 위치 탐색 on/off

## 🌐 API 엔드포인트

### Shelter API

#### 쉼터 검색
```http
GET /api/shelters/search?keyword={keyword}&seasonType={HEAT|COLD}&type={PUBLIC|PRIVATE}&page={page}&size={size}
```

**파라미터:**
- `keyword`: 검색 키워드 (주소, 쉼터명)
- `seasonType`: `HEAT` (무더위) | `COLD` (한파)
- `type` (선택): `PUBLIC` (공공) | `PRIVATE` (민간)
- `page`: 페이지 번호 (0부터 시작)
- `size`: 페이지 크기 (기본 20)

**응답:**
```typescript
{
  content: ShelterDetail[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
```

#### 쉼터 상세 정보
```http
GET /api/shelters/{id}?seasonType={HEAT|COLD}
```

**응답:**
```typescript
{
  id: number;
  name: string;
  addrRoad: string;
  addrJibun: string;
  lat: number;
  lon: number;
  capacity: number;
  area: number;
  fanCount: number;
  airconCount: number;
  weekdayOpenTime: string;
  weekdayCloseTime: string;
}
```

### Symptom API

#### 증상 질문 조회
```http
GET /api/symptom/questions
Headers: Accept-Language: {ko|en|vi|ja|zh}
```

**응답:**
```typescript
[
  {
    id: number;
    questionCode: string; // "Q1" ~ "Q11"
    questionText: string;
    sortOrder: number;
  }
]
```

#### 증상 진단
```http
POST /api/symptom/diagnosis
Content-Type: application/json
Headers: Accept-Language: {ko|en|vi|ja|zh}

{
  "answers": [
    { "id": 1, "answer": "yes" },
    { "id": 2, "answer": "no" }
  ],
  "language": "ko"
}
```

**응답:**
```typescript
{
  assessmentId: number;
  suspected: boolean;
  headline: string;
  description: string;
}
```

#### 진단 상세 정보
```http
GET /api/symptom/diagnosis/{assessmentId}
Headers: Accept-Language: {ko|en|vi|ja|zh}
```

#### 증상 가이드 조회
```http
GET /api/symptom/guides
Headers: Accept-Language: {ko|en|vi|ja|zh}
```

**응답:**
```typescript
[
  {
    disease: string;      // "열경련", "열탈진", etc.
    definition: string;
    symptoms: string[];
    advice: string[];
  }
]
```

## 🌍 다국어 지원

### 지원 언어
- 🇰🇷 한국어 (ko)
- 🇺🇸 English (en)
- 🇻🇳 Tiếng Việt (vi)
- 🇯🇵 日本語 (ja)
- 🇨🇳 中文 (zh)

### 번역 파일 위치
```
src/locales/
├── ko.json  # 한국어
├── en.json  # 영어
├── vi.json  # 베트남어
├── ja.json  # 일본어
└── zh.json  # 중국어
```

### 번역 키 구조

```json
{
  "appName": "앱 이름",
  "home": "홈",
  "helper": "증상 진단",
  "settings": "설정",

  "Q1": "체온이 높나요?",
  "Q2": "두통이 있나요?",

  "disease_열경련": "열경련",
  "disease_열탈진": "열탈진",

  "departure": "출발",
  "arrival": "도착",
  "weekdayOperation": "평일 운영",
  "facilityArea": "시설 면적",
  "capacity": "이용 가능 인원"
}
```

### 프론트엔드 전용 번역 데이터

일부 데이터는 백엔드 API가 아닌 프론트엔드에서 직접 관리합니다:

#### 1. 증상 질문 (Q1~Q11)
- 백엔드: 한국어 텍스트만 제공
- 프론트엔드: `questionCode`를 i18n 키로 매핑
- 위치: `src/locales/*.json` (Q1~Q11 키)

#### 2. 진단 결과 헤드라인/설명
- 백엔드: `suspected` 플래그만 제공
- 프론트엔드: 플래그에 따라 번역 키 선택
  - `diagnosisHeadlineSuspected` / `diagnosisHeadlineNormal`
  - `diagnosisDescriptionSuspected` / `diagnosisDescriptionNormal`

#### 3. 증상 가이드라인
- 백엔드: 한국어 데이터만 제공
- 프론트엔드: `src/data/symptomGuideData.ts`에서 전체 번역 관리
- 7가지 질환별 정의, 증상, 조치 방법 (5개 언어)

### 언어 변경 방법

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();

  // 언어 변경
  i18n.changeLanguage('en');

  // 번역 사용
  return <div>{t('appName')}</div>;
}
```

## ♿ 접근성 기능

### 1. 시니어 모드
- **큰 글씨**: 모든 텍스트 크기 150% 확대
- **고대비**: 색상 대비 강화
- **간소화된 UI**: 복잡한 인터랙션 제거

활성화 방법:
```typescript
import { useSettingsStore } from '@/stores/settingsStore';

const { typographyMode, setTypographyMode } = useSettingsStore();
setTypographyMode('senior'); // 'default' | 'senior'
```

### 2. TTS (Text-to-Speech)
- 증상 질문 음성 안내
- 언어별 음성 코드 자동 선택
  - 한국어: `ko-KR`
  - 영어: `en-US`
  - 베트남어: `vi-VN`
  - 일본어: `ja-JP`
  - 중국어: `zh-CN`

### 3. 키보드 네비게이션
- 모든 인터랙티브 요소 `Tab` 키 접근 가능
- `Enter` / `Space` 키로 버튼 활성화

### 4. ARIA 레이블
- 스크린 리더 지원
- 의미 있는 alt 텍스트
- 역할(role) 및 상태(state) 명시

## 🧑‍💻 개발 가이드

### 컴포넌트 작성 규칙

```typescript
// 1. Import 순서
import { useState } from 'react';           // React
import { useNavigate } from 'react-router-dom';  // 외부 라이브러리
import { Button } from '@/components/ui';   // 내부 컴포넌트
import { useSomeHook } from '@/hooks';      // 커스텀 훅
import type { SomeType } from '@/types';    // 타입

// 2. 타입 정의
interface MyComponentProps {
  title: string;
  onSubmit: () => void;
}

// 3. 컴포넌트
export function MyComponent({ title, onSubmit }: MyComponentProps) {
  // 상태
  const [value, setValue] = useState('');

  // 훅
  const navigate = useNavigate();

  // 핸들러
  const handleClick = () => {
    onSubmit();
  };

  // 렌더
  return <div>{title}</div>;
}
```

### 스타일링 가이드

```tsx
// Tailwind CSS 사용
<div className="flex items-center justify-center p-4 bg-blue-100">
  <h1 className="text-h1 text-foreground">Title</h1>
  <p className="text-body text-foreground/60">Description</p>
</div>

// 커스텀 CSS 변수 (globals.css)
:root {
  --color-foreground: #1a1a1a;
  --color-background: #ffffff;
}
```

### API 호출 패턴

```typescript
// TanStack Query 사용
import { useQuery } from '@tanstack/react-query';
import { fetchShelters } from '@/api/shelterApi';

function MyShelterList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['shelters', keyword],
    queryFn: () => fetchShelters(keyword),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.content.map(...)}</div>;
}
```

### 상태 관리 (Zustand)

```typescript
// 스토어 정의
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MyStore {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyStore>()(
  persist(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
    }),
    { name: 'my-storage' }
  )
);

// 사용
const { count, increment } = useMyStore();
```

### 라우팅

```typescript
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants/routes';

function MyComponent() {
  const navigate = useNavigate();

  // 기본 네비게이션
  navigate(ROUTES.HOME);

  // 상태 전달
  navigate(ROUTES.HOME, {
    state: { selectedShelter: shelter }
  });

  // 뒤로 가기
  navigate(-1);
}
```

## 🐛 디버깅

### React Query Devtools

개발 모드에서 자동으로 활성화됩니다:
```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### 콘솔 로그

```typescript
// 개발 환경에서만 로그 출력
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

## 🔧 트러블슈팅

### 카카오맵이 로드되지 않을 때
1. `.env` 파일에 `VITE_KAKAO_MAP_KEY`가 올바르게 설정되었는지 확인
2. 카카오 개발자 센터에서 사이트 도메인이 등록되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 지도가 현재 위치를 표시하지 않을 때
1. 브라우저 위치 권한 확인
2. HTTPS 환경인지 확인 (일부 브라우저는 HTTP에서 위치 API 차단)
3. 설정 페이지에서 "자동 위치 탐색" 활성화 확인

### 번역이 표시되지 않을 때
1. `src/locales/{언어코드}.json` 파일 존재 확인
2. i18n 초기화 확인 (`src/lib/i18n.ts`)
3. 번역 키가 올바른지 확인

### 빌드 에러
```bash
# 캐시 삭제
rm -rf node_modules/.vite
rm -rf dist

# 재설치
npm install

# 빌드
npm run build
```

## 📝 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE) 하에 배포됩니다.

## 🤝 기여

이슈 및 PR은 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트 관련 문의사항은 이슈 탭을 이용해주세요.
