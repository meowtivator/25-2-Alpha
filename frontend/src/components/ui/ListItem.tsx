// src/components/ui/ListItem.tsx
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface ListItemProps {
  label: string;
  value?: string;
  onClick?: () => void;
  rightContent?: ReactNode;
  showArrow?: boolean;
}

export function ListItem({
  label,
  value,
  onClick,
  rightContent,
  showArrow = false
}: ListItemProps) {
  const isClickable = !!onClick;

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`
        w-full flex items-center justify-between px-5 py-4 bg-blue-50
        ${isClickable ? 'cursor-pointer active:opacity-70' : 'cursor-default'}
      `}
    >
      <span className="text-body text-foreground">{label}</span>

      <div className="flex items-center gap-2 pointer-events-none">
        {value && (
          <span className="text-body text-foreground/60">{value}</span>
        )}
        {rightContent}
        {showArrow && (
          <ChevronRight className="w-8 h-8 text-foreground/60" />
        )}
      </div>
    </button>
  );
}
