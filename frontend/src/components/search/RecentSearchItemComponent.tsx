// src/components/search/RecentSearchItemComponent.tsx
import { MarkerIcon } from '@/assets/icons';
import { Search, X } from 'lucide-react';
import type { RecentSearchItem } from '@/stores/settingsStore';

interface RecentSearchItemComponentProps {
  item: RecentSearchItem;
  onSelect: () => void;
  onRemove: () => void;
}

export function RecentSearchItemComponent({
  item,
  onSelect,
  onRemove,
}: RecentSearchItemComponentProps) {
  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-blue-50 active:bg-blue-100 transition-colors">
      <button
        onClick={onSelect}
        className="flex items-center gap-3 flex-1 text-left"
      >
        {/* 아이콘 */}
        <div className="flex-shrink-0 mr-2 border rounded-full border-blue-300 w-10 h-10 flex items-center justify-center">
          {item.type === 'shelter' ? (
            <MarkerIcon className="text-blue-900" size={24} />
          ) : (
            <Search size={20} className="text-blue-900" />
          )}
        </div>

        {/* 정보 */}
        <div className="flex-1 min-w-0">
          <p className="text-body text-foreground font-medium truncate">
            {item.name}
          </p>
          {item.address && (
            <p className="text-caption text-foreground/60 truncate mt-0.5">
              {item.address}
            </p>
          )}
        </div>
      </button>

      {/* 삭제 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="flex-shrink-0 p-2 hover:bg-blue-100 active:bg-blue-200 rounded-full transition-colors"
        aria-label="삭제"
      >
        <X size={16} className="text-foreground/60" />
      </button>
    </div>
  );
}
