// src/pages/DiagnosisResultPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { DiagnosisResponse } from '@/types/symptom';
import { ROUTES } from '@/lib/constants/routes';

export default function DiagnosisResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const diagnosisResult = location.state?.diagnosisResult as
    | DiagnosisResponse
    | undefined;

  // 결과 데이터가 없으면 Helper 페이지로 리다이렉트
  if (!diagnosisResult) {
    navigate(ROUTES.HELPER, { replace: true });
    return null;
  }

  // 대처 방안 확인하기
  const handleViewGuidelines = () => {
    navigate(ROUTES.GUIDELINE, {
      state: {
        suspected: diagnosisResult.suspected,
        assessmentId: diagnosisResult.assessmentId,
      },
    });
  };

  // 내 주변 병원 찾기
  const handleFindHospital = () => {
    navigate(ROUTES.HOSPITAL_MAP);
  };

  // 다시 진단하기
  const handleRestart = () => {
    navigate(ROUTES.HELPER);
  };

  const headlineKey = diagnosisResult.suspected ? 'diagnosisHeadlineSuspected' : 'diagnosisHeadlineNormal';
  const descriptionKey = diagnosisResult.suspected ? 'diagnosisDescriptionSuspected' : 'diagnosisDescriptionNormal';

  return (
    <div className="min-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] p-6 bg-background flex flex-col items-center justify-center">
      {/* 헤드라인 */}
      <h1 className={`text-h1 text-center mb-6 ${diagnosisResult.suspected ? 'text-red-600' : 'text-blue-600'}`}>{t(headlineKey)}</h1>

      {/* 메시지 */}
      <div className="text-center mb-8">
        <p className="text-body text-foreground whitespace-pre-line">
          {t(descriptionKey)}
        </p>
      </div>

      {/* 액션 버튼들 */}
      <div className="space-y-4 flex flex-col justify-center items-center">
        <button
          onClick={handleViewGuidelines}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          {t('viewResponseTips')}
        </button>

        {diagnosisResult.suspected && <button
          onClick={handleFindHospital}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          {t('findNearbyHospitals')}
        </button>}

        <button
          onClick={handleRestart}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          {t('checkAgain')}
        </button>
      </div>
    </div>
  );
}