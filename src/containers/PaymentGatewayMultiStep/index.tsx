import { useEffect, useState } from 'react';

import Header from '../Header';
import StepOneEmail from '../Steps/StepOneEmail';
import StepTwo from '../Steps/StepTwoSelectToken';
import ExpiredBox from '../ExpiredBox';
import StepFour from '../Steps/StepFour';
import CanceledBox from '../CanceledBox';
import StepThree from '../Steps/StepThree';
import OrderOverview from '../OrderOverview';
import StepSuccessful from '../Steps/StepSuccessful';
import CountdownTimer from '../../components/CountdownTimer';

import { IOrderDetailsResponse, ITokenResponse, OptionType } from '../../models';

import { networks } from './network';

interface PaymentGatewayMultiStep {
  orderId: string;
  showCountdown?: boolean;
  data: IOrderDetailsResponse;
}

const PaymentGatewayMultiStep = ({
  data,
  orderId,
  showCountdown = true,
}: PaymentGatewayMultiStep) => {
  const [step, setStep] = useState(1);
  const [isPayed, setIsPayed] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState<OptionType | null>(null);
  const [selectedToken, setSelectedToken] = useState<ITokenResponse | null>(null);
  const [isRedirect, setIsRedirect] = useState(false);

  const expiredTimeStamp = data.expiredTimestamp;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const isSuccessful = data.status === 'completed';
  const isLoading = isPayed && isSuccessful;

  useEffect(() => {
    if (isLoading) {
      setStep(4);
      setIsPayed(false);
    } else if (isSuccessful) {
      setStep(5);
    }
  }, [step]);

  return (
    <div className="h-screen mobile:h-full">
      <div className="static desktop:fixed desktop:top-0 desktop:right-0 desktop:left-0 z-10">
        <Header isExpired={true} orderId={orderId} orderStatus={data.status} />
      </div>

      {data.status !== 'pending' && step > 4 && (
        <div className="flex justify-center items-center m-auto h-full">
          {data.status === 'expired' && (
            <div>
              <ExpiredBox redirectUrl={data.redirectUrl} />
            </div>
          )}

          {data.status === 'cancelled' && (
            <div>
              <CanceledBox />
            </div>
          )}

          {step === 5 && (
            <div className="z-[5] w-[45%] bigScreen:w-[30%] mobile:w-full">
              <StepSuccessful
                data={data}
                selectedNetwork={networks.stellar}
                isRedirect={isRedirect}
                orderId={orderId}
              />
            </div>
          )}
        </div>
      )}

      {step < 5 && (
        <div className="h-full flex items-center justify-center pt-8">
          <div className="h-[520px] desktopMax:h-[480px] w-[50%] desktopMax:w-[65%] flex gap-4 m-auto mobile:flex-col mobile:!w-[90%] mobile:!h-auto">
            <div className="w-full h-full basis-2/6 mobile:basis-full mobile:!h-auto relative">
              <OrderOverview data={data} orderId={orderId} />
            </div>
            <div className="w-full basis-4/6 mobile:basis-full relative">
              {showCountdown && step < 5 ? (
                <div className="h-[60px] w-[100px] absolute right-10 top-3">
                  <CountdownTimer expiredTimeStamp={expiredTimeStamp} />
                </div>
              ) : (
                ''
              )}
              {step === 1 && (
                <StepOneEmail
                  nextStep={nextStep}
                  emailAddress={emailAddress}
                  setEmailAddress={setEmailAddress}
                />
              )}
              {step === 2 && (
                <StepTwo
                  nextStep={nextStep}
                  prevStep={prevStep}
                  tokens={data.tokens}
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
                      setStep={setStep}
                      setIsPayed={setIsPayed}
                    />
                  </div>
                  <div className="bg-[#FFFAEB] mt-2 rounded-lg p-2 text-center w-full absolute">
                    <p className="text-[14px] text-[#475467]">
                      <span className="text-[#1D2939] font-medium"> Note:</span> Entering the wrong
                      <span className="text-[#1D2939] font-medium">
                        {' '}
                        token, amount, address{' '}
                      </span>{' '}
                      or
                      <span className="text-[#1D2939] font-medium"> network</span> will result in
                      permanent loss of funds.
                    </p>
                  </div>
                </div>
              )}
              {step === 4 && <StepFour setStep={setStep} setIsRedirect={setIsRedirect} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentGatewayMultiStep;
