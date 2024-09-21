import { useEffect, useState } from 'react';

import ProgressBar from '../ProgressBar';

import useCountdownTimer from '../../hooks/useCountdownTimer';
import formatTime from '../../utils/formatTime';

interface CountdownTimerProps {
  expiredTimestamp: number;
}

const CountdownTimer = ({ expiredTimestamp }: CountdownTimerProps) => {
  const remainingTime = useCountdownTimer(expiredTimestamp);
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
      <h1 className="absolute left-[30px] top-[17.5px] !text-lightGrayishBlue">
        {formatTime(remainingTime)}
      </h1>

      <ProgressBar percent={percentage} color="#15eca6" />
    </div>
  );
};

export default CountdownTimer;
