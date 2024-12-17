interface ProgressBarProps {
  percent: number;
  color: string;
}

const ProgressBar = ({ percent, color }: ProgressBarProps) => {
  const width = 105;
  const height = 34;
  const dashArray = 2 * (width + height);
  const dashOffset = dashArray - (dashArray * percent) / 100;

  return (
    <div>
      <svg width={width + 10} height={height + 20} viewBox={`0 0 ${width + 10} ${height + 20}`}>
        <rect
          x="4"
          y="10"
          width={width}
          height={height}
          rx="9"
          ry="9"
          className="fill-none"
          stroke="#98A2B3"
          strokeWidth="1"
        />

        <rect
          x="4"
          y="10"
          width={width}
          height={height}
          rx="9"
          ry="9"
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
