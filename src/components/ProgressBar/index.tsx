interface ProgressBarProps {
  percent: number;
  color: string;
}

const ProgressBar = ({ percent, color }: ProgressBarProps) => {
  const dashArray = 2 * (80 + 40);
  const dashOffset = dashArray - (dashArray * percent) / 100;

  return (
    <div>
      <svg width="100%" height="100%">
        <rect
          x="10"
          y="10"
          width="80"
          height="40"
          rx="10"
          ry="10"
          className="fill-none"
          stroke="#98A2B3"
          strokeWidth="2"
        />

        <rect
          x="10"
          y="10"
          width="80"
          height="40"
          rx="10"
          ry="10"
          className="fill-none transition duration-500"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
    </div>
  );
};

export default ProgressBar;
