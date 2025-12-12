interface ToggleOption {
  value: string;
  label: string;
}

interface ToggleButtonsProps {
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ToggleButtons({
  options,
  value,
  onChange,
}: ToggleButtonsProps) {
  const handleClick = (optionValue: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(optionValue);
  };

  return (
    <div className="flex gap-3 pointer-events-auto">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={handleClick(option.value)}
          className={`
            flex-1 px-5 py-1.5 rounded-full border transition-all text-body bg-transparent border-blue-900
            ${
              value === option.value
                ? ' text-blue-900'
                : 'text-blue-200'
            }
            `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
