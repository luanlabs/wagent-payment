import React, { useEffect, useState } from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trailColor?: string;
  duration?: number; // Animation duration in milliseconds
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 172,
  strokeWidth = 16,
  color = '#05DC91',
  trailColor = '#E2FFF5',
  duration = 1000, // Default duration: 1 second
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  // Animate percentage change
  useEffect(() => {
    const startTime = performance.now();
    const startPercentage = animatedPercentage;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1); // Ensure progress stays between 0 and 1
      const newPercentage = startPercentage + progress * (percentage - startPercentage);

      setAnimatedPercentage(newPercentage);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [percentage, duration]);

  const offset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="absolute transform rotate-[-90deg]" width={size} height={size}>
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
          style={{ transition: `stroke-dashoffset ${duration}ms ease` }}
        />
      </svg>

      <div className="text-center">
        <p
          className="text-xl font-bold text-gray-800"
          style={{
            transition: `all ${duration}ms ease`,
            transform: 'scale(1.1)',
          }}
        >
          {Math.round(animatedPercentage)}%
        </p>
      </div>
    </div>
  );
};

export default CircularProgress;
