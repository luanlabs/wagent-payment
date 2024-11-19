import ArrowUpRight from '../../assets/ArrowUpRight';
import CStatusCard, { StatusType } from '../../components/CStatusCard';
import CTokenLabel from '../../components/CTokenLabel';
import successLogo from '/images/successLogo.svg';

interface SuccessPaymentProps {
  amount: string;
  txHash: string;
  network: string;
  token: string;
  dateTime: string;
  status: StatusType;
  networkImg: string;
  currency: string;
}
const Successful = ({
  amount,
  network,
  token,
  dateTime,
  txHash,
  status,
  networkImg,
  currency,
}: SuccessPaymentProps) => {
  return (
    <div className="h-full mobile:items-start w-full z-40">
      <div className="center gap-4 flex-col py-6 px-8 mobile:px-4 mobile:w-full shadow-sm rounded-2xl bg-white">
        <div className="center flex-col">
          <img src={successLogo} alt="success" />
          <p className="text-2xl mt-4 mb-2 text-[#0B433E] font-[Aeonik-m]">
            Transaction successful
          </p>
          <p className="text-[#475467]">You will be redirected shortly</p>
        </div>
        <div className="w-[510px] rounded-lg py-3 px-4 mobile:w-full bg-lightGray mx-2">
          <div className="text-base mobile:text-sm text-[#667085] space-y-3">
            <div className="flex justify-between">
              <span>Price</span>
              <span className="font-[Aeonik-m]">
                ${amount} {currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TX hash</span>
              <a
                href={`https://stellar.expert/explorer/public/tx/${txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A21D4] hover:underline flex items-center gap-1"
              >
                {txHash.substring(0, 6)}...{txHash.slice(-4)}
                <ArrowUpRight fill="#3A21D4" />
              </a>
            </div>
            <div className="flex justify-between">
              <span>Network</span>
              <span className="font-[Aeonik-m] text-darkBlue inline-flex gap-1">
                <img src={networkImg} alt="network" />
                {network}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Token</span>
              <CTokenLabel symbol={token} imgSrc={token} />
            </div>
            <div className="flex justify-between">
              <span>Status</span>
              <CStatusCard status={status} />
            </div>
            <div className="flex justify-between">
              <span>Date & Time</span>
              <span>{dateTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Successful;
