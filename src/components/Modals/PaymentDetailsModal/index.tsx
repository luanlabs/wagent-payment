import close from '/images/close.svg';
interface PaymentDetailsProps {
  amount?: number | string;
  exchangeRate: string;
  serviceTotal: string;
  totalPaid: string;
  onClose: () => void;
}

const PaymentDetailsModal = ({
  amount,
  exchangeRate,
  serviceTotal,
  totalPaid,
  onClose,
}: PaymentDetailsProps) => {
  return (
    <div className="w-full">
      <div className="inline-flex justify-between w-full items-center mb-4">
        <h3 className="text-2xl mobile:text-xl font-[Aeonik-m] text-darkBlue">
          Payment <span className="text-cadetBlue text-lg mobile:text-base">#333333</span>
        </h3>
        <img src={close} alt="close" onClick={onClose} className="cursor-pointer" />
      </div>

      <div>
        <h4 className="text-lg mobile:text-base font-[Aeonik-m] text-[#344054] mb-2">
          Payment details
        </h4>
        <div className="text-base mobile:text-sm text-[#667085] space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${amount}</span>
          </div>
          <div className="flex justify-between">
            <span>Exchange rate</span>
            <span>{exchangeRate}</span>
          </div>
          <div className="flex justify-between">
            <span>Service total</span>
            <span>{serviceTotal} USDT</span>
          </div>
          <div className="flex justify-between font-[Aeonik-m]">
            <span>Total amount paid</span>
            <span>{totalPaid}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
