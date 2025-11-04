# 설정 페이지 구현을 통해 배우는 실무 개념

> 이 문서는 설정 페이지 구현 과정에서 사용된 실무 개념들을 정리한 주니어 개발자 학습 가이드입니다.

## 목차
1. [React 컴포넌트 설계 패턴](#1-react-컴포넌트-설계-패턴)
2. [TypeScript 타입 시스템](#2-typescript-타입-시스템)
3. [Zustand 상태 관리](#3-zustand-상태-관리)
4. [이벤트 핸들링과 전파](#4-이벤트-핸들링과-전파)
5. [CSS 변수와 디자인 시스템](#5-css-변수와-디자인-시스템)
6. [접근성(Accessibility)](#6-접근성accessibility)

---

## 1. React 컴포넌트 설계 패턴

### 1.1 컴포넌트 합성(Composition) 패턴

**실제 코드 예시:**
```tsx
// ListItem 컴포넌트 - 다양한 상황에 재사용 가능
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
```

**핵심 개념:**
- `rightContent`를 `ReactNode` 타입으로 받아서 어떤 컴포넌트든 삽입 가능
- Switch, ToggleButtons, 화살표 등 다양한 UI 요소를 유연하게 배치
- 상속보다는 합성을 사용하여 재사용성 향상

**실무 팁:**
```tsx
interface ListItemProps {
  label: string;
  value?: string;           // 옵셔널: 필요할 때만 사용
  onClick?: () => void;     // 옵셔널: 클릭 가능한 경우만
  rightContent?: ReactNode; // 유연성: 어떤 컴포넌트든 가능
  showArrow?: boolean;      // 명시적: 화살표 표시 여부
}
```

### 1.2 제어 컴포넌트(Controlled Component)

**실제 코드:**
```tsx
<Switch
  checked={showSeniorFacilities}      // 상태를 외부에서 제어
  onChange={setShowSeniorFacilities}  // 변경 시 상태 업데이트
/>
```

**핵심 개념:**
- 컴포넌트의 상태를 부모가 완전히 제어
- 단방향 데이터 플로우(One-way data flow)
- 예측 가능한 동작과 디버깅 용이

**vs 비제어 컴포넌트:**
```tsx
// ❌ 비제어 - 내부에서 상태 관리
const [isChecked, setIsChecked] = useState(false);

// ✅ 제어 - 외부에서 상태 관리
<Switch checked={props.checked} onChange={props.onChange} />
```

---

## 2. TypeScript 타입 시스템

### 2.1 인터페이스(Interface) 설계

**실제 코드:**
```tsx
interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleButtonsProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}
```

**핵심 개념:**
- **명확한 계약(Contract)**: 컴포넌트가 무엇을 받고, 무엇을 하는지 명시
- **타입 안정성**: 컴파일 타임에 오류 발견
- **자동완성**: IDE에서 개발 생산성 향상

### 2.2 Union Types와 Literal Types

**실제 코드:**
```tsx
type TypographyMode = 'default' | 'senior';  // Literal Union Type

interface SettingsStore {
  textSize: 'default' | 'large';  // 오직 이 두 값만 가능
  setTextSize: (size: 'default' | 'large') => void;
}
```

**실무 활용:**
```tsx
// ✅ 타입 안전
setTextSize('default');  // OK
setTextSize('large');    // OK
setTextSize('medium');   // ❌ 컴파일 에러!

// 조건부 타입 변환
const mode: TypographyMode = size === 'large' ? 'senior' : 'default';
```

**왜 중요한가?**
- 잘못된 값 전달 방지
- 리팩토링 시 타입 오류로 누락된 부분 즉시 발견
- 코드 의도를 명확하게 표현

### 2.3 제네릭(Generic)과 Currying

**실제 코드 (settingsStore.ts):**
```tsx
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({ /* ... */ }),
    { name: 'shelter-settings' }
  )
);
```

**이중 괄호 `()()` 이해하기:**
```tsx
// 1단계: create 함수 실행
const createStore = create<SettingsStore>();

// 2단계: 반환된 함수에 persist 전달
const store = createStore(
  persist(/* ... */)
);

// 한 줄로 합치면: create<SettingsStore>()(persist(...))
```

**왜 이렇게 하는가?**
- TypeScript 타입 추론을 정확하게 하기 위한 패턴
- 미들웨어(persist)와 타입을 함께 사용할 때 필요
- Zustand의 타입 안정성을 보장

---

## 3. Zustand 상태 관리

### 3.1 상태 스토어 구조

**실제 코드:**
```tsx
interface SettingsStore {
  // 상태 (State)
  textSize: 'default' | 'large';
  showSeniorFacilities: boolean;

  // 액션 (Actions)
  setTextSize: (size: 'default' | 'large') => void;
  setShowSeniorFacilities: (show: boolean) => void;
}
```

**핵심 개념:**
- **상태**: 현재 값을 저장
- **액션**: 상태를 변경하는 함수
- **단일 스토어**: 관련된 설정을 하나의 스토어에서 관리

### 3.2 상태 동기화 패턴

**실제 구현:**
```tsx
setTextSize: (size) => {
  // 1. 여러 상태를 동시에 업데이트
  const mode: TypographyMode = size === 'large' ? 'senior' : 'default';
  set({ textSize: size, typographyMode: mode });

  // 2. DOM 직접 조작 (사이드 이펙트)
  document.body.classList.remove('typography-default', 'typography-senior');
  document.body.classList.add(`typography-${mode}`);
},
```

**패턴 분석:**

1. **연관된 상태 동기화**
   ```tsx
   // textSize와 typographyMode는 항상 함께 변경
   textSize: 'large'   → typographyMode: 'senior'
   textSize: 'default' → typographyMode: 'default'
   ```

2. **사이드 이펙트 관리**
   - 상태 변경 시 DOM도 함께 업데이트
   - CSS 클래스를 통해 전역 스타일 변경

**실무 주의사항:**
```tsx
// ❌ 나쁜 예: 상태가 따로 논다
setTextSize('large');      // textSize만 변경
// typographyMode는 여전히 'default' → 버그!

// ✅ 좋은 예: 연관된 상태를 함께 변경
set({ textSize: size, typographyMode: mode });
```

### 3.3 Persist 미들웨어

**실제 코드:**
```tsx
persist(
  (set) => ({ /* store logic */ }),
  { name: 'shelter-settings' }  // localStorage 키
)
```

**동작 원리:**
1. 상태 변경 시 자동으로 `localStorage`에 저장
2. 페이지 새로고침 시 자동으로 복원
3. 사용자 설정이 유지됨

**확인 방법:**
```javascript
// 브라우저 콘솔에서
localStorage.getItem('shelter-settings')
// {"state":{"textSize":"large","typographyMode":"senior",...}}
```

---

## 4. 이벤트 핸들링과 전파

### 4.1 이벤트 버블링(Event Bubbling)

**문제 상황:**
```tsx
// 부모 (ListItem): onClick 있음
<ListItem onClick={() => toggleSwitch()}>
  {/* 자식 (Switch): onClick 있음 */}
  <Switch onClick={() => toggleSwitch()} />
</ListItem>
```

**발생하는 문제:**
1. Switch 클릭 → Switch의 onClick 실행 → 상태 토글
2. 이벤트가 부모로 전파 → ListItem의 onClick 실행 → 상태 다시 토글
3. **결과**: 아무 일도 일어나지 않은 것처럼 보임 (두 번 토글)

### 4.2 해결 방법: stopPropagation

**실제 코드:**
```tsx
// Switch.tsx
const handleClick = (e: React.MouseEvent) => {
  e.stopPropagation();  // 이벤트 전파 중단!
  onChange(!checked);
};
```

**시각적 설명:**
```
사용자가 Switch 클릭
    ↓
Switch onClick 실행 (상태 토글)
    ↓
e.stopPropagation() ← 여기서 멈춤!
    ↓
ListItem onClick 실행 안 됨 ✓
```

### 4.3 pointer-events CSS 속성

**실제 코드:**
```tsx
// ListItem.tsx
<div className="flex items-center gap-2 pointer-events-none">
  {rightContent}  {/* Switch, ToggleButtons 등 */}
</div>
```

**동작 원리:**
- `pointer-events-none`: 이 요소는 클릭 이벤트를 무시
- 하지만 자식 요소는 `pointer-events-auto`로 오버라이드 가능

**ToggleButtons에서 오버라이드:**
```tsx
// ToggleButtons.tsx
<div className="flex gap-3 pointer-events-auto">  {/* 다시 활성화 */}
  <button onClick={handleClick}>기본</button>
  <button onClick={handleClick}>크게</button>
</div>
```

**계층 구조:**
```
ListItem (클릭 가능)
  └─ div (pointer-events-none) ← 클릭 무시
      └─ ToggleButtons (pointer-events-auto) ← 클릭 가능!
```

### 4.4 실무 패턴 정리

**패턴 1: 중첩된 클릭 가능 요소**
```tsx
<button onClick={parentHandler}>
  <button onClick={(e) => {
    e.stopPropagation();  // 필수!
    childHandler();
  }}>
    자식 버튼
  </button>
</button>
```

**패턴 2: 컨테이너는 무시, 특정 자식만 클릭**
```tsx
<div className="container" onClick={containerHandler}>
  <div className="pointer-events-none">
    <button className="pointer-events-auto" onClick={buttonHandler}>
      클릭 가능
    </button>
  </div>
</div>
```

---

## 5. CSS 변수와 디자인 시스템

### 5.1 CSS 커스텀 속성(CSS Variables)

**실제 코드 (index.css):**
```css
:root {
  --background: #f8f7f4;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}
```

**Tailwind에서 사용:**
```tsx
<div className="bg-background text-foreground">
  {/* --background, --foreground 값 사용 */}
</div>
```

**장점:**
1. **중앙 집중 관리**: 색상을 한 곳에서 변경
2. **다크 모드 지원**: CSS 변수만 바꾸면 전체 테마 변경
3. **일관성**: 디자인 시스템 구축의 기반

### 5.2 동적 타이포그래피 시스템

**실제 구현:**
```css
/* 일반 사용자 */
:root,
body.typography-default {
  --font-size-h1: 24px;
  --font-size-body: 16px;
}

/* 고령층 사용자 */
body.typography-senior {
  --font-size-h1: 32px;
  --font-size-body: 22px;
}

/* 유틸리티 클래스 */
.text-h1 {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-h1);
  line-height: var(--line-height-h1);
}
```

**동작 원리:**
```tsx
// JavaScript에서 클래스 변경
document.body.classList.add('typography-senior');

// CSS 변수가 자동으로 변경됨
// --font-size-h1: 24px → 32px
// --font-size-body: 16px → 22px

// .text-h1을 사용하는 모든 요소가 자동으로 크기 변경!
```

**실무 활용:**
```tsx
<h1 className="text-h1">제목</h1>  {/* 24px → 32px */}
<p className="text-body">본문</p>  {/* 16px → 22px */}
```

### 5.3 불투명도(Opacity) 표기법

**Tailwind CSS 불투명도:**
```tsx
<div className="text-foreground/60">  {/* 60% 불투명도 */}
<div className="border-foreground/10"> {/* 10% 불투명도 */}
<div className="bg-foreground/5">     {/* 5% 불투명도 */}
```

**실제 CSS 변환:**
```css
/* text-foreground/60 */
color: rgb(23 23 23 / 0.6);

/* border-foreground/10 */
border-color: rgb(23 23 23 / 0.1);
```

**실무 팁:**
- `/50` = 반투명 (50%)
- `/20` = 연한 구분선
- `/5` = 매우 연한 배경

---

## 6. 접근성(Accessibility)

### 6.1 ARIA 속성

**실제 코드:**
```tsx
<button
  role="switch"              // 역할: 토글 스위치
  aria-checked={checked}     // 상태: 켜짐/꺼짐
  aria-label="뒤로가기"      // 스크린 리더용 레이블
>
```

**주요 ARIA 속성:**
- `role`: 요소의 역할 정의
- `aria-checked`: 체크박스/스위치 상태
- `aria-label`: 시각적 텍스트가 없을 때 레이블 제공
- `aria-disabled`: 비활성화 상태

### 6.2 시맨틱 HTML

**좋은 예:**
```tsx
<header>헤더</header>
<nav>네비게이션</nav>
<section>섹션</section>
<button>버튼</button>
```

**나쁜 예:**
```tsx
<div>헤더</div>  {/* ❌ */}
<div onClick={...}>버튼</div>  {/* ❌ */}
```

**왜 중요한가?**
- 스크린 리더 사용자
- 키보드 네비게이션
- SEO (검색 엔진 최적화)

---

## 7. 실무 개발 체크리스트

### 컴포넌트 개발 시
- [ ] TypeScript 타입 정의 완료
- [ ] Props 인터페이스 명확하게 작성
- [ ] 옵셔널 props에 기본값 제공
- [ ] 재사용 가능하도록 설계

### 상태 관리 시
- [ ] 연관된 상태는 함께 변경
- [ ] 사이드 이펙트 명확하게 처리
- [ ] persist가 필요한지 판단

### 이벤트 핸들링 시
- [ ] 이벤트 전파 고려
- [ ] stopPropagation 필요 여부 확인
- [ ] 중첩 클릭 요소 테스트

### CSS/스타일링 시
- [ ] CSS 변수 사용
- [ ] 디자인 시스템 따르기
- [ ] 타이포그래피 유틸리티 클래스 사용

### 접근성 시
- [ ] ARIA 속성 추가
- [ ] 키보드 네비게이션 가능
- [ ] 의미 있는 HTML 태그 사용

---

## 8. 자주 하는 실수와 해결법

### 실수 1: 상태 동기화 누락
```tsx
// ❌ 나쁜 예
setTextSize('large');  // textSize만 변경
// typographyMode는 여전히 'default' → 불일치!

// ✅ 좋은 예
setTextSize('large');  // 내부에서 typographyMode도 함께 변경
```

### 실수 2: 이벤트 버블링 무시
```tsx
// ❌ 나쁜 예: 두 번 토글됨
<ListItem onClick={toggle}>
  <Switch onClick={toggle} />
</ListItem>

// ✅ 좋은 예
<ListItem onClick={toggle}>
  <Switch onClick={(e) => {
    e.stopPropagation();
    toggle();
  }} />
</ListItem>
```

### 실수 3: 하드코딩된 스타일
```tsx
// ❌ 나쁜 예
<div className="text-gray-900 bg-gray-50">

// ✅ 좋은 예
<div className="text-foreground bg-background">
```

### 실수 4: 타입 any 남용
```tsx
// ❌ 나쁜 예
const handleChange = (value: any) => { ... }

// ✅ 좋은 예
const handleChange = (value: 'default' | 'large') => { ... }
```

---

## 9. 추가 학습 자료

### TypeScript
- [TypeScript 공식 문서](https://www.typescriptlang.org/docs/)
- 핸드북: Interfaces, Generics, Union Types

### React
- [React 공식 문서](https://react.dev/)
- 특히: Hooks, Event Handling, Composition

### Zustand
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- Persist Middleware 문서

### CSS
- [MDN CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)

### 접근성
- [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

---

## 10. 마치며

이 문서에서 다룬 개념들은:
- **즉시 실무에 적용 가능**
- **면접에서 자주 질문되는 내용**
- **시니어 개발자로 성장하는 데 필수적**

각 개념을 이해했다면:
1. 직접 비슷한 컴포넌트를 만들어보기
2. 다른 사람의 코드 리뷰하며 패턴 찾기
3. 공식 문서 읽으며 깊이 있게 학습하기

**행운을 빕니다! 🚀**
