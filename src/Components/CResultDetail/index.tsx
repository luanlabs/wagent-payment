type CResultDetailProps = {
  label: string;
  value: string | React.ReactNode;
  valueColor?: string;
};

const CResultDetail = ({ label, value, valueColor }: CResultDetailProps) => {
  return (
    <div className="between desktop:h-[18%] h-10 text-base font-medium">
      <p className="select-none">{label}:</p>
      <p className={`text-cadetBlue ${valueColor}`}>{value}</p>
    </div>
  );
};

export default CResultDetail;
