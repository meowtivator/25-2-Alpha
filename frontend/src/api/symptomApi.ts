import { API_BASE_URL, API_ENDPOINTS } from "@/lib/constants/api";
import type { SymptomQuestion } from "@/types/symptom";

/**
 * 온열질환 증상 질문 목록 조회
 * @returns 질문 목록 (sortOrder 기준 정렬)
 * @throws API 호출 실패 시 에러
 */
export async function fetchSymptomQuestions(): Promise<SymptomQuestion[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_QUESTIONS}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SymptomQuestion[] = await response.json();

    return data.sort((a,b) => a.sortOrder - b.sortOrder);
  }catch(error){
    console.error('증상 질문 조회 실패:', error);
    throw error;
  }
}

