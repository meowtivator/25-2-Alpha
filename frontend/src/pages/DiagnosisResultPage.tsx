// src/pages/DiagnosisResultPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import type { DiagnosisResponse } from '@/types/symptom';
import { ROUTES } from '@/lib/constants/routes';

export default function DiagnosisResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const diagnosisResult = location.state?.diagnosisResult as
    | DiagnosisResponse
    | undefined;

  // 결과 데이터가 없으면 Helper 페이지로 리다이렉트
  if (!diagnosisResult) {
    navigate(ROUTES.HELPER, { replace: true });
    return null;
  }

  // const diagnosisResult: DiagnosisResponse = {
  //   assessmentId: 1,
  //   suspected: true,
  //   headline: "온열 질환 의심",
  //   description: "온열질환이 의심됩니다 어쩌구",
  //   severity: 'low',
  // };

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
    // TODO: 지도 페이지로 이동하여 병원 검색
    navigate(ROUTES.HOME);
    console.log('내 주변 병원 찾기');
  };

  // 다시 진단하기
  const handleRestart = () => {
    navigate(ROUTES.HELPER);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-background flex flex-col items-center justify-center">
      {/* 헤드라인 */}
      <h1 className={`text-h1 text-center mb-6 ${diagnosisResult.suspected ? 'text-red-600' : 'text-blue-600'}`}>{diagnosisResult.headline}</h1>

      {/* 메시지 */}
      <div className="text-center mb-8">
        <p className="text-body text-foreground">
          {diagnosisResult.description}
        </p>
      </div>

      {/* 액션 버튼들 */}
      <div className="space-y-4 flex flex-col justify-center items-center">
        <button
          onClick={handleViewGuidelines}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          대처 방안 확인하기
        </button>

        {diagnosisResult.suspected && <button
          onClick={handleFindHospital}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          내 주변 병원 찾기
        </button>}

        <button
          onClick={handleRestart}
          className="w-[234px] px-12 py-5 bg-blue-100 text-[#191A1C] rounded-[50px] text-button hover:bg-blue-200 active:bg-blue-300"
        >
          다시 진단하기
        </button>
      </div>
    </div>
  );
}
