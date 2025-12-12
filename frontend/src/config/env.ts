// src/config/env.ts

/**
 * 환경 변수 설정
 * .env.local 파일에서 값을 읽어옵니다.
 */
export const ENV = {
  // 카카오맵 API 키
  KAKAO_MAP_KEY: import.meta.env.VITE_KAKAO_MAP_KEY || '',

  // API URL
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',

  // 환경 구분
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
} as const;

// 개발 환경에서 환경 변수 검증
if (ENV.IS_DEVELOPMENT) {
  if (!ENV.KAKAO_MAP_KEY) {
    console.warn(
      '⚠️ VITE_KAKAO_MAP_KEY가 설정되지 않았습니다. .env.local 파일을 확인하세요.'
    );
  }
}
