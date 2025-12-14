// src/api/shelterApi.ts
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';
import type { ShelterSearchResponse, ShelterDetail, ShelterGroup } from '@/types/shelter';

/**
 * 쉼터 검색
 * @param keyword - 검색 키워드
 * @param seasonType - 계절 타입 (HEAT: 더위, COLD: 추위)
 * @param type - 쉼터 타입 (PUBLIC: 공공, PRIVATE: 민간)
 * @param page - 페이지 번호 (0부터 시작)
 * @param size - 페이지 크기
 * @returns 쉼터 검색 결과
 */
export type SeasonType = 'HEAT' | 'COLD';
export type ShelterType = 'PUBLIC' | 'PRIVATE';

export async function searchShelters(
  keyword: string,
  seasonType: SeasonType = 'HEAT',
  type?: ShelterType,
  page: number = 0,
  size: number = 20
): Promise<ShelterSearchResponse> {
  try {
    const params = new URLSearchParams({
      keyword,
      seasonType,
      page: page.toString(),
      size: size.toString(),
    });

    // type이 제공된 경우에만 추가
    if (type) {
      params.append('type', type);
    }

    const response = await fetch(
      `${API_BASE_URL}/api/shelters/search?${params}`,
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

    const data: ShelterSearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('쉼터 검색 실패:', error);
    throw error;
  }
}

/**
 * 쉼터 상세 정보 조회
 * @param id - 쉼터 ID
 * @param seasonType - 계절 타입 (HEAT: 더위, COLD: 추위)
 * @returns 쉼터 상세 정보
 */
export async function fetchShelterDetail(
  id: number,
  seasonType: SeasonType = 'HEAT'
): Promise<ShelterDetail> {
  try {
    const params = new URLSearchParams({
      seasonType,
    });

    const response = await fetch(`${API_BASE_URL}/api/shelters/${id}?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ShelterDetail = await response.json();
    return data;
  } catch (error) {
    console.error('쉼터 상세 정보 조회 실패:', error);
    throw error;
  }
}

/**
 * 지도 영역 내 쉼터 그룹 조회
 * @param minLat - 최소 위도
 * @param maxLat - 최대 위도
 * @param minLon - 최소 경도
 * @param maxLon - 최대 경도
 * @param seasonType - 계절 타입 (HEAT: 더위, COLD: 추위)
 * @param type - 쉼터 타입 (PUBLIC: 공공, PRIVATE: 민간)
 * @returns 쉼터 그룹 목록
 */
export async function fetchSheltersInBounds(
  minLat: number,
  maxLat: number,
  minLon: number,
  maxLon: number,
  seasonType: SeasonType = 'HEAT',
  type?: ShelterType
): Promise<ShelterGroup[]> {
  try {
    const params = new URLSearchParams({
      minLat: minLat.toString(),
      maxLat: maxLat.toString(),
      minLon: minLon.toString(),
      maxLon: maxLon.toString(),
      seasonType,
    });

    // type이 제공된 경우에만 추가
    if (type) {
      params.append('type', type);
    }

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SHELTERS_IN_BOUNDS_GROUPED}?${params}`,
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

    const data: ShelterGroup[] = await response.json();
    return data;
  } catch (error) {
    console.error('지도 영역 내 쉼터 조회 실패:', error);
    throw error;
  }
}
