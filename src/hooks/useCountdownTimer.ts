import { useState, useEffect } from 'react';
import calculateRemainingTime from '../utils/calculateRemainingTime';

const useCountdownTimer = (expiredTimestamp: number) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    calculateRemainingTime(expiredTimestamp),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(expiredTimestamp));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiredTimestamp]);

  return remainingTime;
};

export default useCountdownTimer;
