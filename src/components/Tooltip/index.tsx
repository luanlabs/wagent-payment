import React, { useState } from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 1500);
  };

  return (
    <div className="relative inline-block">
      <div onClick={showTooltip} className="cursor-pointer">
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded-md mt-2 whitespace-nowrap">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
