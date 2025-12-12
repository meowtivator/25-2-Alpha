// src/pages/HelperPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SymptomAnswer } from '@/types/symptom';
import { useSymptomQuestions } from '@/hooks/useSymptomQuestions';
import { useTTS } from '@/hooks/useTTS';
import { submitDiagnosis } from '@/api/symptomApi';
import { ROUTES } from '@/lib/constants/routes';
import { useTranslation } from 'react-i18next';

export default function HelperPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isSeleted, setIsSelected] = useState(false);
  const [useTTSMode, setUseTTSMode] = useState(false); // TTS 모드 여부
  const { questions, loading, error, retry } = useSymptomQuestions();
  const [answers, setAnswers] = useState<SymptomAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, i18n } = useTranslation();

  // i18n 언어에 따라 TTS 언어 매핑
  const getTTSLanguage = (lang: string) => {
    const langMap: Record<string, string> = {
      'ko': 'ko-KR',
      'en': 'en-US',
      'ja': 'ja-JP',
      'vi': 'vi-VN',
      'zh': 'zh-CN',
    };
    return langMap[lang] || 'ko-KR';
  };

  // TTS 훅 초기화
  const { speak, stop } = useTTS({
    lang: getTTSLanguage(i18n.language),
    rate: 0.9, // 약간 느리게 (더 명확하게)
    pitch: 1.0,
    volume: 1.0,
  });

  const currentQuestion = questions[currentIndex];

  // TTS 모드일 때 질문 자동 읽기
  useEffect(() => {
    if (useTTSMode && currentQuestion && isSeleted && !isSubmitting) {
      // 이전 음성 중지
      stop();
      // 새 질문 읽기 (번역된 텍스트 사용)
      speak(t(currentQuestion.questionCode));
    }
  }, [currentQuestion, useTTSMode, isSeleted, isSubmitting, speak, stop, t]);

  // 컴포넌트 언마운트 시 음성 중지
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleAnswer = (questionCode: string, answer: boolean) => {
    // TTS 모드일 때 음성 중지
    if (useTTSMode) {
      stop();
    }
    setAnswers((prev) => [
      ...prev.filter((a) => a.questionCode !== questionCode),
      { questionCode, answer },
    ]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleSubmit(questionCode, answer);
    }
  };

  const handleSubmit = async (
    lastQuestionCode: string,
    lastAnswer: boolean
  ) => {
    setIsSubmitting(true);

    try {
      // 마지막 답변 포함하여 전체 답변 배열 생성
      const finalAnswers = [
        ...answers.filter((a) => a.questionCode !== lastQuestionCode),
        { questionCode: lastQuestionCode, answer: lastAnswer },
      ];

      // 백엔드 API 형식에 맞게 변환: { answers, language }
      const diagnosisRequest = {
        answers: finalAnswers.map((ans) => {
          const question = questions.find((q) => q.questionCode === ans.questionCode);
          return {
            id: question!.id,
            answer: ans.answer ? 'yes' : 'no',
          };
        }),
        language: i18n.language,
      };

      console.log('진단 요청:', diagnosisRequest);

      // API 호출
      const result = await submitDiagnosis(diagnosisRequest);
      console.log('진단 결과:', result);

      // 결과 페이지로 이동
      navigate(ROUTES.DIAGNOSIS_RESULT, {
        state: { diagnosisResult: result },
      });
    } catch (error) {
      console.error('진단 제출 실패:', error);
      alert(t('diagnosisSubmitFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // 시작하기
  const handleStart = () => {
    setShowIntro(false);
  };

  const handleSelectWithTTS = () => {
    setIsSelected(true);
    setUseTTSMode(true); // TTS 모드 활성화
  };

  const handleSelectWithoutTTS = () => {
    setIsSelected(true);
    setUseTTSMode(false); // TTS 모드 비활성화
  };


  if (loading) {
    return(
      <div className="flex items-center justify-center h-screen">
        <p className="text-body text-foreground">{t('loadingQuestions')}</p>
      </div>
    );
  }

  if(error){
    return(
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-body text-red-600">
          {t('loadingFailed')}
        </p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-100 text-[#191A1C] rounded-lg"
        >
          {t('retry')}
        </button>
      </div>
    );
  }

  // 인트로 화면
  if (showIntro) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem-env(safe-area-inset-bottom))] p-6 bg-background">
        <h1 className="text-h1 mb-4 text-center">{t('seasonalIllnessChecker')}</h1>
        <p className="text-body text-foreground/60 text-center mb-8 whitespace-pre-line">
          {t('seasonalIntroDescription')}
        </p>
        <button
          onClick={handleStart}
          className="w-64 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 flex items-center justify-center"
        >
          <span className="text-center px-4 leading-tight">{t('startSymptomCheck')}</span>
        </button>
      </div>
    );
  }

  if (!isSeleted) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem-env(safe-area-inset-bottom))] p-6 bg-background">
        <button
          onClick={handleSelectWithTTS}
          className="mb-10 w-72 h-24 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 flex items-center justify-center"
        >
          <span className="whitespace-pre-line text-center px-4 leading-tight">{t('voiceGuidanceCheck')}</span>
        </button>
        <button
          onClick={handleSelectWithoutTTS}
          className="w-72 h-24 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 flex items-center justify-center"
        >
          <span className="whitespace-pre-line text-center px-4 leading-tight">{t('questionnaireCheck')}</span>
        </button>
      </div>
    );
  }
  
  // 질문 화면
  return (
    <div className="flex flex-col h-[calc(100vh-4rem-env(safe-area-inset-bottom))] bg-background">
      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <p className="text-h1 text-center mb-12 text-blue-900">{t(currentQuestion.questionCode)}</p>

          <div className="flex gap-12 justify-center items-center">
            <button
              onClick={() => handleAnswer(currentQuestion.questionCode, true)}
              disabled={isSubmitting}
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('yes')}
            </button>
            <button
              onClick={() => handleAnswer(currentQuestion.questionCode, false)}
              disabled={isSubmitting}
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('no')}
            </button>
          </div>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-h2 mb-2">{t('analyzing')}</div>
            <div className="text-body text-foreground/60">{t('pleaseWait')}</div>
          </div>
        </div>
      )}
    </div>
  );
}
