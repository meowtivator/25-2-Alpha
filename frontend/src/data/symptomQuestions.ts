// src/data/symptomQuestions.ts
import type { SymptomQuestion, SymptomResponses } from '@/types/symptom';

/**
 * 증상 자가진단 질문 목록
 * 피그마 디자인에 맞춰 11개 질문으로 구성
 */
export const SYMPTOM_QUESTIONS: SymptomQuestion[] = [
  {
    id: 'chest-pain',
    text: '가슴 통증이 있나요?',
    field: 'hasChestPain',
  },
  {
    id: 'breathing',
    text: '호흡 곤란이 있나요?',
    field: 'hasDifficultyBreathing',
  },
  {
    id: 'fever',
    text: '발열이 있나요?',
    field: 'hasFever',
  },
  {
    id: 'cough',
    text: '기침이 있나요?',
    field: 'hasCough',
  },
  {
    id: 'fatigue',
    text: '피로감이 있나요?',
    field: 'hasFatigue',
  },
  {
    id: 'headache',
    text: '두통이 있나요?',
    field: 'hasHeadache',
  },
  {
    id: 'dizziness',
    text: '어지러움이 있나요?',
    field: 'hasDizziness',
  },
  {
    id: 'nausea',
    text: '메스꺼움이 있나요?',
    field: 'hasNausea',
  },
  {
    id: 'abdominal-pain',
    text: '복통이 있나요?',
    field: 'hasAbdominalPain',
  },
  {
    id: 'joint-pain',
    text: '관절통이 있나요?',
    field: 'hasJointPain',
  },
  {
    id: 'runny-nose',
    text: '콧물이 있나요?',
    field: 'hasRunnyNose',
  },
];

/**
 * 초기 응답 상태 (모든 증상 false)
 */
export const INITIAL_RESPONSES: SymptomResponses = {
  hasChestPain: false,
  hasDifficultyBreathing: false,
  hasFever: false,
  hasCough: false,
  hasFatigue: false,
  hasHeadache: false,
  hasDizziness: false,
  hasNausea: false,
  hasAbdominalPain: false,
  hasJointPain: false,
  hasRunnyNose: false,
};
