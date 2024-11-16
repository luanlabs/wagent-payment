import CModal from '../../Modal';

interface CancelOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CancelOrderModal = ({ isOpen, onClose, onConfirm }: CancelOrderModalProps) => {
  return (
    <CModal isOpen={isOpen} onClose={onClose} className="w-[404px] h-[198px]">
      <p className="text-2xl text-[#D92D20] font-[Aeonik-m]">Cancel Your Order</p>
      <p className="text-[#475467] my-4">Are you sure you want to cancel this order?</p>
      <div className="flex justify-between gap-4 mt-10">
        <button onClick={onClose} className="h-10 w-full text-[#475467]">
          Keep My Order
        </button>
        <button
          onClick={onConfirm}
          className="h-10 w-full rounded-lg text-white bg-[#D92D20] hover:bg-red-700 transition-colors"
        >
          Yes, cancel it
        </button>
      </div>
    </CModal>
  );
};

export default CancelOrderModal;
