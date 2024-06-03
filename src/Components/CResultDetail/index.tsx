type CResultDetailProps = {
  label: string;
  value: string | React.ReactNode;
};

const CResultDetail = ({ label, value }: CResultDetailProps) => {
  return (
    <div className="between desktop:h-[16%] h-10 text-base font-medium">
      <p className="select-none">{label}:</p>
      <p className="text-cadetBlue">{value}</p>
    </div>
  );
};

export default CResultDetail;
