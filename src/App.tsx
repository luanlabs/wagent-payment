import { ChangeEvent, useState } from 'react';

import CCard from './components/CCard';
import CButton from './components/CButton';
import CSelect from './components/CSelect';
import CItemField from './components/CItemField';
import CDisclosure from './components/CDisclosure';
import CResultDetail from './components/CResultDetail';
import CConnectWallet from './components/CConnectWallet';
import CRadioButtonGroup from './components/CRadioButtonGroup';

import { tokensToOptions } from './utils/tokensToOptions';
import useGetPaymentDetails from './hooks/useGetPaymentDetails';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter';

import { OptionType } from './models';
import ShoppingCardIcon from './assets/ShoppingCardIcon';

import hoodie from '/images/hoodie.png';
import logoType from '/images/logoType.svg';

const methodTabs = [
  { value: 'stream', label: 'Stream' },
  { value: 'single', label: 'Single' },
  { value: 'vesting', label: 'Vesting' },
];

const networkTabs = [
  { value: 'stellar', label: 'Stellar' },
  { value: 'soroban', label: 'Soroban' },
];

export default function App() {
  const [selectedToken, setSelectedToken] = useState<OptionType | null>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState(networkTabs[0].label);
  const [selectedMethod, setSelectedMethod] = useState(methodTabs[0].label);

  const handleSelectChange = (item: OptionType | null) => {
    if (item) {
      setSelectedToken(item);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (e.target.value && e.target.value.match(emailRegex)) {
      setEmailAddress(e.target.value);
    }
  };

  const handleSelectedNetwork = (value: string) => {
    setSelectedNetwork(value);
  };

  const handleSelectedMethod = (value: string) => {
    setSelectedMethod(value);
  };

  const data = useGetPaymentDetails('1');

  if (!data) {
    return <p>Loading!</p>;
  }
  const tokens = tokensToOptions(data.settings.tokens);

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
      gap-2 p-2 desktop:p-[12px] w-full mobile:h-full tablet:h-full h-[100dvh]"
    >
      <div className="desktop:w-2/5 w-full h-full order-1">
        <div className="relative center flex-col text-offWhite text-center bg-primaryGreen desktop:h-1/3 tablet:!h-[300px] mobile:!h-[300px] desktopMax:h-2/5 h-[260px] rounded-t-[10px]">
          <img src={logoType} alt="Wagent Logo" />
          <p className="text-2xl font-medium mt-[36px] px-4">
            Simple and fast transactions for everyone
          </p>
          <p className="text-xs mt-[16px] w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="absolute gap-2 shadow-md rounded-[10px] py-2 pl-2 pr-3 inline-flex items-center z-10 -bottom-[30px] min-w-[240px] bg-white text-black">
            <img src={hoodie} alt="shop" width={60} height={60} />
            <p className="font-medium whitespace-nowrap">Amanda shop</p>
          </div>
        </div>

        <div className="bg-white tablet:!h-2/3 desktop:h-2/3 desktopMax:h-3/5 desktop:p-8 p-6 space-y-4 rounded-b-[10px] pt-16 overflow-y-auto mobile:overflow-hidden">
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

      <div className="desktop:w-3/5 w-full h-full order-2 flex flex-col justify-between">
        <div className="desktop:mt-0 mt-14 mobile:mt-3">
          <CCard type="simple" title="Payment options" className="!text-2xl desktopMax:py-[18px]" />
          <div className="px-6 py-4 mt-1 bg-white space-y-4 bigScreen:space-y-[50px] desktopMax:space-y-5 rounded-[10px]">
            <CItemField
              title="Wallet Address"
              description="Choose the token you'd like to make transaction with"
              component={<CConnectWallet />}
            />
            <CItemField
              title="Select network"
              description="Choose the token you'd like to make transaction with"
              component={
                <CRadioButtonGroup
                  tabs={networkTabs}
                  defaultSelectedTab={networkTabs[0].value}
                  onChange={handleSelectedNetwork}
                />
              }
            />
            <CItemField
              title="Payment method"
              description="Choose the token you'd like to make transaction with"
              component={
                <CRadioButtonGroup
                  tabs={methodTabs}
                  defaultSelectedTab={methodTabs[0].value}
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
                <input
                  onChange={handleEmailChange}
                  placeholder="Email"
                  type="email"
                  className="w-full h-10 py-[10px] px-[14px] text-base border border-lightGrayishBlue rounded-lg placeholder:text-cadetBlue text-black focus:outline-none"
                />
              }
            />
          </div>
        </div>
        <div className="mt-1">
          <CCard
            type="simple"
            title="Payment overview"
            className="!text-2xl desktopMax:py-[18px]"
          />
          <div className="flex flex-col justify-center px-6 py-2 bigScreen:py-4 mt-1 bg-white rounded-[10px] ">
            <div className="desktop:h-full desktopMax:space-y-[10px] bigScreen:space-y-5">
              <CResultDetail label="Email Address" value={emailAddress} />
              <CResultDetail label="Payment method" value={capitalizeFirstLetter(selectedMethod)} />
              <CResultDetail
                label="Token"
                value={
                  <div className="flex space-x-4">
                    {selectedToken && (
                      <p className="center gap-2 text-success px-2 bg-mintGreen border border-lightGreen rounded-full">
                        <img src={selectedToken.logo} alt="token" width={14} height={14} />
                        {selectedToken.label}
                      </p>
                    )}
                    {selectedNetwork && <p>{capitalizeFirstLetter(selectedNetwork)}</p>}
                  </div>
                }
              />
              <CResultDetail label="Total Amount" value="$1400" valueColor="text-darkBlue" />
            </div>

            <div className="flex gap-2 mobile:flex-col-reverse mobile:mt-2 desktopMax:pt-2 bigScreen:pt-5">
              <CButton variant="bordered" text="Cancel Order" className="desktop:w-[60%]" />
              <CButton variant="confirm" text="Confirm Payment" className="mobile:h-[44px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
