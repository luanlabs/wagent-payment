import { useEffect, useState } from 'react';

import wagentLogo from '../../../public/images/wagentLogo.svg';

interface LoadingProp {
  loadingTime?: number;
}

const Loading = ({ loadingTime }: LoadingProp) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(100);
  }, [loadingTime]);

  return (
    <div className="flex flex-col justify-center items-center bg-white h-dvh">
      <img src={wagentLogo} alt="wagent" />
      <h1 className="font-medium text-black text-[32px] mt-6">Please Wait</h1>

      <div className="space-y-4 text-center mt-[62px]">
        <div className="h-[6px] rounded-full bg-[#eee] overflow-hidden w- w-[366px]">
          <div
            className={`bg-[#008B5B] h-full rounded-full transition-all duration-${loadingTime} ease-linear`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-[14px] text-[#3D3D3D]">This may take a few seconds</p>
      </div>

      <div className="border border-1 border-[#FDB022] rounded-full bg-[#FFFAEB] px-4 py-2 w-auto mt-[62px]">
        <p className="text-[#B54708] text-base font-medium">
          Note: Do not refresh, close or click back button in this page. your data might loss.
        </p>
      </div>
    </div>
  );
};

export default Loading;
