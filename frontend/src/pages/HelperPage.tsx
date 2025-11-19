// src/pages/HelperPage.tsx
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { SYMPTOM_QUESTIONS, INITIAL_RESPONSES } from '@/data/symptomQuestions';
import type { SymptomResponses, SymptomResponse } from '@/types/symptom';
import { analyzeSymptomsMock } from '@/api/symptomApi';

export default function HelperPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<SymptomResponses>(INITIAL_RESPONSES);
  const [result, setResult] = useState<SymptomResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const currentQuestion = SYMPTOM_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === SYMPTOM_QUESTIONS.length - 1;
  const totalQuestions = SYMPTOM_QUESTIONS.length;

  // 시작하기
  const handleStart = () => {
    setShowIntro(false);
  };

  // 답변 처리
  const handleAnswer = async (answer: boolean) => {
    // 응답 저장
    const newResponses = {
      ...responses,
      [currentQuestion.field]: answer,
    };
    setResponses(newResponses);

    if (isLastQuestion) {
      // 마지막 질문 - AI 분석 요청
      setIsLoading(true);
      try {
        const analysisResult = await analyzeSymptomsMock({
          responses: newResponses,
          metadata: {
            timestamp: new Date().toISOString(),
          },
        });
        setResult(analysisResult);
      } catch (error) {
        console.error('분석 실패:', error);
        alert('증상 분석에 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // 다음 질문으로
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 이전 질문으로
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // 처음부터 다시
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setResponses(INITIAL_RESPONSES);
    setResult(null);
    setShowIntro(true);
  };

  // 심각도별 색상
  const getSeverityColor = (severity: SymptomResponse['severity']) => {
    switch (severity) {
      case 'emergency':
        return 'text-red-600 bg-red-50';
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-blue-600 bg-blue-50';
      case 'low':
        return 'text-blue-500 bg-blue-50';
    }
  };

  const getSeverityText = (severity: SymptomResponse['severity']) => {
    switch (severity) {
      case 'emergency':
        return '🚨 응급';
      case 'high':
        return '⚠️ 높음';
      case 'medium':
        return '📋 보통';
      case 'low':
        return '✅ 낮음';
    }
  };

  // 인트로 화면
  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6 bg-background">
        <h1 className="text-h1 mb-4 text-center">계절 질환 자가진단 도우미</h1>
        <p className="text-body text-foreground/60 text-center mb-8">
          간단한 질문에 답하시면
          <br />
          AI가 증상을 분석해드립니다
        </p>
        <button
          onClick={handleStart}
          className="px-12 py-4 bg-blue-600 text-white rounded-xl text-button hover:bg-blue-700 active:bg-blue-800"
        >
          자가진단 시작하기
        </button>
      </div>
    );
  }

  // 결과 화면
  if (result) {
    return (
      <div className="min-h-[calc(100vh-4rem)] p-6 bg-background">
        <h1 className="text-h1 mb-6">분석 결과</h1>

        {/* 심각도 */}
        <div
          className={`inline-block px-4 py-2 rounded-lg text-button mb-4 ${getSeverityColor(result.severity)}`}
        >
          {getSeverityText(result.severity)}
        </div>

        {/* 진단 */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <h2 className="text-h2 mb-3">진단</h2>
          <p className="text-body leading-relaxed">{result.diagnosis}</p>
        </div>

        {/* 권장사항 */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-4">
          <h3 className="text-h2 mb-3">권장사항</h3>
          <ul className="space-y-2">
            {result.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-body flex-1">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 관련 질병 */}
        <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
          <h3 className="text-h2 mb-3">관련 가능 질병</h3>
          <div className="space-y-3">
            {result.relatedDiseases.map((disease, i) => (
              <div key={i} className="border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-body font-semibold">{disease.name}</span>
                  <span className="text-caption text-blue-600">{disease.probability}%</span>
                </div>
                <p className="text-body-small text-foreground/60">{disease.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 다시 진단하기 버튼 */}
        <button
          onClick={handleRestart}
          className="w-full py-4 bg-blue-600 text-white rounded-xl text-button hover:bg-blue-700 active:bg-blue-800"
        >
          다시 진단하기
        </button>
      </div>
    );
  }

  // 질문 화면
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* 상단 헤더 */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          {currentQuestionIndex > 0 && (
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg active:bg-gray-200"
              aria-label="이전 질문"
            >
              <ChevronLeft size={24} className="text-foreground" />
            </button>
          )}
          <h1 className="text-h2 flex-1">증상 자가진단</h1>
        </div>

        {/* 진행 바 */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
          <span className="text-caption text-foreground/60 min-w-[60px] text-right">
            {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <p className="text-h1 text-center mb-12">{currentQuestion.text}</p>

          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(true)}
              disabled={isLoading}
              className="flex-1 py-6 bg-blue-600 text-white rounded-xl text-button hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              예
            </button>
            <button
              onClick={() => handleAnswer(false)}
              disabled={isLoading}
              className="flex-1 py-6 bg-gray-200 text-foreground rounded-xl text-button hover:bg-gray-300 active:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              아니오
            </button>
          </div>
        </div>
      </div>

      {/* 로딩 상태 */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-h2 mb-2">분석 중...</div>
            <div className="text-body text-foreground/60">잠시만 기다려주세요</div>
          </div>
        </div>
      )}
    </div>
  );
}
