interface ProgressBarProps {
  percent: number;
  color: string;
}

const ProgressBar = ({ percent, color }: ProgressBarProps) => {
  const dashArray = 2 * (94 + 40);
  const dashOffset = dashArray - (dashArray * percent) / 100;

  return (
    <div>
      <svg width="100%" height="100%">
        <rect
          x="4"
          y="10"
          width="94"
          height="40"
          rx="12"
          ry="12"
          className="fill-none"
          stroke="#98A2B3"
          strokeWidth="1"
        />

        <rect
          x="4"
          y="10"
          width="94"
          height="40"
          rx="12"
          ry="12"
          className="fill-none transition duration-500"
          stroke={color}
          strokeWidth="1"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
};

export default ProgressBar;
