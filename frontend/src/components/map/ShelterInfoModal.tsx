// src/components/map/ShelterInfoModal.tsx
import { useState, useRef, useEffect } from 'react';
import type { ShelterResult } from '@/types/shelter';

interface ShelterInfoModalProps {
  shelter: ShelterResult;
  onClose: () => void;
}

export function ShelterInfoModal({ shelter, onClose }: ShelterInfoModalProps) {
  // 스냅 단계 상태
  const [isExpanded, setIsExpanded] = useState(false);
  // 드래그 진행 중 오프셋(px). 0은 스냅 포인트.
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // 최신 값을 안정적으로 참조하기 위한 refs (클로저 정합성 보장)
  const isExpandedRef = useRef(isExpanded);
  const currentYRef = useRef(currentY);
  const dragStartYRef = useRef(0);

  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  useEffect(() => {
    currentYRef.current = currentY;
  }, [currentY]);

  // 드래그 시작
  const handleDragStart = (clientY: number) => {
    setIsDragging(true);
    dragStartYRef.current = clientY;
    setCurrentY(0);
  };

  // 드래그 중 내부 로직 (document 리스너에서 호출)
  const handleDragMoveInternal = (clientY: number) => {
    const deltaY = clientY - dragStartYRef.current;

    // 위로 드래그: 음수 값 (최대 -240px로 제한)
    // 아래로 드래그: 양수 값 (최대 240px)
    const clamped = Math.max(-240, Math.min(240, deltaY));
    setCurrentY(clamped);
  };

  // 드래그 종료 내부 로직 (document 리스너에서 호출)
  const handleDragEndInternal = () => {
    const y = currentYRef.current;
    const expanded = isExpandedRef.current;

    // 1단계(축소)에서 위로 드래그 → 2단계(확장)
    if (!expanded && y < -80) {
      setIsExpanded(true);
    }
    // 2단계(확장)에서 아래로 드래그 → 1단계(축소)
    else if (expanded && y > 80) {
      setIsExpanded(false);
    }
    // 1단계에서 아래로 많이 드래그 → 닫기
    else if (!expanded && y > 150) {
      onClose();
    }

    setIsDragging(false);
    setCurrentY(0); // 스냅 포인트 복귀
  };

  // 핸들 영역 포인터 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientY);
  };

  // 문서 레벨 리스너: 최신 ref 값을 사용하여 정합성 보장
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleDragMoveInternal(e.clientY);
    };
    const onMouseUp = () => {
      handleDragEndInternal();
    };
    const onTouchMove = (e: TouchEvent) => {
      // 스크롤 방지 (모달 드래그 우선)
      if (e.cancelable) e.preventDefault();
      const touch = e.touches[0];
      if (touch) handleDragMoveInternal(touch.clientY);
    };
    const onTouchEnd = () => {
      handleDragEndInternal();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove as any);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);

  // 모달 높이 계산
  const getModalHeight = () => {
    if (isExpanded) {
      return 'calc(100vh - 80px)'; // 2단계: 거의 전체 화면
    }
    return '240px'; // 1단계: 제목 + 주소 2줄 + 버튼만 보임
  };

  // transform 계산
  const getTransform = () => {
    if (isDragging) return `translateY(${currentY}px)`;
    return 'translateY(0)';
  };

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
        style={{
          opacity: isDragging && currentY > 0 ? 1 - currentY / 240 : 1,
          transition: isDragging ? 'none' : 'opacity 0.25s ease',
        }}
      />

      {/* 모달 */}
      <div
        ref={modalRef}
        className="fixed left-0 right-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl transition-all overflow-hidden"
        style={{
          height: getModalHeight(),
          transform: getTransform(),
          transition: isDragging ? 'none' : 'transform 0.25s ease, height 0.25s ease',
          willChange: 'transform, height',
          userSelect: isDragging ? 'none' : 'auto',
        }}
      >
        {/* 드래그 핸들 */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* 모달 내용 - 전체 내용이 항상 렌더링되어 있음 */}
        <div className="px-6 pb-6 h-[calc(100%-32px)]">
          {/* 쉼터 이름 */}
          <h2 className="text-h3 font-bold text-foreground mb-4">
            {shelter.name}
          </h2>

          {/* 버튼 그룹 */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 py-3 bg-blue-100 text-blue-900 rounded-full text-body-small font-semibold border-2 border-blue-300 hover:bg-blue-200 active:bg-blue-300 transition-colors">
              출발
            </button>
            <button className="flex-1 py-3 bg-blue-100 text-blue-900 rounded-full text-body-small font-semibold border-2 border-blue-300 hover:bg-blue-200 active:bg-blue-300 transition-colors">
              도착
            </button>
          </div>

          {/* 정보 섹션 */}
          <div className="space-y-4">
            {/* 도로명 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                도로명
              </span>
              <span className="text-body text-foreground">
                {shelter.detailAddress || '-'}
              </span>
            </div>

            {/* 지번 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                지번
              </span>
              <span className="text-body text-foreground">
                {shelter.address || '-'}
              </span>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-200 my-4" />

            {/* 분류 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                분류
              </span>
              <span className="text-body text-foreground">누구나 이용 가능</span>
            </div>

            {/* 운영시간 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                운영시간
              </span>
              <span className="text-body text-foreground">
                {shelter.operatingHours || '-'}
              </span>
            </div>

            {/* 시설 면적 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                시설 면적
              </span>
              <span className="text-body text-foreground">-</span>
            </div>

            {/* 이용 가능 인원 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                이용 가능 인원
              </span>
              <span className="text-body text-foreground">-</span>
            </div>

            {/* 선풍기 보유 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                선풍기 보유
              </span>
              <span className="text-body text-foreground">-</span>
            </div>

            {/* 에어컨 보유 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                에어컨 보유
              </span>
              <span className="text-body text-foreground">-</span>
            </div>

            {/* 전화번호 - 항상 표시 */}
            <div className="flex items-start gap-3">
              <span className="text-body font-semibold text-foreground min-w-[80px]">
                전화번호
              </span>
              <span className="text-body text-foreground">
                {shelter.phone || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
