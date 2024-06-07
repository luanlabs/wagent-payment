import clsx from 'clsx';
import ConfirmButton from './confirmButton';

export type VariantType = 'simple' | 'bordered' | 'confirm';
interface CButtonProps {
  text?: string;
  onClick?: () => void;
  variant: VariantType;
  className?: string;
  children?: React.ReactNode;
}

const CButton = ({ text, onClick, variant, className, children }: CButtonProps) => {
  if (variant === 'confirm') {
    return (
      <ConfirmButton text={text} children={children} className={className} onClick={onClick} />
    );
  }
  return (
    <button
      className={clsx(
        `w-full px-2 py-2 text-center cursor-pointer rounded-lg transition duration-300`,
        className,
        {
          'border border-1 text-darkBlue border-gray text-base font-medium hover:bg-lightestGray active:shadow':
            variant === 'bordered',
        },
        // {
        //   'bg-emeraldGreen text-white hover:bg-emeraldGreen/90 active:bg-emeraldGreen':
        //     variant === 'confirm',
        // },
      )}
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export default CButton;
