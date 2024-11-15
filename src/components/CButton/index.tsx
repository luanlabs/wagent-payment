import clsx from 'clsx';

export type VariantType = 'simple' | 'bordered' | 'next' | 'green';
interface CButtonProps {
  text?: string;
  onClick?: () => void;
  variant: VariantType;
  className?: string;
  children?: React.ReactNode;
}

const CButton = ({ text, onClick, variant, className, children }: CButtonProps) => {
  return (
    <button
      className={clsx(
        `w-full px-2 py-2 text-center cursor-pointer rounded-[10px] transition duration-300`,
        className,
        {
          'font-[Aeonik-m] bg-white border-[1.4px] text-[#475467] border-[#F2F4F7] text-base font-medium hover:bg-lightestGray active:shadow':
            variant === 'bordered',
        },
        {
          'text-white bg-[#073834]': variant === 'next',
        },
        { 'text-[#475467] bg-transparent': variant === 'simple' },
        { 'bg-[#E2FFF5] text-[#008B5B] !h-[40px] hover:bg-[#E2FFF5]/60': variant === 'green' },
      )}
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export default CButton;
