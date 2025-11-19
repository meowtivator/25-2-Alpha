// src/types/shelter.ts
// 쉼터 관련 타입 정의

/**
 * 쉼터 정보
 * - API 응답 및 앱 전체에서 사용
 */
export interface ShelterResult {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  operatingHours?: string;
  latitude: number;   // 위도 (필수)
  longitude: number;  // 경도 (필수)
}

/**
 * 쉼터 검색 응답
 */
export interface ShelterSearchResponse {
  shelters: ShelterResult[];
  total: number;
  page: number;
}
