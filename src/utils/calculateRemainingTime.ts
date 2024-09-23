const calculateRemainingTime = (expiredTimeStamp: number) => {
  const remainingTime = expiredTimeStamp - Date.now();
  return remainingTime > 0 ? remainingTime : 0;
};

export default calculateRemainingTime;
