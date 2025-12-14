// src/pages/GuidelinePage.tsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  fetchSymptomGuides,
  fetchAIResult,
  fetchAssessmentGuides,
} from '@/api/symptomApi';
import type {
  SymptomGuide,
  AIResult,
} from '@/types/symptom';
import { ROUTES } from '@/lib/constants/routes';
import { symptomGuideData } from '@/data/symptomGuideData';
import { useSettingsStore } from '@/stores/settingsStore';

export default function GuidelinePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const showColdShelters = useSettingsStore((state) => state.showColdShelters);
  const seasonType: 'HEAT' | 'COLD' = showColdShelters ? 'COLD' : 'HEAT';
  const { suspected, assessmentId } = location.state as {
    suspected: boolean;
    assessmentId: number;
  };

  const [guides, setGuides] = useState<SymptomGuide[]>([]);
  const [assessmentGuides, setAssessmentGuides] = useState<SymptomGuide[]>([]);
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
          const [aiData, guidesData] = await Promise.all([
            fetchAIResult(assessmentId),
            fetchAssessmentGuides(assessmentId),
          ]);
          setAIResult(aiData);
          // guidesData가 배열이 아닐 경우를 대비해 배열로 보장
          setAssessmentGuides(Array.isArray(guidesData) ? guidesData : [guidesData]);
        } else {
          // 온열질환 의심되지 않는 경우: 전체 가이드
          const guidesData = await fetchSymptomGuides(seasonType);
          setGuides(guidesData);
        }
      } catch (err) {
        console.error('가이드 정보 조회 실패:', err);
        setError(t('loadGuidesFailed'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [suspected, assessmentId, i18n.language, t, seasonType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem-env(safe-area-inset-bottom))]">
        <p className="text-body text-foreground">{t('loadingInfo')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem-env(safe-area-inset-bottom))] gap-4">
        <p className="text-body text-red-600">{error}</p>
        <button
          onClick={() => navigate(ROUTES.HELPER)}
          className="px-4 py-2 bg-blue-100 text-[#191A1C] rounded-lg"
        >
          {t('backToStart')}
        </button>
      </div>
    );
  }

  // suspected = false: 전체 가이드 표시
  if (!suspected) {
    return (
      <div className="min-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] p-6 bg-background">
        <h1 className="text-h1 text-center mb-6">{t('heatIllnessTypesAndResponse')}</h1>

        <div className="space-y-4">
          {guides.map((guide, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-3xl p-5"
            >
              {/* 질환명 */}
              <h2 className="text-h2 mb-3">{t(`disease_${guide.disease}`)}</h2>

              {/* 정의 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">{t('definition')}</h3>
                <p className="text-body text-foreground/80 whitespace-pre-line">
                  {symptomGuideData[guide.disease]?.[i18n.language]?.definition || guide.definition}
                </p>
              </div>

              {/* 증상 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">{t('symptoms')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(symptomGuideData[guide.disease]?.[i18n.language]?.symptoms || guide.symptoms).map((symptom, idx) => (
                    <li key={idx} className="text-body text-foreground/80">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 대응법 */}
              <div>
                <h3 className="text-button mb-2">{t('response')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(symptomGuideData[guide.disease]?.[i18n.language]?.advice || guide.advice).map((item, idx) => (
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
    <div className="min-h-[calc(100vh-4rem-env(safe-area-inset-bottom))] p-6 bg-background">
      <h1 className="text-h1 text-center mb-6 text-red-600">
        {t('symptomCheckResult')}
      </h1>

      {/* AI 진단 */}
      {aiResult && (
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5 mb-4">
          <h2 className="text-h2 mb-3">{t('aiDiagnosisTitle')}</h2>
          <div className="mb-3">
            <h3 className="text-button mb-2">{t('aiPromptSummary')}</h3>
            <p className="text-body text-foreground/80">{aiResult.summary}</p>
          </div>
          <div>
            <h3 className="text-button mb-2">{t('aiResponseFull')}</h3>
            <p className="text-body text-foreground/80 whitespace-pre-line">
              {aiResult.detail}
            </p>
          </div>
        </div>
      )}

      {/* 구분선 */}
      <div className="border-t border-foreground/20 my-6"></div>

      {/* 상세 진단 - 여러 질병이 있을 수 있으므로 배열로 처리 */}
      {assessmentGuides.length > 0 && (
        <div className="space-y-4">
          {assessmentGuides.map((detail, index) => (
            <div key={index} className="bg-blue-50 border border-blue-200 rounded-3xl p-5">
              <h2 className="text-h2 mb-3">{t(`disease_${detail.disease}`)}</h2>

              {/* 정의 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">{t('definition')}</h3>
                <p className="text-body text-foreground/80 whitespace-pre-line">
                  {symptomGuideData[detail.disease]?.[i18n.language]?.definition || detail.definition}
                </p>
              </div>

              {/* 증상 */}
              <div className="mb-4">
                <h3 className="text-button mb-2">{t('symptoms')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(symptomGuideData[detail.disease]?.[i18n.language]?.symptoms || detail.symptoms).map((symptom, idx) => (
                    <li key={idx} className="text-body text-foreground/80">
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 대응법 */}
              <div>
                <h3 className="text-button mb-2">{t('response')}</h3>
                <ul className="list-disc list-inside space-y-1">
                  {(symptomGuideData[detail.disease]?.[i18n.language]?.advice || detail.advice).map((item, idx) => (
                    <li key={idx} className="text-body text-foreground/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
