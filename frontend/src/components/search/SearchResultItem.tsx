// src/components/search/SearchResultItem.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SearchResultItemProps {
  name: string;
  address: string;
  detailAddress?: string; // 상세 주소 (드롭다운에 표시)
  phone?: string; // 전화번호 (드롭다운에 표시)
  operatingHours?: string; // 운영시간 (드롭다운에 표시)
  onNavigate: () => void; // 길찾기 버튼 클릭 시
}

export function SearchResultItem({
  name,
  address,
  detailAddress,
  phone,
  operatingHours,
  onNavigate,
}: SearchResultItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-t border-b border-blue-200 overflow-hidden transition-all ease-in">
      {/* 메인 컨텐츠 */}
      <div className="flex items-center justify-between p-4">
        {/* 왼쪽: 쉼터 정보 */}
        <div className="flex-1 min-w-0 pr-3">
          <h3 className="text-body font-semibold text-foreground mb-1 truncate">
            {name}
          </h3>
          <button
            onClick={toggleExpand}
            className="flex items-center gap-1 text-caption text-foreground/60 hover:text-foreground/80 transition-colors"
          >
            <span className="truncate">{address}</span>
            {isExpanded ? (
              <ChevronUp size={16} className="flex-shrink-0" />
            ) : (
              <ChevronDown size={16} className="flex-shrink-0" />
            )}
          </button>
        </div>

        {/* 오른쪽: 길찾기 버튼 */}
        <button
          onClick={onNavigate}
          className="px-6 py-2 bg-blue-100 border-2 border-blue-300 hover:bg-blue-200 active:bg-blue-300 text-foreground rounded-full text-caption font-medium transition-colors flex-shrink-0"
        >
          길찾기
        </button>
      </div>

      {/* 드롭다운 상세 정보 */}
      <div
        className={`
          px-4 border-t border-blue-100 bg-blue-50/30
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-96 pb-4 pt-0 opacity-100' : 'max-h-0 pb-0 pt-0 opacity-0'}
        `}
      >
        <div className="space-y-2 mt-3">
          {detailAddress && (
            <div className="flex items-start gap-2">
              <span className="text-caption font-medium text-foreground/60 min-w-[60px]">
                상세주소
              </span>
              <span className="text-caption text-foreground">{detailAddress}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-start gap-2">
              <span className="text-caption font-medium text-foreground/60 min-w-[60px]">
                전화번호
              </span>
              <a
                href={`tel:${phone}`}
                className="text-caption text-blue-600 hover:underline"
              >
                {phone}
              </a>
            </div>
          )}
          {operatingHours && (
            <div className="flex items-start gap-2">
              <span className="text-caption font-medium text-foreground/60 min-w-[60px]">
                운영시간
              </span>
              <span className="text-caption text-foreground">{operatingHours}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
