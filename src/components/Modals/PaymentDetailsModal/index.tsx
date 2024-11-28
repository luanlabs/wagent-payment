import ArrowUpRight from '../../../assets/ArrowUpRight';
import CButton from '../../CButton';
import CTokenLabel from '../../CTokenLabel';

import close from '/images/close.svg';
interface PaymentDetailsProps {
  amount: number;
  exchangeRate: string;
  serviceTotal: number;
  totalPaid: string;
  txHash: string;
  network: string;
  token: {
    name: string;
    img: string;
  };
  dateTime: string;
  onClose: () => void;
}

const PaymentDetailsModal = ({
  amount,
  exchangeRate,
  serviceTotal,
  totalPaid,
  txHash,
  network,
  token,
  dateTime,
  onClose,
}: PaymentDetailsProps) => {
  // TODO implement Download receipt action

  return (
    <div className="w-full">
      <div className="inline-flex justify-between w-full items-center mb-4">
        <h3 className="text-2xl mobile:text-xl font-[Aeonik-m] text-darkBlue">
          Payment <span className="text-cadetBlue text-lg mobile:text-base">#333333</span>
        </h3>
        <img src={close} alt="close" onClick={onClose} className="cursor-pointer" />
      </div>

      <div className="border-b border-dashed border-[#E4E7EC] pb-4">
        <h4 className="text-lg mobile:text-base font-[Aeonik-m] text-[#344054] mb-2">
          Payment details
        </h4>
        <div className="text-base mobile:text-sm text-[#667085] space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Exchange rate</span>
            <span>{exchangeRate}</span>
          </div>
          <div className="flex justify-between">
            <span>Service total</span>
            <span>{serviceTotal.toFixed(2)} USDT</span>
          </div>
          <div className="flex justify-between font-[Aeonik-m]">
            <span>Total amount paid</span>
            <span>{totalPaid}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-[Aeonik-m] text-[#344054] mb-2">Transaction</h4>
        <div className="text-base mobile:text-sm text-[#667085] space-y-2">
          <div className="flex justify-between">
            <span>TX hash</span>
            <a
              href={`https://stellar.expert/explorer/public/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              {txHash.substring(0, 6)}...{txHash.slice(-4)}
              <ArrowUpRight fill="#2563eb" />
            </a>
          </div>
          <div className="flex justify-between">
            <span>Network</span>
            <span>{network}</span>
          </div>
          <div className="flex justify-between">
            <span>Token</span>
            <CTokenLabel symbol={token.name} imgSrc={token.img} />
          </div>
          <div className="flex justify-between">
            <span>Date & Time</span>
            <span>{dateTime}</span>
          </div>
        </div>
      </div>

      <div className="flex mobile:flex-col-reverse mobile:gap-1 w-full mt-6">
        <a
          href={`https://stellar.expert/explorer/public/tx/${txHash}`}
          className="center gap-2 px-4 !w-1/2 mobile:!w-full py-2 text-[#344054] mr-2 whitespace-nowrap rounded-lg hover:bg-lightGray transition-colors duration-300"
        >
          See in explorer <ArrowUpRight fill="#344054" />
        </a>

        <CButton
          variant="next"
          className="px-4 !w-1/2 mobile:!w-full py-2 hover:bg-[#008B5B] transition-colors duration-300"
          onClick={() => console.log('download')}
        >
          Download receipt
        </CButton>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
