import StepWrapper from '../../../components/StepWrapper';

import Copy from '../../../assets/Copy';

import { OptionType } from '../../../models';
import copyText from '../../../utils/copyText';

interface StepThreeProps {
  prevStep: () => void;
  selectedNetwork: OptionType | null;
  selectedToken: OptionType | null;
}

const StepThree = ({ prevStep, selectedNetwork, selectedToken }: StepThreeProps) => {
  const handleCopyAddress = () => {
    copyText('fkjhfkajshfkasldjh');
  };

  return (
    <StepWrapper title="Pay for your order" prevStep={prevStep} showNext={false}>
      <div className="mt-5 flex flex-col items-center">
        <h2 className="font-medium text-[#101828] font-[Aeonik-m]">
          Please send <span className="text-green-500 font-[Aeonik-b]">550.99 USDT</span> to Address
          below
        </h2>
        <div className="w-[172px] h-[172px] overflow-hidden border border-1 border-[#E4E7EC] rounded-xl mt-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
            alt="qrCode"
            className="object-cover w-full h-full"
          />
        </div>

        <section className="flex flex-col border border-1 border-[#FEDF89] rounded-xl w-[450px] mobile:w-full mt-4">
          <div className="flex justify-between border-r-0 border-b border-1 border-[#FEDF89]">
            <div className="py-2 px-3 mobile:text-[14px]">TDiScJc1jOdLTVvzysSnNC3R2Z316ZbMg4</div>
            <div
              className="border-l border-1 border-[#FEDF89] flex justify-center items-center py-2 px-3 cursor-pointer"
              onClick={handleCopyAddress}
            >
              <Copy fill="#667085" />
            </div>
          </div>

          <div className="p-2 text-center text-[#DC6803] mobile:text-[14px]">
            <p className="flex justify-center items-center">
              Pay only in
              <div className="text-[#475467] flex items-center font-[Aeonik-m] space-x-1 mx-1">
                <img src={selectedToken?.logo} draggable={false} width={16} height={16} />
                <p>{selectedToken?.label}</p>
              </div>
              on
              <div className="text-[#475467] flex items-center font-[Aeonik-m] space-x-1 !mx-1">
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
