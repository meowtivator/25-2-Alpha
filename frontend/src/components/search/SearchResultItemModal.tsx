// src/components/search/SearchResultItemModal.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SearchResultItemModalProps {
  name: string;
  address: string;
  detailAddress?: string;
  phone?: string;
  operatingHours?: string;
  onNavigate: () => void;
}

export function SearchResultItemModal({
  name,
  address,
  detailAddress,
  // phone,
  // operatingHours,
  onNavigate,
}: SearchResultItemModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="relative">
      {/* 메인 카드 */}
      <div className="border-t border-b border-blue-200">
        <div className="flex items-center justify-between p-4">
          {/* 왼쪽: 쉼터 정보 */}
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-body-small font-semibold text-foreground mb-1 truncate">
              {name}
            </h3>
            <button
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="flex items-center gap-1 text-caption text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              <span className="truncate">{address}</span>
              {isModalOpen ? (
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
      </div>

      {/* 드롭다운 (버튼 바로 아래) */}
      {isModalOpen && (
        <>
          {/* 투명 배경 (클릭하면 닫힘) */}
          <div
            className="fixed inset-0 z-30"
            onClick={closeModal}
          />

          {/* 드롭다운 컨텐츠 */}
          <div
            className="absolute top-3/4 left-0 right-13 z-40 mt-2"
            style={{ animation: 'slideDown 0.2s ease-out' }}
          >
            <div className="bg-blue-50 rounded-4xl shadow-2xl border-2 border-blue-300 overflow-hidden">
              {/* 상세 정보 */}
              <div className="px-4 py-3 space-y-2">
                {detailAddress && (
                  <div className="flex items-start gap-2">
                    <span className="text-body-small font-semibold text-foreground min-w-[50px]">
                      도로명
                    </span>
                    <span className="text-body-small text-foreground">
                      {detailAddress}
                    </span>
                  </div>
                )}
                {address && (
                  <div className="flex items-start gap-2">
                    <span className="text-body-small font-semibold text-foreground min-w-[50px]">
                      지번
                    </span>
                    <span className="text-body-small text-foreground">{address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
