import { useEffect, useState } from 'react';

import StepWrapper from '../../../components/StepWrapper';
import CopyButton from '../../../components/CopyButton';

import { useAppSelector } from '../../../hooks/useRedux';

import generateQrCode from '../../../utils/generateQrCode';
import { ITokenResponse, OptionType } from '../../../models';
interface StepThreeProps {
  prevStep: () => void;
  setStep: (_: number) => void;
  selectedNetwork: OptionType | null;
  selectedToken: ITokenResponse | null;
  setIsPayed: (_: boolean) => void;
}

const StepThree = ({
  prevStep,
  selectedNetwork,
  selectedToken,
  setStep,
  setIsPayed,
}: StepThreeProps) => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const { data, loading } = useAppSelector((store) => store.data);

  const paymentAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  useEffect(() => {
    const generateQr = async () => {
      try {
        const qr = await generateQrCode(paymentAddress);
        setQrCode(qr);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQr();
  }, []);

  let amount = '0';
  if (!loading && data) {
    amount =
      data.tokens.find((token) => token.token.symbol === selectedToken?.symbol)?.amount || '0';

    if (data.status === 'completed') {
      setIsPayed(true);
      setStep(4);
    }
  }

  return (
    <StepWrapper title="Pay for your order" prevStep={prevStep} showNext={false}>
      <div className="mt-0 flex flex-col items-center">
        <h2 className="font-medium text-[#101828]">
          Please send{' '}
          <span className="text-green-500">
            {amount} {selectedToken?.symbol.toUpperCase()}{' '}
          </span>
          to Address below
        </h2>
        <div className="w-[142px] h-[142px] overflow-hidden border border-1 border-[#E4E7EC] rounded-xl mt-3">
          {qrCode ? (
            <img src={qrCode} alt="qrCode" className="object-cover w-full h-full scale-[1.115]" />
          ) : (
            'Error'
          )}
        </div>

        <div className="flex justify-between border border-1 border-[#E4E7EC] mt-3 rounded-md">
          <div className="py-1 px-3 mobile:text-[14px]">
            Memo:<span className="ml-1">{data?.memo}</span>
          </div>
          <div className="border-l border-1 border-[#E4E7EC] flex justify-center items-center py-2 px-3 cursor-pointer">
            <CopyButton text={data?.memo || ''} />
          </div>
        </div>

        <section className="flex flex-col border border-1 border-[#FEDF89] rounded-xl w-[450px] mobile:w-full mt-3">
          <div className="flex justify-between border-r-0 border-b border-1 border-[#FEDF89]">
            <div className="py-2 px-3 mobile:text-[14px]">
              <span className="break-all text-[15px]">{paymentAddress}</span>
            </div>
            <div className="border-l border-1 border-[#FEDF89] flex justify-center items-center py-2 px-3 cursor-pointer">
              <CopyButton text={paymentAddress} />
            </div>
          </div>

          <div className="p-2 text-center text-[#DC6803] mobile:text-[14px]">
            <p className="flex justify-center items-center">
              Pay only in
              <div className="text-[#475467] flex items-center space-x-1 mx-1">
                <img src={selectedToken?.logo} draggable={false} width={16} height={16} />
                <p>{selectedToken?.symbol.toUpperCase()}</p>
              </div>
              on
              <div className="text-[#475467] flex items-center space-x-1 !mx-1">
                <img src={selectedNetwork?.logo} draggable={false} width={16} height={16} />
                <p>{selectedNetwork?.label}</p>
              </div>
              to this address
            </p>
          </div>
        </section>
      </div>
    </StepWrapper>
  );
};

export default StepThree;
