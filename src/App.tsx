import { ChangeEvent, useState } from 'react';

import CCard from './components/CCard';
import CButton from './components/CButton';
import CSelect from './components/CSelect';
import CDisclosure from './components/CDisclosure';
import CConnectWallet from './components/CConnectWallet';
import CRadioButtonGroup from './components/CRadioButtonGroup';

import useGetPaymentDetails from './hooks/useGetPaymentDetails';
import { tokensToOptions } from './utils/tokensToOptions';

import { OptionType } from './models';
import ShoppingCardIcon from './assets/ShoppingCardIcon';

import logoType from '/images/logoType.svg';
import hoodie from '/images/hoodie.png';

export default function App() {
  const [selectedToken, setSelectedToken] = useState<OptionType | null>(null);
  const [emailAddress, setEmailAddress] = useState('');

  const handleSelectChange = (item: OptionType | null) => {
    if (item) {
      setSelectedToken(item);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value);
  };
  const data = useGetPaymentDetails('1');

  if (!data) {
    return <p>Loading!</p>;
  }
  const tokens = tokensToOptions(data.settings.tokens);

  const methodTabs = [
    { value: 'stream', label: 'Stream' },
    { value: 'single', label: 'Single' },
    { value: 'vesting', label: 'Vesting' },
  ];

  const networkTabs = [
    { value: 'stellar', label: 'Stellar' },
    { value: 'soroban', label: 'Soroban' },
  ];

  const orderTop = (
    <div className="mt-2 space-y-3">
      <CCard type="detailed" title="Purple Hoodie" subtitle="$15.00" image={hoodie} />
      <CCard type="detailed" title="Purple Hoodie" subtitle="$15.00" image={hoodie} />
    </div>
  );

  const orderBottom = (
    <div className="flex space-x-2">
      <CCard type="summary" title="Total Amount" subtitle="$40.00" />
      <CCard type="summary" title="Order ID" subtitle="#1321451234142" />
    </div>
  );

  return (
    <div
      className="desktop:center desktop:flex-row flex flex-col justify-start 
      gap-2 p-4 desktop:p-[12px] w-[100vw] h-[100dvh]"
    >
      <div className="relative desktop:w-2/5 w-full h-full order-1">
        <div className="center flex-col text-offWhite text-center bg-primaryGreen desktop:h-1/3 h-[260px] rounded-t-[10px]">
          <img src={logoType} alt="Wagent Logo" />
          <p className="text-2xl md:text-xl font-medium mt-[36px]">
            Simple and fast transactions for everyone
          </p>
          <p className="text-xs mt-[16px] w-3/4">Example Text</p>
        </div>
        <div
          className="absolute gap-2 shadow-md center left-[50%] -ml-[90px] p-4 z-10
          rounded-t-[10px] h-16 desktop:top-[30%] top-[230px] bg-white text-black"
        >
          <img src={hoodie} alt="shop" width={40} height={40} />
          <p className="font-medium">XYZ shop</p>
        </div>
        <div className="bg-white h-2/3 desktop:p-8 p-4 space-y-4 rounded-b-[10px] pt-16">
          <CDisclosure
            label="Order overview"
            title="Order Details"
            content={orderBottom}
            icon={<ShoppingCardIcon fill="#000" />}
          />
          <CDisclosure
            title="Order information"
            subTitle="2 Products in your cart"
            content={orderTop}
            icon={<ShoppingCardIcon fill="#000" />}
          />
        </div>
      </div>
      <div className="desktop:w-3/5 w-full h-full order-2 flex flex-col">
        <div className="desktop:mt-0 mt-14">
          <CCard type="simple" title="Payment options" className="!text-2xl" />
          <div className="p-6 mt-1 bg-white space-y-4 rounded-[10px]">
            <div className="between mobile:flex-col mobile:items-start gap-2">
              <span>
                <p className="text-base font-medium"> Wallet Address</p>
                <p className="text-sm text-cadetBlue">
                  Choose the token you'd like to make transaction with
                </p>
              </span>
              <div className="mobile:w-full w-1/3">
                <CConnectWallet />
              </div>
            </div>
            <div className="between mobile:flex-col mobile:items-start gap-2">
              <span>
                <p className="text-base font-medium">Select network</p>
                <p className="text-sm text-cadetBlue">
                  Choose the token you'd like to make transaction with
                </p>
              </span>
              <div className="mobile:w-full w-1/3">
                <CRadioButtonGroup tabs={methodTabs} defaultSelectedTab={methodTabs[0].value} />
              </div>
            </div>
            <div className="between mobile:flex-col mobile:items-start gap-2">
              <span>
                <p className="text-base font-medium"> Payment method</p>
                <p className="text-sm text-cadetBlue">
                  Choose the token you'd like to make transaction with
                </p>
              </span>
              <div className="mobile:w-full w-1/3">
                <CRadioButtonGroup tabs={networkTabs} defaultSelectedTab={networkTabs[0].value} />
              </div>
            </div>
            <div className="between mobile:flex-col mobile:items-start gap-2">
              <span>
                <p className="text-base font-medium"> Select token</p>
                <p className="text-sm text-cadetBlue">
                  Choose the token you'd like to make transaction with
                </p>
              </span>
              <div className="mobile:w-full w-1/3">
                <CSelect onChange={handleSelectChange} options={tokens} placeholder="Select" />
              </div>
            </div>
            <div className="between mobile:flex-col mobile:items-start gap-2">
              <span>
                <p className="text-base font-medium"> Email address</p>
                <p className="text-sm text-cadetBlue">
                  Choose the token you'd like to make transaction with
                </p>
              </span>
              <div className="mobile:w-full w-1/3">
                <input
                  onChange={handleEmailChange}
                  placeholder="Email"
                  type="email"
                  className="w-full h-10 py-[10px] px-[14px] text-base border border-lightGrayishBlue rounded-lg
                placeholder:text-cadetBlue text-black focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full mt-1">
          <CCard type="simple" title="Payment overview" className="!text-2xl" />
          <div className="relative p-6 mt-1 bg-white rounded-[10px] h-[calc(100%-75px)] ">
            <div className="desktop:h-full">
              <div className="between desktop:h-[16%] h-10 text-base font-medium">
                <p>Email Address:</p>
                <p className="text-cadetBlue">{emailAddress}</p>
              </div>
              <div className="between desktop:h-[16%] h-10 text-base font-medium">
                <p>Payment method:</p>
                <p className="text-cadetBlue">{emailAddress}</p>
              </div>
              <div className="between desktop:h-[16%] h-10 text-base font-medium">
                <p>Token:</p>
                {selectedToken && (
                  <p className="center gap-2 text-success py-0.5 px-[10px] bg-mintGreen border border-lightGreen rounded-full">
                    <img src={selectedToken.logo} alt="token" width={16} height={16} />
                    {selectedToken.label}
                  </p>
                )}
              </div>
              <div className="between desktop:h-[16%] h-10 text-base font-medium">
                <p>Total Amount:</p>
                <p className="text-cadetBlue">{emailAddress}</p>
              </div>
            </div>

            <div className="desktop:absolute bottom-6 right-6 left-6 flex gap-2 mobile:flex-col-reverse mobile:mt-2">
              <CButton variant="bordered" text="Cancel Order" className="desktop:w-[60%]" />
              <CButton variant="confirm" text="Confirm Payment" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
