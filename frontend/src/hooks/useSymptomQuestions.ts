
import { useEffect, useState } from 'react';
import type { SymptomQuestion } from '../types/symptom';
import { fetchSymptomQuestions } from '@/api/symptomApi';
export function useSymptomQuestions(){
  const [questions, setQuestions] = useState<SymptomQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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
  }, []);

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