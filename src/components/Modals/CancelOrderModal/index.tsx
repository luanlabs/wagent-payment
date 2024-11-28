import { useState } from 'react';

import CModal from '../../Modal';
import rolling from '/images/rolling.svg';
import useCancelOrder from '../../../utils/cancelOrder';
import redCircleMultiplied from '/images/redCircleMultiplied.svg';
import CButton from '../../CButton';

interface CancelOrderModalProps {
  isOpen: boolean;
  orderId: string;
  onClose: () => void;
}

const CancelOrderModal = ({ isOpen, onClose, orderId }: CancelOrderModalProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const cancelData = useCancelOrder(orderId);

  const handleConfirm = () => {
    cancelData().then(() => {
      setIsConfirmed(true);
      setTimeout(() => {
        onClose();
        setIsConfirmed(false);
      }, 2000);
    });
  };

  return (
    <CModal isOpen={isOpen} onClose={onClose} className="w-[404px]">
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isConfirmed ? '!h-[200px] sm:!h-[230px]' : '!h-[152px] sm:!h-[178px]'
        }`}
      >
        {isConfirmed ? (
          <div className="center flex-col">
            <img src={redCircleMultiplied} alt="canceled" draggable={false} />
            <p className="text-2xl mobile:text-xl text-[#D92D20] font-[Aeonik-m] mt-4">
              Order Cancelled
            </p>
            <p className="text-[#475467] text-center text-base my-2">
              Your order has been successfully cancelled. We’ll redirect you to the main website
              shortly.
            </p>
            <img src={rolling} alt="loading" draggable={false} />
          </div>
        ) : (
          <div>
            <p className="text-2xl mobile:text-xl text-[#D92D20] font-[Aeonik-m]">
              Cancel Your Order
            </p>
            <p className="text-[#475467] my-4">Are you sure you want to cancel this order?</p>
            <div className="flex justify-between gap-4 mt-10">
              <CButton
                onClick={onClose}
                className="h-10 w-full text-[#475467] rounded-lg hover:bg-lightGray transition-colors duration-300"
                variant="simple"
              >
                Keep My Order
              </CButton>
              <CButton
                variant="next"
                onClick={handleConfirm}
                className="h-10 w-full rounded-lg text-white bg-[#D92D20] hover:bg-red-700 transition-colors duration-300"
              >
                Yes, Cancel it
              </CButton>
            </div>
          </div>
        )}
      </div>
    </CModal>
  );
};

export default CancelOrderModal;
