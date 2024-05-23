interface CButtonProps {
  text: string;
  onClick?: () => void;
}

const CButton = ({ text, onClick }: CButtonProps) => {
  return (
    <button
      className="w-full font-medium px-2 py-2 text-black text-base text-center border border-1 border-[#D0D5DD] rounded-lg hover:bg-[#F9FAFB] transition active:shadow"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default CButton;
