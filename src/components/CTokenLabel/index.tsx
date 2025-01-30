import clsx from 'clsx';

import tokensStyles from './tokenStyles';

export interface CTokenLabelProps {
  symbol: string;
  className?: string;
  imgSrc: string;
}

const CTokenLabel = ({ symbol, imgSrc, className }: CTokenLabelProps) => {
  const style = tokensStyles[symbol.toLowerCase() as keyof typeof tokensStyles];

  return (
    <div
      className={clsx(
        'flex items-center justify-between rounded-full h-[28px] pl-2 pr-3 w-auto mobile:space-x-1 space-x-1',
        className,
      )}
      style={{
        backgroundColor: style.bgColor,
        border: `2px solid ${style.borderColor}`,
        color: style.textColor,
      }}
      key={symbol}
    >
      <div className="flex items-center justify-between">
        <img src={imgSrc} alt={symbol} style={{ width: '18px', height: '18px' }} />
        <span className="ml-2 font-medium text-base">{symbol.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default CTokenLabel;
