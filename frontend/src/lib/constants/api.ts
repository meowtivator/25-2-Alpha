export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
  SYMPTOM_QUESTIONS: '/api/symptom/questions',
  SYMPTOM_DIAGNOSIS: '/api/symptom/diagnosis',
  SYMPTOM_GUIDES: '/api/symptom/guides',
  SYMPTOM_DIAGNOSIS_DETAIL: (assessmentId: number) => `/api/symptom/diagnosis/${assessmentId}`,
  SYMPTOM_AI_RESULT: (assessmentId: number) => `/api/symptom/assessment/${assessmentId}/ai-result`,
  SYMPTOM_ASSESSMENT_GUIDES: (assessmentId: number) => `/api/symptom/assessment/${assessmentId}/guides`,
  SHELTERS_IN_BOUNDS_GROUPED: '/api/shelters/in-bounds-grouped',
} as const;
