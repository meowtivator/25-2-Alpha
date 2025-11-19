// src/api/symptomApi.ts
import type { SymptomRequest, SymptomResponse } from '@/types/symptom';
import { ENV } from '@/config/env';

/**
 * 증상 분석 API 호출
 * @param request - 증상 응답 데이터
 * @returns AI가 분석한 진단 결과
 */
export async function analyzeSymptoms(
  request: SymptomRequest
): Promise<SymptomResponse> {
  try {
    const response = await fetch(`${ENV.API_URL}/api/symptoms/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`증상 분석 실패: ${response.status}`);
    }

    const data: SymptomResponse = await response.json();
    return data;
  } catch (error) {
    console.error('증상 분석 API 오류:', error);
    throw error;
  }
}

/**
 * Mock 데이터 (백엔드 API 개발 전 테스트용)
 * 실제 API 완성 후 제거 예정
 */
export async function analyzeSymptomsMock(
  request: SymptomRequest
): Promise<SymptomResponse> {
  // 실제 API 호출처럼 딜레이 추가
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock 응답 데이터
  return {
    diagnosis:
      '입력하신 증상을 바탕으로 감기 또는 독감의 가능성이 있습니다. 충분한 휴식과 수분 섭취가 필요합니다.',
    severity: 'medium',
    recommendations: [
      '충분한 휴식을 취하세요',
      '수분을 많이 섭취하세요',
      '증상이 3일 이상 지속되면 병원을 방문하세요',
      '해열제를 복용할 수 있습니다',
      '주변 사람들과의 접촉을 최소화하세요',
    ],
    relatedDiseases: [
      {
        name: '독감 (인플루엔자)',
        probability: 75,
        description: '발열, 기침, 피로감 등의 증상이 동반되는 바이러스성 질환',
      },
      {
        name: '감기',
        probability: 65,
        description: '콧물, 기침, 목 통증 등이 나타나는 상기도 감염',
      },
      {
        name: '코로나19',
        probability: 45,
        description: '발열, 기침, 호흡곤란 등이 나타날 수 있는 감염병',
      },
    ],
  };
}
