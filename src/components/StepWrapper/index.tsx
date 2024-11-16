import React from 'react';
import clsx from 'clsx';

import CButton from '../CButton';
import CountdownTimer from '../CountdownTimer';

interface StepWrapperProps {
  children: React.ReactNode;
  title: string;
  nextStep?: () => void;
  prevStep?: () => void;
  showNext?: boolean;
  showPrev?: boolean;
  disable?: boolean;
}

const StepWrapper = ({
  children,
  title,
  nextStep,
  prevStep,
  showNext = true,
  showPrev = true,
  disable = false,
}: StepWrapperProps) => {
  return (
    <div className="p-6 flex flex-col justify-between bg-white rounded-[12px] w-full h-full mobile:h-dvh  mobile:!pb-10 mobile:p-3">
      <div>
        <div className="flex justify-between relative">
          <h2 className="text-[22px] mobile:text-[18px] font-[Aeonik-m] mb-4">{title}</h2>
          <div className="h-[60px] w-[100px] absolute right-0 -top-3">
            <CountdownTimer expiredTimeStamp={1000} />
          </div>
        </div>

        <div>{children}</div>
      </div>

      <div
        className={clsx(
          'w-full flex items-center justify-end mt-4',
          'mobile:fixed mobile:bottom-0 mobile:left-0 mobile:bg-white mobile:p-4 mobile:!w-full mobile:shadow-md z-30',
          {
            '!justify-start': !showNext && showPrev,
          },
        )}
      >
        {showPrev && prevStep && (
          <CButton variant="simple" text="< Back" className="!w-[40%]" onClick={prevStep} />
        )}
        {showNext && nextStep && (
          <CButton
            variant="next"
            text="Next >"
            className={`!w-[60%] ${disable && 'bg-[#E4E7EC] text-[#667085] pointer-events-none'}`}
            onClick={nextStep}
          />
        )}
      </div>
    </div>
  );
};

export default StepWrapper;
