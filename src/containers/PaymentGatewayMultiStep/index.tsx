import { useState } from 'react';

import StepOne from '../Steps/StepOne';
import StepTwo from '../Steps/StepTwo';
import StepThree from '../Steps/StepThree';
import OrderOverview from '../OrderOverview';

import { networks, tokensByNetwork } from './network';
import { IPaymentDetailsResponse, OptionType } from '../../models';

interface PaymentGatewayMultiStep {
  data: IPaymentDetailsResponse;
  orderId: string;
}

const PaymentGatewayMultiStep = ({ data, orderId }: PaymentGatewayMultiStep) => {
  const [step, setStep] = useState(1);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<OptionType | null>(null);
  const [selectedToken, setSelectedToken] = useState<OptionType | null>(null);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-[50%] desktopMax:w-[65%] flex gap-4 m-auto h-full mobile:flex-col mobile:!w-[90%]">
      <div className="w-full h-full basis-2/6 mobile:basis-full z-50">
        <OrderOverview data={data} orderId={orderId} />
      </div>
      <div className="w-full basis-4/6 mobile:basis-full z-50">
        {step === 1 && (
          <StepOne
            nextStep={nextStep}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
          />
        )}
        {step === 2 && (
          <StepTwo
            nextStep={nextStep}
            prevStep={prevStep}
            networks={networks}
            tokensByNetwork={tokensByNetwork}
            selectedNetwork={selectedNetwork}
            setSelectedNetwork={setSelectedNetwork}
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          />
        )}
        {step === 3 && (
          <div className="relative">
            <div className="h-[520px] desktopMax:h-[480px] mobile:!h-[400px] mobile:mb-8">
              <StepThree
                prevStep={prevStep}
                selectedNetwork={selectedNetwork}
                selectedToken={selectedToken}
              />
            </div>
            <div className="bg-[#FFFAEB] mt-2 rounded-lg p-2 text-center w-full absolute">
              <p className="text-[14px] text-[#475467]">
                <span className="text-[#1D2939] font-medium"> Note:</span> Entering the wrong
                <span className="text-[#1D2939] font-medium"> token, amount, address </span> or
                <span className="text-[#1D2939] font-medium"> network</span> will result in
                permanent loss of funds.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentGatewayMultiStep;
