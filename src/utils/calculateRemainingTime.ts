const calculateRemainingTime = (expiredTimestamp: number) => {
  const remainingTime = expiredTimestamp - Date.now();
  return remainingTime > 0 ? remainingTime : 0;
};

export default calculateRemainingTime;
