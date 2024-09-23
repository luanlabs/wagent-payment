import { useState, useEffect } from 'react';

import calculateRemainingTime from '../utils/calculateRemainingTime';

const useCountdownTimer = (expiredTimeStamp: number) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    calculateRemainingTime(expiredTimeStamp),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(expiredTimeStamp));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiredTimeStamp]);

  return remainingTime;
};

export default useCountdownTimer;
