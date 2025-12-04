// src/hooks/useTTS.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface UseTTSOptions {
  lang?: string; // 언어 코드 (예: 'ko-KR', 'en-US', 'ja-JP', 'vi-VN', 'zh-CN')
  rate?: number; // 속도 (0.1 ~ 10, 기본값: 1)
  pitch?: number; // 음높이 (0 ~ 2, 기본값: 1)
  volume?: number; // 볼륨 (0 ~ 1, 기본값: 1)
}

interface UseTTSReturn {
  speak: (text: string) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
}

/**
 * Web Speech API를 사용한 TTS(Text-to-Speech) 커스텀 훅
 *
 * @example
 * ```tsx
 * const { speak, stop, isSpeaking } = useTTS({ lang: 'ko-KR', rate: 1.0 });
 *
 * // 음성 재생
 * speak('안녕하세요');
 *
 * // 음성 중지
 * stop();
 * ```
 */
export function useTTS(options: UseTTSOptions = {}): UseTTSReturn {
  const {
    lang = 'ko-KR',
    rate = 1.0,
    pitch = 1.0,
    volume = 1.0,
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Web Speech API 지원 여부 확인
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
  }, []);

  // 음성 재생
  const speak = useCallback((text: string) => {
    if (!isSupported) {
      console.warn('TTS is not supported in this browser');
      return;
    }

    // 이전 음성이 재생 중이면 중지
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('TTS error:', event);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, lang, rate, pitch, volume]);

  // 음성 중지
  const stop = useCallback(() => {
    if (isSupported && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, [isSupported]);

  // 음성 일시정지
  const pause = useCallback(() => {
    if (isSupported && window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isPaused]);

  // 음성 재개
  const resume = useCallback(() => {
    if (isSupported && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isSupported]);

  // 컴포넌트 언마운트 시 음성 중지
  useEffect(() => {
    return () => {
      if (isSupported && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    isSupported,
  };
}
