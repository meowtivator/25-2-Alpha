// src/data/symptomQuestions.ts
import type {  SymptomResponses } from '@/types/symptom';

// toDO: api 연동해서 증상 받아오기
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
