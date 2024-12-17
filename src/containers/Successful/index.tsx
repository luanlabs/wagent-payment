import CButton from '../../components/CButton';
import CStatusCard from '../../components/CStatusCard';
import CTokenLabel from '../../components/CTokenLabel';

import humanizeAmount from '../../utils/humanizeAmount';
import downloadReceiptWithTemplate from '../../utils/downloadReceiptWithTemplate';

import { ITokenResponse, StatusType } from '../../models';

import successLogo from '/images/successLogo.svg';
import ArrowUpRight from '../../assets/ArrowUpRight';

interface SuccessPaymentProps {
  amount: string;
  txHash: string;
  network: string;
  dateTime: string;
  networkImg: string;
  token: ITokenResponse;
  status: StatusType;
  orderId: string;
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
  orderId,
  currency,
}: SuccessPaymentProps) => {
  const handleDownloadClick = () => {
    downloadReceiptWithTemplate({
      orderId,
      amount,
      hash: txHash,
      token: token.symbol,
      network: 'Stellar',
      date: dateTime,
      status,
      currency,
    });
  };

  return (
    <div className="h-full mobile:items-start w-full !z-[9999]">
      <div className="h-full center gap-5 flex-col py-6 px-8 mobile:px-4 mobile:w-full shadow-sm rounded-2xl bg-white">
        <div className="center flex-col">
          <img src={successLogo} alt="success" />
          <p className="text-2xl text-center mt-4 mb-2 text-[#0B433E] font-[Aeonik-m]">
            Transaction successful
          </p>
          <p className="text-[#475467]">You will be redirected shortly</p>
        </div>
        <div className="w-[90%] rounded-[10px] py-3 px-4 mobile:w-full bg-lightGray mx-2">
          <div className="text-base mobile:text-sm text-[#667085] space-y-4 py-2">
            <div className="flex justify-between">
              <span>Amount</span>
              <span className="font-[Aeonik-m]">
                {humanizeAmount(amount)} {token.symbol.toLocaleUpperCase()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>TX hash</span>
              <a
                href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
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
              <span className="font-[Aeonik-m] text-darkBlue gap-1 flex items-center">
                <div className="w-[20px] h-[20px]">
                  <img src={networkImg} alt="network" className="w-full h-full object-cover" />
                </div>
                {network}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Token</span>
              <CTokenLabel symbol={token.symbol} imgSrc={token.logo} />
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
            onClick={handleDownloadClick}
          >
            Download receipt
          </CButton>
        </div>
      </div>
    </div>
  );
};
export default Successful;
