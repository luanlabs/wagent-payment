import CModal from '../../Modal';

import Loading from '../../../assets/Loading';

interface ProcessModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const ProcessModal = ({ isOpen, onClose, title, message }: ProcessModal) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-center items-center flex-col py-9 w-full">
        <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[#05DC91]">
          <Loading fill="#fff" />
        </div>

        <div className="font-medium text-2xl mb-3 mt-8 text-center w-11/12">{title}</div>

        {message && <div className="text-[18px] w-11/12 text-center">{message}</div>}
      </div>
    </CModal>
  );
};

export default ProcessModal;
