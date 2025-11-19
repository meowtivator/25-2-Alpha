// src/components/ui/Switch.tsx
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked, onChange, disabled = false }: SwitchProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
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
    </button>
  );
}
