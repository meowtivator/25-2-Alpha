// src/api/hospitalApi.ts
import { API_BASE_URL } from '@/lib/constants/api';
import type {
  NearbyHospitalsResponse,
  HospitalSearchResponse,
} from '@/types/hospital';

/**
 * 근처 병원 그룹 조회
 * @param lat - 기준 위도
 * @param lon - 기준 경도
 * @param radius - 검색 반경 (m), 기본 2000
 * @returns 근처 병원 그룹 목록
 */
export async function fetchNearbyHospitals(
  lat: number,
  lon: number,
  radius: number = 2000
): Promise<NearbyHospitalsResponse> {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lon.toString(),
      radius: radius.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/api/hospitals/nearby-grouped?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NearbyHospitalsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('근처 병원 조회 실패:', error);
    throw error;
  }
}

/**
 * 병원 검색
 * @param keyword - 검색 키워드
 * @param page - 페이지 번호 (0부터 시작)
 * @param size - 페이지 크기
 * @returns 병원 검색 결과
 */
export async function searchHospitals(
  keyword: string,
  page: number = 0,
  size: number = 20
): Promise<HospitalSearchResponse> {
  try {
    const params = new URLSearchParams({
      keyword,
      page: page.toString(),
      size: size.toString(),
    });

    const response = await fetch(
      `${API_BASE_URL}/api/hospitals/search?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: HospitalSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('병원 검색 실패:', error);
    throw error;
  }
}
