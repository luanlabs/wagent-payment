import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import CCard from '../../components/CCard';
import CButton from '../../components/CButton';
import CSelect from '../../components/CSelect';
import ConfirmPayment from '../ConfirmPayment';
import CItemField from '../../components/CItemField';
import CTokenLabel from '../../components/CTokenLabel';
import CResultDetail from '../../components/CResultDetail';
import CConnectWallet from '../../components/CConnectWallet';
import CRadioButtonGroup from '../../components/CRadioButtonGroup';

import { MethodsType } from '../../utils/Methods';
import { methodTabs } from '../../constants/methods';
import { IPaymentDetailsResponse, OptionType } from '../../models';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

interface PaymentOptionsProps {
  data: IPaymentDetailsResponse;
  methods: MethodsType[];
  tokens: OptionType[];
}

const PaymentOptions = ({ data, methods, tokens }: PaymentOptionsProps) => {
  const [selectedToken, setSelectedToken] = useState<OptionType | null>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>(
    capitalizeFirstLetter(methodTabs[0]),
  );
  const [emailError, setEmailError] = useState('');
  const [isConfirmClicked, setIsConfirmClicked] = useState(false);

  const handleSelectChange = (item: OptionType | null) => {
    if (item) {
      setSelectedToken(item);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email === '') {
      setEmailError('');
    } else if (emailRegex.test(email)) {
      setEmailAddress(email);
      setEmailError('');
    } else {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleSelectedMethod = (value: string) => {
    setSelectedMethod(value);
  };

  const handleCancelOrder = () => {
    window.location.href = data.redirectUrl;
  };

  const handleConfirmPayment = () => {
    setIsConfirmClicked(true);
  };

  const validateField = selectedToken && !emailError;

  let paymentStatus;
  if (data.status === 'expired') {
    paymentStatus = <div>The payment time has expired. Please try again.</div>;
  } else if (data.status === 'complete') {
    paymentStatus = <div>Payment was successful. Thank you for your purchase.</div>;
  }

  return (
    <div className="desktop:w-3/5 w-full h-full order-2 flex flex-col justify-between">
      {data.status !== 'pending' && (
        <div className="bg-primaryGreen text-offWhite rounded-[10px] p-4 text-base">
          {paymentStatus}
        </div>
      )}
      <div
        className={clsx(`desktop:mt-0 mobile:mt-3`, {
          'pointer-events-none opacity-50 blur-[1px] select-none': data.status !== 'pending',
        })}
      >
        <CCard type="simple" title="Payment options" className="!text-2xl desktopMax:py-[18px]" />
        <div className="px-6 pt-4 mt-1 bg-white space-y-4 bigScreen:space-y-[50px] desktopMax:space-y-5 rounded-[10px] pb-7">
          <CItemField
            title="Wallet Address"
            description="Choose the token you'd like to make transaction with"
            component={<CConnectWallet />}
          />

          <CItemField
            title="Payment method"
            description="Choose the token you'd like to make transaction with"
            component={
              <CRadioButtonGroup
                tabs={methodTabs}
                defaultSelectedTab={methodTabs[0]}
                selectableTabs={methods}
                onChange={handleSelectedMethod}
              />
            }
          />

          <CItemField
            title="Select token"
            description="Choose the token you'd like to make transaction with"
            component={
              <CSelect onChange={handleSelectChange} options={tokens} placeholder="Select" />
            }
          />

          <CItemField
            title="Email address"
            description="Choose the token you'd like to make transaction with"
            component={
              <div>
                <input
                  onChange={handleEmailChange}
                  placeholder="Email"
                  type="email"
                  className="w-full h-10 py-[10px] px-[14px] text-base border border-lightGrayishBlue rounded-lg placeholder:text-cadetBlue text-black focus:outline-none"
                />
                <p className="text-[13px] text-red-500 px-1 h-1 mt-[2px]">
                  {emailError && emailError}
                </p>
              </div>
            }
          />
        </div>
      </div>
      <div
        className={clsx(`mt-1`, {
          'pointer-events-none opacity-50 blur-[1px] select-none': data.status !== 'pending',
        })}
      >
        <CCard type="simple" title="Payment overview" className="!text-2xl desktopMax:py-[18px]" />
        <div className="flex flex-col justify-center px-6 py-2 bigScreen:py-4 mt-1 bg-white rounded-[10px]">
          <div className="desktop:h-full desktopMax:space-y-5 bigScreen:space-y-5">
            <CResultDetail label="Email Address" value={emailAddress} />

            <CResultDetail label="Payment method" value={capitalizeFirstLetter(selectedMethod)} />

            <CResultDetail
              label="Token"
              value={
                <div className="flex items-center space-x-4">
                  {selectedToken && (
                    <CTokenLabel symbol={selectedToken.label} imgSrc={selectedToken.logo} />
                  )}
                </div>
              }
            />

            <CResultDetail
              label="Total Amount"
              value={`$${data.amount}`}
              valueColor="text-darkBlue"
            />
          </div>

          <div className="flex gap-2 mobile:flex-col-reverse mobile:mt-2 pt-10">
            <CButton
              variant="bordered"
              text="Cancel Order"
              className="desktop:w-[60%]"
              onClick={handleCancelOrder}
            />
            <CButton
              variant="confirm"
              text="Confirm Payment"
              className={clsx('mobile:h-[44px]', {
                '!bg-customGray !pointer-events-none !text-lightGrayishBlue': !validateField,
              })}
              onClick={handleConfirmPayment}
            />
          </div>
        </div>
        <ConfirmPayment
          isConfirmClicked={isConfirmClicked}
          setIsConfirmClicked={setIsConfirmClicked}
        />
      </div>
    </div>
  );
};

export default PaymentOptions;
