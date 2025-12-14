import { API_BASE_URL, API_ENDPOINTS } from '@/lib/constants/api';
import i18n from '@/lib/i18n';
import type {
  SymptomQuestion,
  DiagnosisRequest,
  DiagnosisResponse,
  SymptomGuide,
  DiagnosisDetail,
  AIResult,
} from '@/types/symptom';

/**
 * 온열질환 증상 질문 목록 조회
 * @param seasonType - 계절 타입 (HEAT: 더위, COLD: 추위)
 * @returns 질문 목록 (sortOrder 기준 정렬)
 * @throws API 호출 실패 시 에러
 */
export async function fetchSymptomQuestions(
  seasonType: 'HEAT' | 'COLD' = 'HEAT'
): Promise<SymptomQuestion[]> {
  try {
    const params = new URLSearchParams({
      seasonType,
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_QUESTIONS}?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
      },
    );

    if (!response.ok){
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SymptomQuestion[] = await response.json();

    return data.sort((a, b) => a.sortOrder - b.sortOrder);
  } catch (error) {
    console.error('증상 질문 조회 실패:', error);
    throw error;
  }
}

/**
 * 증상 진단 API 호출
 * @param request - 질문 ID와 답변 배열
 * @returns 진단 결과 (심각도, 헤드라인, 설명 등)
 * @throws API 호출 실패 시 에러
 */
export async function submitDiagnosis(
  request: DiagnosisRequest
): Promise<DiagnosisResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_DIAGNOSIS}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DiagnosisResponse = await response.json();
    return data;
  } catch (error) {
    console.error('증상 진단 실패:', error);
    throw error;
  }
}

/**
 * 온열질환 전체 가이드 조회 (suspected = false)
 * @param seasonType - 계절 타입 (HEAT: 더위, COLD: 추위)
 * @returns 질환별 가이드 목록
 * @throws API 호출 실패 시 에러
 */
export async function fetchSymptomGuides(
  seasonType: 'HEAT' | 'COLD' = 'HEAT'
): Promise<SymptomGuide[]> {
  try {
    const params = new URLSearchParams({
      seasonType,
    });

    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_GUIDES}?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SymptomGuide[] = await response.json();
    return data;
  } catch (error) {
    console.error('증상 가이드 조회 실패:', error);
    throw error;
  }
}

/**
 * 상세 진단 정보 조회 (suspected = true)
 * @param assessmentId - 진단 ID
 * @returns 상세 진단 정보
 * @throws API 호출 실패 시 에러
 */
export async function fetchDiagnosisDetail(
  assessmentId: number
): Promise<DiagnosisDetail> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_DIAGNOSIS_DETAIL(assessmentId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DiagnosisDetail = await response.json();
    return data;
  } catch (error) {
    console.error('상세 진단 정보 조회 실패:', error);
    throw error;
  }
}

/**
 * 상세 진단 가이드 목록 조회 (suspected = true)
 * @param assessmentId - 진단 ID
 * @returns 질환별 가이드 목록
 * @throws API 호출 실패 시 에러
 */
export async function fetchAssessmentGuides(
  assessmentId: number
): Promise<SymptomGuide[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_ASSESSMENT_GUIDES(assessmentId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: SymptomGuide[] = await response.json();
    return data;
  } catch (error) {
    console.error('상세 진단 가이드 조회 실패:', error);
    throw error;
  }
}

/**
 * AI 진단 결과 조회
 * @param assessmentId - 진단 ID
 * @returns AI 진단 결과
 * @throws API 호출 실패 시 에러
 */
export async function fetchAIResult(
  assessmentId: number
): Promise<AIResult> {
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.SYMPTOM_AI_RESULT(assessmentId)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': i18n.language,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: AIResult = await response.json();
    return data;
  } catch (error) {
    console.error('AI 진단 결과 조회 실패:', error);
    throw error;
  }
}
