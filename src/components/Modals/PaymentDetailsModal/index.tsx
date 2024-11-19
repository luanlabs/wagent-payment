import ArrowUpRight from '../../../assets/ArrowUpRight';
import CButton from '../../CButton';
import CTokenLabel from '../../CTokenLabel';

interface PaymentDetailsProps {
  price: number;
  exchangeRate: string;
  serviceTotal: number;
  totalPaid: string;
  txHash: string;
  network: string;
  token: string;
  dateTime: string;
}

const PaymentDetailsModal = ({
  price,
  exchangeRate,
  serviceTotal,
  totalPaid,
  txHash,
  network,
  token,
  dateTime,
}: PaymentDetailsProps) => {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-[Aeonik-m] text-darkBlue mb-4">
        Payment <span className="text-cadetBlue text-lg">#333333</span>
      </h3>

      <div className="border-b border-dashed border-[#E4E7EC] pb-4">
        <h4 className="text-lg font-[Aeonik-m] text-[#344054] mb-2">Payment details</h4>
        <div className="text-base text-[#667085] space-y-2">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${price.toFixed(2)}</span>
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
        <div className="text-base text-[#667085] space-y-2">
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
            <CTokenLabel symbol={token} imgSrc={token} />
          </div>
          <div className="flex justify-between">
            <span>Date & Time</span>
            <span>{dateTime}</span>
          </div>
        </div>
      </div>

      <div className="flex w-full mt-6">
        <a
          href={`https://stellar.expert/explorer/public/tx/${txHash}`}
          className="center gap-2 px-4 w-1/2 py-2 bg-gray-100 text-[#344054] mr-2 whitespace-nowrap"
        >
          see in explorer <ArrowUpRight fill="#344054" />
        </a>

        <CButton variant="next" className="px-4 w-1/2 py-2" onClick={() => console.log('Cancel')}>
          Download receipt
        </CButton>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
