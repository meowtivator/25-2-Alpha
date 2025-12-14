// src/types/shelter.ts
// 쉼터 관련 타입 정의

/**
 * 페이지네이션 정렬 정보
 */
export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

/**
 * 페이지네이션 정보
 */
export interface Pageable {
  offset: number;
  sort: Sort[];
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

/**
 * 쉼터 검색 결과 아이템 (GET /api/shelters/search)
 */
export interface ShelterSearchItem {
  id: number;
  name: string;
  shortAddress: string;
  addrRoad: string;
  addrJibun: string;
  lat: number;
  lon: number;
  type: string;
  category: string;
  capacity: number;
  distanceM: number;
}

/**
 * 쉼터 검색 응답 (GET /api/shelters/search)
 */
export interface ShelterSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ShelterSearchItem[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

/**
 * 쉼터 상세 정보 (GET /api/shelters/{id})
 */
export interface ShelterDetail {
  id: number;
  name: string;
  addrRoad: string;
  addrJibun: string;
  lat: number;
  lon: number;
  type: string;
  category: string;
  capacity: number;
  area: number;
  fanCount: number;
  airconCount: number;
  weekdayOpenTime: string;
  weekdayCloseTime: string;
  nightOpen: boolean;
  weekendOpen: boolean;
}

/**
 * 쉼터 그룹 내 쉼터 아이템 (GET /api/shelters/in-bounds-grouped)
 */
export interface ShelterInGroup {
  id: number;
  name: string;
}

/**
 * 쉼터 그룹 (GET /api/shelters/in-bounds-grouped)
 */
export interface ShelterGroup {
  groupId: string;
  lat: number;
  lon: number;
  addrRoad: string;
  addrJibun: string;
  shelters: ShelterInGroup[];
}

/**
 * 쉼터 정보 (레거시 - 호환성 유지)
 */
export interface ShelterResult {
  id: string;
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  operatingHours?: string;
  latitude: number;
  longitude: number;
}
