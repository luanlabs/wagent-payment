import CModal from '../../Modal';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelOrderModal = ({ isOpen, onClose, onConfirm }: CancelOrderModalProps) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose} title="Cancel Your Order">
      <p className="text-gray-700 my-4">Are you sure you want to cancel this order?</p>
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Keep My Order
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
        >
          Yes, cancel it
        </button>
      </div>
    </CModal>
  );
};

export default CancelOrderModal;
