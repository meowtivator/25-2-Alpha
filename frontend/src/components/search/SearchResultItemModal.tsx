// src/components/search/SearchResultItemModal.tsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';

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
  phone,
  operatingHours,
  onNavigate,
}: SearchResultItemModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* 메인 카드 */}
      <div className="border-t border-b border-blue-200 overflow-hidden">
        <div className="flex items-center justify-between p-4">
          {/* 왼쪽: 쉼터 정보 */}
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-body font-semibold text-foreground mb-1 truncate">
              {name}
            </h3>
            <button
              onClick={openModal}
              className="flex items-center gap-1 text-caption text-foreground/60 hover:text-foreground/80 transition-colors"
            >
              <span className="truncate">{address}</span>
              <ChevronDown size={16} className="flex-shrink-0" />
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

      {/* 모달 오버레이 & 컨텐츠 */}
      {isModalOpen && (
        <>
          {/* 반투명 배경 (클릭하면 닫힘) */}
          <div
            className="fixed inset-0 bg-black/30 z-40 transition-opacity duration-200"
            style={{ animation: 'fadeIn 0.2s ease-out' }}
            onClick={closeModal}
          />

          {/* 모달 컨텐츠 */}
          <div
            className="fixed inset-x-0 bottom-0 z-50"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto">
              {/* 헤더 */}
              <div className="flex items-start justify-between p-6 border-b border-gray-200">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg font-bold text-foreground mb-2">
                    {name}
                  </h2>
                  <div className="flex items-center gap-1 text-body text-foreground/60">
                    <span>{address}</span>
                    <ChevronUp size={16} />
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="닫기"
                >
                  <X size={24} className="text-foreground/60" />
                </button>
              </div>

              {/* 상세 정보 */}
              <div className="p-6 space-y-4">
                {detailAddress && (
                  <div className="flex items-start gap-3">
                    <span className="text-body font-semibold text-foreground min-w-[80px]">
                      도로명
                    </span>
                    <span className="text-body text-foreground">
                      {detailAddress}
                    </span>
                  </div>
                )}
                {address && (
                  <div className="flex items-start gap-3">
                    <span className="text-body font-semibold text-foreground min-w-[80px]">
                      지번
                    </span>
                    <span className="text-body text-foreground">{address}</span>
                  </div>
                )}
                {phone && (
                  <div className="flex items-start gap-3">
                    <span className="text-body font-semibold text-foreground min-w-[80px]">
                      전화번호
                    </span>
                    <a
                      href={`tel:${phone}`}
                      className="text-body text-blue-600 hover:underline"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {operatingHours && (
                  <div className="flex items-start gap-3">
                    <span className="text-body font-semibold text-foreground min-w-[80px]">
                      운영시간
                    </span>
                    <span className="text-body text-foreground">
                      {operatingHours}
                    </span>
                  </div>
                )}
              </div>

              {/* 하단 버튼 */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    closeModal();
                    onNavigate();
                  }}
                  className="w-full py-4 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-2xl text-body font-semibold transition-colors"
                >
                  길찾기
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
