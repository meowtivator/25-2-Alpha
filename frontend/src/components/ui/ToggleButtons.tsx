interface ToggleOption{
  value: string;
  label: string;
}

interface ToggleButtonsProps{
  options: ToggleOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ToggleButtons({ options, value, onChange} : ToggleButtonsProps) {
  const handleClick = (optionValue: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(optionValue);
  };

  return (
    <div className="flex gap-3 pointer-events-auto">
      {options.map((option) => (
        <button
          key = {option.value}
          onClick={handleClick(option.value)}
          className={`
            flex-1 px-5 py-2 rounded-full border-2 transition-all text-body
            ${value === option.value
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-background border-foreground/20 text-foreground hover:border-foreground/30'
            }
            `}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}