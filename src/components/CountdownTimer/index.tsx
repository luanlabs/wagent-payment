import { useEffect, useState } from 'react';

import ProgressBar from '../ProgressBar';

import useCountdownTimer from '../../hooks/useCountdownTimer';
import formatTime from '../../utils/formatTime';
import Clock from '../../assets/Clock';

interface CountdownTimerProps {
  expiredTimeStamp: number;
}

const CountdownTimer = ({ expiredTimeStamp }: CountdownTimerProps) => {
  const remainingTime = useCountdownTimer(expiredTimeStamp);
  const [percentage, setPercentage] = useState(0);
  const totalDuration = 15 * 60 * 1000;

  useEffect(() => {
    if (remainingTime > 0) {
      const newPercentage = ((totalDuration - remainingTime) / totalDuration) * 100;
      setPercentage(newPercentage);
    } else {
      setPercentage(100);
    }
  }, [remainingTime]);

  return (
    <div className="relative w-auto">
      <h1 className="absolute font-[Aeonik-m] left-[19px] top-[17.5px] !text-[#0bb869] flex items-center space-x-2">
        <Clock />
        <p>{formatTime(remainingTime)}</p>
      </h1>
      <ProgressBar percent={percentage} color="#0bb869" />
    </div>
  );
};

export default CountdownTimer;
