
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SymptomQuestion } from '../types/symptom';
import { fetchSymptomQuestions } from '@/api/symptomApi';

export function useSymptomQuestions(){
  const [questions, setQuestions] = useState<SymptomQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async() => {
      try{
        setLoading(true);
        setError(null);

        const data = await fetchSymptomQuestions();

        if(isMounted){
          setQuestions(data);
        }
      }catch(error){
        if (isMounted){
          setError(error instanceof Error ? error : new Error('Unknown error'));
        }
      }finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return ()=>{
      isMounted = false;
    };
  }, [i18n.language]); // 언어가 변경될 때마다 재실행

  const retry = async() => {
    setLoading(true);
    setError(null);
    try{
      const data = await fetchSymptomQuestions();
      setQuestions(data);
    }catch(error){
      setError(error instanceof Error ? error : new Error('Unknown error'));   
    }finally {
      setLoading(false);
    }
  };

  return {questions, loading, error, retry};
}