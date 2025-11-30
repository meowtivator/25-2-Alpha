// src/pages/GuidelinePage.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  fetchSymptomGuides,
  fetchDiagnosisDetail,
  fetchAIResult,
} from '@/api/symptomApi';
import type {
  SymptomGuide,
  DiagnosisDetail,
  AIResult,
} from '@/types/symptom';
import { ROUTES } from '@/lib/constants/routes';

export default function GuidelinePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { suspected, assessmentId } = location.state as {
    suspected: boolean;
    assessmentId: number;
  };

  const [guides, setGuides] = useState<SymptomGuide[]>([]);
  const [diagnosisDetail, setDiagnosisDetail] =
    useState<DiagnosisDetail | null>(null);
  const [aiResult, setAIResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (suspected) {
          // 온열질환 의심되는 경우: AI 진단 + 상세 진단
          const [aiData, detailData] = await Promise.all([
            fetchAIResult(assessmentId),
            fetchDiagnosisDetail(assessmentId),
          ]);
          setAIResult(aiData);
          setDiagnosisDetail(detailData);
        } else {
          // 온열질환 의심되지 않는 경우: 전체 가이드
          const guidesData = await fetchSymptomGuides();
          setGuides(guidesData);
        }
      } catch (err) {
        console.error('가이드 정보 조회 실패:', err);
        setError('가이드 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [suspected, assessmentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-body text-foreground">정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4">
        <p className="text-body text-red-600">{error}</p>
        <button
          onClick={() => navigate(ROUTES.HELPER)}
          className="px-4 py-2 bg-blue-100 text-[#191A1C] rounded-lg"
        >
          처음으로 돌아가기
        </button>
      </div>
    );
  }

  // suspected = false: 전체 가이드 표시
  if (!suspected) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-6 bg-background">
        <h1 className="text-h1 text-center mb-6">온열질환 종류 및 대응법</h1>

        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-3xl p-5"
            >
              {/* 질환명 */}
              <h2 className="text-h2 mb-3">{guide.disease}</h2>

              {/* 정의 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">정의</h3>
                <p className="text-body text-foreground/80">
                  {guide.definition}
                </p>
              </div>

              {/* 증상 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">증상</h3>
                <ul className="list-disc list-inside space-y-1">
                  {guide.symptoms.map((symptom, idx) => (
                    <li key={idx} className="text-body text-foreground/80">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 대응법 */}
              <div>
                <h3 className="text-button mb-2">대응법</h3>
                <ul className="list-disc list-inside space-y-1">
                  {guide.advice.map((item, idx) => (
                    <li key={idx} className="text-body text-foreground/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // suspected = true: AI 진단 + 상세 진단 표시
  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 bg-background">
      <h1 className="text-h1 text-center mb-6 text-red-600">
        자가진단 결과 안내
      </h1>

      {/* AI 진단 */}
      {aiResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 mb-4">
          <h2 className="text-h2 mb-3">AI 진단</h2>
          <div className="mb-3">
            <h3 className="text-button mb-2">AI 프롬프트 답변 요약</h3>
            <p className="text-body text-foreground/80">{aiResult.summary}</p>
          </div>
          <div>
            <h3 className="text-button mb-2">AI 답변 전문</h3>
            <p className="text-body text-foreground/80 whitespace-pre-line">
              {aiResult.detail}
            </p>
          </div>
        </div>
      )}

      {/* 구분선 */}
      <div className="border-t border-foreground/20 my-6"></div>

      {/* 상세 진단 */}
      {diagnosisDetail && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5">
          <h2 className="text-h2 mb-3">{diagnosisDetail.disease}</h2>

          {/* 정의 */}
          <div className="mb-4">
            <h3 className="text-button mb-2">정의</h3>
            <p className="text-body text-foreground/80">
              {diagnosisDetail.definition}
            </p>
          </div>

          {/* 증상 */}
          <div className="mb-4">
            <h3 className="text-button mb-2">증상</h3>
            <ul className="list-disc list-inside space-y-1">
              {diagnosisDetail.symptoms.map((symptom, idx) => (
                <li key={idx} className="text-body text-foreground/80">
                  {symptom}
                </li>
              ))}
            </ul>
          </div>

          {/* 대응법 */}
          <div>
            <h3 className="text-button mb-2">대응법</h3>
            <ul className="list-disc list-inside space-y-1">
              {diagnosisDetail.advice.map((item, idx) => (
                <li key={idx} className="text-body text-foreground/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
