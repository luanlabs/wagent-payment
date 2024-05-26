export type Variant = 'simple' | 'bordered';
interface CButtonProps {
  text?: string;
  onClick?: () => void;
  variant: Variant;
  className?: string;
  children?: React.ReactNode;
}

const CButton = ({ text, onClick, variant, className, children }: CButtonProps) => {
  const buttonStyle =
    variant === 'bordered'
      ? 'border border-1 border-[#D0D5DD] text-base font-medium hover:bg-[#F9FAFB] active:shadow'
      : className;

  return (
    <button
      className={`w-full px-2 py-2 text-black text-center cursor-pointer rounded-lg transition ${buttonStyle} ${className}`}
      onClick={onClick}
    >
      {text ? text : children}
    </button>
  );
};

export default CButton;
