import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

import useOutsideClickHandler from '../../hooks/useOutsideClickHandler';

export type CModalProps = {
  width?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string | React.ReactNode | React.JSX.Element;
};

const CModal = ({ title, children, isOpen, width, onClose, className }: CModalProps) => {
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
      className={`fixed -inset-2 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${
        isOpen ? 'bg-opacity-30' : 'bg-opacity-0 pointer-events-none'
      }`}
    >
      <div
        ref={modalRef}
        className={clsx(
          className,
          `fixed ${
            !width && 'w-[482px] mobile:w-[calc(100%-32px)]'
          } transform transition-all duration-500 ease-in-out ${
            isOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          } top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !z-[9999] rounded-[20px] shadow-2xl bg-white h-auto`,
        )}
        style={{ width: `${width}` }}
      >
        <div className="flex flex-col w-full h-full px-6 py-4 gap-4">
          {title && (
            <header className="flex justify-between items-center text-2xl font-medium select-none">
              <p>{title}</p>\{' '}
            </header>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CModal;
