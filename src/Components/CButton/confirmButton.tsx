import React, { useRef } from 'react';

interface CButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const ConfirmButton = ({ text, onClick, className, children }: CButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (button) {
      const { x, y } = button.getBoundingClientRect();
      button.style.setProperty('--x', `${e.clientX - x}`);
      button.style.setProperty('--y', `${e.clientY - y}`);
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={`${className} relative w-full rounded-[10px] bg-emeraldGreen text-white cursor-pointer overflow-hidden !font-medium
      after:content-[''] after:absolute after:w-[300px] after:h-[300px] after:rounded-full after:bg-gradientGlow
      after:top-[calc(var(--y,0)*1px-150px)] after:left-[calc(var(--x,0)*1px-150px)]
      after:transition-opacity after:duration-300 after:opacity-0 hover:after:opacity-50`}
    >
      <span className="relative z-10"> {text ? text : children}</span>
    </button>
  );
};

export default ConfirmButton;
