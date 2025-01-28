import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  duration: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  duration,
  size = 180,
  strokeWidth = 15,
  color = '#05DC91',
  trailColor = '#E2FFF5',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      setCurrentPercentage(progress * percentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => setCurrentPercentage(0);
  }, [percentage, duration]);

  const offset = circumference - (currentPercentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="absolute transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={trailColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center">
        <div className="text-xl font-bold text-gray-800">{Math.round(currentPercentage)}%</div>
      </div>
    </div>
  );
};

export default CircularProgress;
