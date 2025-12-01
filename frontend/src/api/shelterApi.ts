// src/api/shelterApi.ts
import { API_BASE_URL } from '@/lib/constants/api';
import type { ShelterSearchResponse, ShelterDetail } from '@/types/shelter';

/**
 * 쉼터 검색
 * @param keyword - 검색 키워드
 * @param page - 페이지 번호 (0부터 시작)
 * @param size - 페이지 크기
 * @returns 쉼터 검색 결과
 */
export async function searchShelters(
  keyword: string,
  page: number = 0,
  size: number = 20
): Promise<ShelterSearchResponse> {
  try {
    const params = new URLSearchParams({
      keyword,
      page: page.toString(),
      size: size.toString(),
    });

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
 * @returns 쉼터 상세 정보
 */
export async function fetchShelterDetail(
  id: number
): Promise<ShelterDetail> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/shelters/${id}`, {
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
