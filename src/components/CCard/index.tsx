import clsx from 'clsx';

export type CCardType = 'simple' | 'detailed' | 'summary';

interface CCardProps {
  type: CCardType;
  title: string;
  subtitle?: string;
  image?: string;
  className?: string;
  onClick?: () => void;
}

const CCard = ({ type, title, subtitle, image, className, onClick }: CCardProps) => {
  return (
    <div
      className={clsx(
        'w-full bg-white cursor-default rounded-[10px] text-left border border-1 border-customGray ',
        className,
        { 'flex items-center p-1': type === 'detailed' },
        { 'px-4 py-6 border-none': type === 'simple' },
        { 'px-2 py-4': type === 'summary' },
      )}
      onClick={onClick}
    >
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
            'text-darkBlue text-base',
            { '!text-[24px] font-medium': type === 'simple' },
            { 'font-medium': type === 'summary' },
          )}
        >
          {title}
        </h3>

        {subtitle && <p className="text-mediumGray text-[14px] mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default CCard;
