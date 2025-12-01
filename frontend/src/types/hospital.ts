// src/types/hospital.ts
// 병원 관련 타입 정의

import type { Sort, Pageable } from './shelter';

/**
 * 병원 정보 (근처 병원 그룹 내)
 */
export interface Hospital {
  id: number;
  name: string;
  addrRoad: string;
  addrJibun: string;
  lat: number;
  lon: number;
  hasEmergencyRoom: boolean;
  distanceM: number;
}

/**
 * 근처 병원 그룹 (같은 좌표에 위치한 병원들)
 */
export interface HospitalGroup {
  lat: number;
  lon: number;
  addrRoad: string;
  addrJibun: string;
  hospitals: Hospital[];
}

/**
 * 근처 병원 그룹 응답 (GET /api/hospitals/nearby-grouped)
 */
export type NearbyHospitalsResponse = HospitalGroup[];

/**
 * 병원 검색 결과 아이템 (GET /api/hospitals/search)
 */
export interface HospitalSearchItem {
  id: number;
  name: string;
  shortAddress: string;
  lat: number;
  lon: number;
  hasEmergencyRoom: boolean;
  distanceM: number;
}

/**
 * 병원 검색 응답 (GET /api/hospitals/search)
 */
export interface HospitalSearchResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: HospitalSearchItem[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}
