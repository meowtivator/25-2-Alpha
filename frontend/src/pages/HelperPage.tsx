// src/pages/HelperPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { SymptomAnswer } from '@/types/symptom';
import { useSymptomQuestions } from '@/hooks/useSymptomQuestions';
import { submitDiagnosis } from '@/api/symptomApi';
import { ROUTES } from '@/lib/constants/routes';

export default function HelperPage() {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);
  const [isSeleted, setIsSelected] = useState(false);
  const { questions, loading, error, retry } = useSymptomQuestions();
  const [answers, setAnswers] = useState<SymptomAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (questionCode: string, answer: boolean) => {
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

      // 백엔드 API 형식에 맞게 변환: { id, answer: 'yes' | 'no' }
      const diagnosisRequest = {
        answers: finalAnswers.map((ans) => {
          const question = questions.find((q) => q.questionCode === ans.questionCode);
          return {
            id: question!.id,
            answer: ans.answer ? ('yes' as const) : ('no' as const),
          };
        }),
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
      alert('진단 제출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 시작하기
  const handleStart = () => {
    setShowIntro(false);
  };

  const handleSelect = () => {
    setIsSelected(true);
  };


  if (loading) {
    return(
      <div className="flex items-center justify-center h-screen">
        <p className="text-body text-foreground">질문을 불러오는 중...</p>
      </div>
    );
  }

  if(error){
    return(
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-body text-red-600">
          질문을 불러오는데 실패했습니다.
        </p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-100 text-[#191A1C] rounded-lg"
        >
          다시 시도
        </button>
      </div>
    );
  }

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
          className="px-10 py-8 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300"
        >
          자가진단 시작하기
        </button>
      </div>
    );
  }

  if (!isSeleted) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-6 bg-background">
        <button
          onClick={handleSelect}
          className="mb-10 px-14 py-5 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300"
        >
          음성 안내와
          <br />
          자가진단 하기
        </button>
        <button
          onClick={handleSelect}
          className="px-14 py-5 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300"
        >
          문진표를 보고
          <br />
          자가진단 하기
        </button>
      </div>
    );
  }
  
  // 질문 화면
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <p className="text-h1 text-center mb-12 text-blue-900">{currentQuestion.questionText}</p>

          <div className="flex gap-12 justify-center items-center">
            <button
              onClick={() => handleAnswer(currentQuestion.questionCode, true)}
              disabled={isSubmitting}
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              예
            </button>
            <button
              onClick={() => handleAnswer(currentQuestion.questionCode, false)}
              disabled={isSubmitting}
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              아니오
            </button>
          </div>
        </div>
      </div>

      {/* 로딩 오버레이 */}
      {isSubmitting && (
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
