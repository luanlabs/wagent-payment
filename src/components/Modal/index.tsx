import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';

interface ModalProps {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
  children: React.ReactNode;
}

const CModal = ({ isOpen, onClose = () => {}, children, className }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

  useOutsideClickHandler(isOpen, onClose, modalRef);

  useEffect(() => {
    if (backdropRef.current) {
      backdropRef.current.style.opacity = isOpen ? '1' : '0';
      backdropRef.current.style.pointerEvents = isOpen ? 'auto' : 'none';
    }
  }, [isOpen]);

  return (
    <div
      ref={backdropRef}
      className={`fixed -inset-2 !z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isOpen ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={modalRef}
        className={clsx(
          className,
          `fixed transform transition-all duration-500 ease-in-out  ${
            isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[9999] rounded-[20px] shadow-2xl bg-white h-auto`,
        )}
      >
        <div className="flex flex-col w-full h-full px-6 py-4 gap-4 !z-[9999]">{children}</div>
      </div>
    </div>
  );
};
export default CModal;
