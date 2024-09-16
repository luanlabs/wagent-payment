import clsx from 'clsx';

export type CCardType = 'simple' | 'detailed' | 'summary';

interface CCardProps {
  type: CCardType;
  title: string;
  subtitle?: string;
  amount?: string;
  totalAmount?: string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

const CCard = ({
  type,
  title,
  subtitle,
  amount,
  totalAmount,
  image,
  className,
  onClick,
}: CCardProps) => {
  return (
    <div
      className={clsx(
        'w-full bg-white cursor-default rounded-[10px] text-left border border-1 border-customGray ',
        className,
        { 'flex items-center p-1 between': type === 'detailed' },
        { 'px-4 py-6 border-none': type === 'simple' },
        { 'px-2 py-4': type === 'summary' },
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        {type === 'detailed' && image && (
          <div className="h-[65px] w-[65px] rounded-[10px] border border-[#D0D5DD] p-1">
            <img
              src={image}
              alt={title}
              draggable={false}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        )}

        <div className="ml-3">
          <h3
            className={clsx(
              'text-darkBlue text-base ',
              { '!text-[24px] font-medium': type === 'simple' },
              { 'font-medium': type === 'summary' },
            )}
          >
            {title}
          </h3>

          <div className="flex space-x-1">
            {amount && <p className="text-mediumGray">{amount}</p>}
            {subtitle && <p className="text-mediumGray text-[14px]">{subtitle}</p>}
          </div>
        </div>
      </div>

      {totalAmount && <div className="mr-2 font-medium">{totalAmount}</div>}
    </div>
  );
};

export default CCard;
