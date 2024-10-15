import CButton from '../../CButton';
import CModal from '../../Modal';

import Success from '../../../assets/Success';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  onClick: () => void;
}

const ApproveModal = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  onClick,
}: ApproveModalProps) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose} width="396px">
      <div className="flex justify-center items-center flex-col pt-9 pb-3 w-full">
        <div className="flex justify-center items-center h-12 w-12 rounded-full">
          <Success fill="#05DC91" />
        </div>

        <div className="font-medium text-2xl mb-3 mt-8 text-center w-11/12 text-[#073834]">
          {title}
        </div>

        {message && <div className="text-[18px] w-11/12 text-center text-[#073834]">{message}</div>}
        <div className="w-full mt-7">
          <CButton variant="confirm" text={buttonText} onClick={onClick} className="h-[48px]" />
        </div>
      </div>
    </CModal>
  );
};

export default ApproveModal;
