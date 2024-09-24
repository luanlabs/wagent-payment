import CModal from '../../Modal';

import Success from '../../../assets/Success';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal = ({ isOpen, onClose, title, message }: SuccessModalProps) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose} width="404px">
      <div className="flex justify-center items-center flex-col py-9 w-full">
        <div className="flex justify-center items-center h-16 w-16 rounded-full">
          <Success fill="#05DC91" />
        </div>

        <div className="font-medium text-2xl mb-3 mt-8 text-center w-11/12">{title}</div>

        {message && <div className="text-[18px] w-11/12 text-center">{message}</div>}
      </div>
    </CModal>
  );
};

export default SuccessModal;
