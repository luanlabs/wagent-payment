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
  const [progressBarColor, setProgressBarColor] = useState('#0bb869');

  const totalDuration = 15 * 60 * 1000;

  const calculateColor = (time: number): string => {
    const timeInSeconds = time / 1000;

    if (timeInSeconds > 8 * 60 + 30) {
      return '#0bb869';
    } else if (timeInSeconds > 8 * 60) {
      const ratio = (8 * 60 + 30 - timeInSeconds) / 30;
      return `rgb(${11 + Math.round(ratio * 244)}, ${184 - Math.round(ratio * 112)}, 105)`;
    } else if (timeInSeconds > 5 * 60 + 30) {
      return '#FFA500';
    } else if (timeInSeconds > 5 * 60) {
      const ratio = (5 * 60 + 30 - timeInSeconds) / 30;
      return `rgb(255, ${165 - Math.round(ratio * 165)}, 0)`;
    } else {
      return '#FF0000';
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const newPercentage = ((totalDuration - remainingTime) / totalDuration) * 100;
      setPercentage(newPercentage);

      setProgressBarColor(calculateColor(remainingTime));
    } else {
      setPercentage(100);
      setProgressBarColor('rgb(255, 0, 0)');
    }
  }, [remainingTime]);

  return (
    <div className="relative w-full">
      <h1
        className="absolute left-[13px] top-[15px] flex items-center justify-center"
        style={{ color: progressBarColor }}
      >
        <Clock fill={progressBarColor} />
        <p className="w-[40px] ml-1 mr-1">{formatTime(remainingTime)}</p>
        <span className="mb-[1px] text-[15px]">min</span>
      </h1>
      <ProgressBar percent={percentage} color={progressBarColor} />
    </div>
  );
};

export default CountdownTimer;
