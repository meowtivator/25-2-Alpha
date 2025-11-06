# Prettier 설정 가이드

## 설치 완료된 항목

✅ Prettier 패키지 설치 완료
✅ ESLint와 Prettier 통합 완료
✅ VSCode 자동 포맷 설정 완료

## 사용 방법

### 1. 명령줄에서 사용

```bash
# 전체 코드 포맷팅
npm run format

# 포맷 검사만 하기 (변경 없음)
npm run format:check

# ESLint 자동 수정
npm run lint:fix
```

### 2. VSCode에서 자동 포맷

`.vscode/settings.json` 파일이 설정되어 있어서:

- **파일 저장 시 자동 포맷** (`Ctrl+S` / `Cmd+S`)
- **붙여넣기 시 자동 포맷**
- **ESLint 자동 수정** (저장 시)

### 3. 필요한 VSCode 확장 프로그램

다음 확장 프로그램을 설치하세요:

1. **Prettier - Code formatter** (esbenp.prettier-vscode)
2. **ESLint** (dbaeumer.vscode-eslint)
3. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

## Prettier 설정 (.prettierrc)

```json
{
  "semi": true,              // 세미콜론 사용
  "singleQuote": true,       // 작은따옴표 사용
  "tabWidth": 2,             // 들여쓰기 2칸
  "trailingComma": "es5",    // 후행 쉼표 (ES5 호환)
  "printWidth": 80,          // 한 줄 최대 80자
  "endOfLine": "lf",         // LF 줄바꿈 (Unix/Mac)
  "arrowParens": "always",   // 화살표 함수 괄호 항상 사용
  "bracketSpacing": true,    // 객체 중괄호에 공백
  "jsxSingleQuote": false,   // JSX에는 큰따옴표
  "proseWrap": "preserve"    // 마크다운 줄바꿈 유지
}
```

## 포맷팅 예시

### Before (일관성 없음)

```typescript
interface ToggleOption{
  value: string;
  label: string;
}

export function ToggleButtons({ options, value, onChange} : ToggleButtonsProps) {
  return (
    <button key = {option.value} onClick={handleClick(option.value)}>
      {option.label}
    </button>
  )
}
```

### After (Prettier 적용)

```typescript
interface ToggleOption {
  value: string;
  label: string;
}

export function ToggleButtons({
  options,
  value,
  onChange,
}: ToggleButtonsProps) {
  return (
    <button key={option.value} onClick={handleClick(option.value)}>
      {option.label}
    </button>
  );
}
```

## Git Hooks (선택사항)

커밋 전에 자동으로 포맷하려면 `husky`와 `lint-staged`를 설치할 수 있습니다:

```bash
npm install -D husky lint-staged

# package.json에 추가
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": [
      "prettier --write",
      "eslint --fix"
    ]
  }
}
```

## 팀 협업 가이드

1. **모든 팀원이 동일한 설정 사용**
   - `.prettierrc` 파일을 Git에 커밋
   - VSCode 설정 공유

2. **포맷 검사를 CI/CD에 추가**
   ```bash
   npm run format:check
   ```

3. **코드 리뷰 시 포맷 논쟁 방지**
   - Prettier가 자동으로 처리하므로 스타일 논쟁 불필요

## 주요 변경 사항

Prettier 적용 후 다음이 자동으로 수정됩니다:

- ✅ 인터페이스 중괄호 앞 공백 추가
- ✅ 긴 props를 여러 줄로 분리
- ✅ 일관된 따옴표 사용 (TypeScript: 작은따옴표, JSX: 큰따옴표)
- ✅ 들여쓰기 일관성
- ✅ 후행 쉼표 자동 추가
- ✅ 세미콜론 일관성

## 문제 해결

### VSCode에서 자동 포맷이 안 될 때

1. VSCode 확장 프로그램 설치 확인
2. 설정에서 기본 포맷터 확인:
   ```
   File > Preferences > Settings
   검색: "Default Formatter"
   → "Prettier - Code formatter" 선택
   ```

### Prettier와 ESLint 충돌

- `eslint-config-prettier`가 설치되어 있어 충돌 방지
- ESLint는 코드 품질, Prettier는 포맷팅 담당

## 참고 자료

- [Prettier 공식 문서](https://prettier.io/docs/en/)
- [ESLint + Prettier 통합 가이드](https://prettier.io/docs/en/integrating-with-linters.html)
