// src/types/symptom.ts

/**
 * 증상 질문 타입 (GET /api/symptom/questions)
 */
export interface SymptomQuestion {
  id: number;
  questionText: string;
  questionCode: string;
  symptomCode: string;
  sortOrder: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SymptomAnswer {
  questionCode: string;
  answer: boolean;
}

/**
 * 증상 응답 인터페이스
 * 각 필드는 질문에 대한 Yes(true)/No(false) 응답
 */
export interface SymptomResponses {
  hasChestPain: boolean; // 가슴 통증
  hasDifficultyBreathing: boolean; // 호흡 곤란
  hasFever: boolean; // 발열
  hasCough: boolean; // 기침
  hasFatigue: boolean; // 피로감
  hasHeadache: boolean; // 두통
  hasDizziness: boolean; // 어지러움
  hasNausea: boolean; // 메스꺼움
  hasAbdominalPain: boolean; // 복통
  hasJointPain: boolean; // 관절통
  hasRunnyNose: boolean; // 콧물
}

/**
 * AI 서버에 보낼 증상 분석 요청
 */
export interface SymptomRequest {
  responses: SymptomResponses;
  metadata?: {
    timestamp: string;
    userId?: string;
  };
}

/**
 * 관련 질병 정보
 */
export interface RelatedDisease {
  name: string;
  probability: number; // 0-100
  description: string;
}

/**
 * AI 서버로부터 받을 증상 분석 응답
 */
export interface SymptomResponse {
  diagnosis: string; // 진단 결과
  severity: 'low' | 'medium' | 'high' | 'emergency'; // 심각도
  recommendations: string[]; // 권장사항 목록
  relatedDiseases: RelatedDisease[]; // 관련 가능 질병들
}
