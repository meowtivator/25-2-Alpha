// src/components/ui/Switch.tsx
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const toggle = () => {
    if (disabled) return;
    onChange(!checked);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative inline-flex h-8 w-14 items-center border rounded-full transition-colors
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${checked ? 'bg-blue-200' : 'bg-transparent'}
      `}
    >
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-blue-900 transition-transform shadow-sm
          ${checked ? 'translate-x-7' : 'translate-x-1'}
        `}
      />
    </div>
  );
}
