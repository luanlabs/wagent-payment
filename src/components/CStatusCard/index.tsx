import { StatusType } from '../../models';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

type CStatusCardProps = {
  status: StatusType;
};

const getStatusStyle = (status: StatusType) => {
  if (status === 'success') {
    return 'text-success border-lightGreen bg-lightestGreen';
  } else {
    return 'text-error border-lightRed bg-lightestRed';
  }
};

const CStatusCard = ({ status }: CStatusCardProps) => {
  return (
    <div
      className={`${getStatusStyle(
        status,
      )} flex justify-center items-center w-[113px] h-7 border rounded-[50px]`}
    >
      {capitalizeFirstLetter(status)}
    </div>
  );
};

export default CStatusCard;
