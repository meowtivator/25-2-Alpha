// src/pages/HelperPage.tsx
import { useState } from 'react';
import type { SymptomAnswer } from '@/types/symptom';
import { useSymptomQuestions } from '@/hooks/useSymptomQuestions';

export default function HelperPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [isSeleted, setIsSelected] = useState(false);
  const { questions, loading, error, retry} = useSymptomQuestions();
  const [answers, setAnswers] = useState<SymptomAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  const currentQuestion = questions[currentIndex];

  const handleAnswer = (questionCode: string, answer: boolean) => {
    setAnswers(prev => [
      ...prev.filter(a => a.questionCode !== questionCode),
      { questionCode, answer }
    ]);

    if(currentIndex < questions.length - 1){
      setCurrentIndex(prev => prev+1);
    }else{
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    console.log('제출:', answers);
    // TODO: API POST 통신 예정.
  }

  // 시작하기
  const handleStart = () => {
    setShowIntro(false);
  };

  const handleSelect = () => {
    setIsSelected(true);
  }
  
  if(loading){
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

  if (!isSeleted){
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
    )
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
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              예
            </button>
            <button
              onClick={() => handleAnswer(currentQuestion.questionCode, false)}
              className="w-20 h-20 bg-blue-100 text-[#191A1C] rounded-3xl text-button hover:bg-blue-200 active:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
