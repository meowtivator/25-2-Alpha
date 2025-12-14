
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { SymptomQuestion } from '../types/symptom';
import { fetchSymptomQuestions } from '@/api/symptomApi';
import { useSettingsStore } from '@/stores/settingsStore';

export function useSymptomQuestions(){
  const [questions, setQuestions] = useState<SymptomQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { i18n } = useTranslation();
  const showColdShelters = useSettingsStore((state) => state.showColdShelters);

  // showColdShelters 값에 따라 seasonType 결정
  const seasonType = showColdShelters ? 'COLD' : 'HEAT';

  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async() => {
      try{
        setLoading(true);
        setError(null);

        const data = await fetchSymptomQuestions(seasonType);

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
  }, [i18n.language, seasonType]); // 언어와 계절 타입이 변경될 때마다 재실행

  const retry = async() => {
    setLoading(true);
    setError(null);
    try{
      const data = await fetchSymptomQuestions(seasonType);
      setQuestions(data);
    }catch(error){
      setError(error instanceof Error ? error : new Error('Unknown error'));
    }finally {
      setLoading(false);
    }
  };

  return {questions, loading, error, retry};
}