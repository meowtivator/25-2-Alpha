// src/components/ui/SearchBar.tsx
import type { ReactNode } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  onBack?: () => void;
  onClear?: () => void;
  onFocus?: () => void; // 추가: input이 포커스될 때 실행
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  placeholder?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean; // 추가: 읽기 전용 모드
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  onBack,
  onClear,
  onFocus,
  leftIcon,
  rightIcon,
  placeholder = '검색어를 입력하세요',
  autoFocus = false,
  disabled = false,
  readOnly = false,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-3 bg-transparent">
      <div
        className={`relative flex items-center rounded-xl border border-blue-200 bg-blue-50 backdrop-blur-md drop-shadow-lg`}
      >
        {/* Back */}
        {onBack ? (
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={onBack}
            className="p-2 pl-3 text-foreground/70 active:opacity-70"
          >
            {leftIcon}
          </button>
        ) : (
          <div className="p-2 pl-3 text-foreground/70">
            {leftIcon}
          </div>
        )}

        {/* Input */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
          readOnly={readOnly}
          className="flex-1 bg-transparent outline-none text-body text-foreground placeholder:text-foreground/50 px-3 py-3"
        />

        {/* Clear */}
        {value && (
          <button
            type="button"
            aria-label="입력 삭제"
            onClick={onClear ?? (() => onChange(''))}
            className="p-2 pr-3 text-foreground/60 active:opacity-70"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </form>
  );
}

