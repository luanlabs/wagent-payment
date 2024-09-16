import { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import CCard from './components/CCard';
import CButton from './components/CButton';
import CSelect from './components/CSelect';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import CItemField from './components/CItemField';
import CTokenLabel from './components/CTokenLabel';
import CDisclosure from './components/CDisclosure';
import CResultDetail from './components/CResultDetail';
import CConnectWallet from './components/CConnectWallet';
import CRadioButtonGroup from './components/CRadioButtonGroup';

import Method from './utils/Methods';
import useGetOrderData from './utils/getOrderData';
import { tokensToOptions } from './utils/tokensToOptions';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter';

import { OptionType } from './models';

import logoType from '/images/logoType.svg';
import ShoppingCardIcon from './assets/ShoppingCardIcon';
import defaultUserLogo from '../public/images/defaultUserLogo.png';
import clsx from 'clsx';

const methodTabs = ['single', 'stream', 'vesting'];

export default function App() {
  const [selectedToken, setSelectedToken] = useState<OptionType | null>(null);
  const [emailAddress, setEmailAddress] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<string>(
    capitalizeFirstLetter(methodTabs[0]),
  );
  const [emailError, setEmailError] = useState('');

  const { id } = useParams();

  const { loading, loadingTime, data, error } = useGetOrderData(id);

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

  if (loading) {
    return <Loading loadingTime={loadingTime} />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const methods = Method.toString(data.user.methods);

  const tokens = tokensToOptions(data.token);
  const validateField = selectedToken && !emailError;

  const orderTop = (
    <div className="mt-2 space-y-3">
      {data.products?.map((product) => (
        <CCard
          type="detailed"
          title={capitalizeFirstLetter(product.name)}
          subtitle={`X ${product.count}`}
          amount={`$${product.amount.toString()}`}
          totalAmount={`$${product.amount * product.count}`}
          image={product.logo}
        />
      ))}
    </div>
  );

  const orderBottom = (
    <div className="flex space-x-2">
      <CCard type="summary" title="Total Amount" subtitle={`$${data.amount}`} />
      <CCard type="summary" title="Order ID" subtitle={`#${id}`} />
    </div>
  );

  return (
    <div
      className="desktop:center desktop:flex-row flex flex-col justify-start 
      gap-2 p-2 desktop:p-[12px] w-full mobile:h-full tablet:h-full h-[100dvh]"
    >
      <div className="desktop:w-2/5 w-full h-full order-1">
        <div className="relative center flex-col text-offWhite text-center bg-primaryGreen desktop:h-1/3 tablet:!h-[300px] mobile:!h-[300px] desktopMax:h-2/5 h-[260px] rounded-t-[10px]">
          <img src={logoType} alt="Wagent Logo" draggable={false} />
          <p className="text-2xl font-medium mt-[36px] px-4">
            Simple and fast transactions for everyone
          </p>
          <p className="text-xs mt-[16px] w-3/4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="absolute gap-2 shadow-md rounded-[10px] py-2 pl-2 pr-3 inline-flex items-center z-10 -bottom-[30px] min-w-[240px] bg-white text-black">
            <img
              src={data.user.logo ? data.user.logo : defaultUserLogo}
              alt="userLogo"
              width={60}
              height={60}
              className="rounded-[10px] object-cover"
            />
            <p className="font-medium whitespace-nowrap">{capitalizeFirstLetter(data.user.name)}</p>
          </div>
        </div>

        <div className="bg-white tablet:!h-2/3 desktop:h-2/3 desktopMax:h-3/5 desktop:p-8 p-6 space-y-4 rounded-b-[10px] pt-16 overflow-y-auto mobile:overflow-hidden">
          <CDisclosure
            label="Order overview"
            title="Order Details"
            content={orderBottom}
            icon={<ShoppingCardIcon fill="#000" />}
          />

          {data.products && data.products.length > 0 ? (
            <CDisclosure
              title="Order information"
              subTitle={`${data.products.length} Products in your cart`}
              content={orderTop}
              icon={<ShoppingCardIcon fill="#000" />}
            />
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="desktop:w-3/5 w-full h-full order-2 flex flex-col justify-between">
        <div className="desktop:mt-0 mt-14 mobile:mt-3">
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
                <CSelect
                  onChange={handleSelectChange}
                  options={tokens}
                  defaultValue={tokens[1]}
                  placeholder="Select"
                />
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

        <div className="mt-1">
          <CCard
            type="simple"
            title="Payment overview"
            className="!text-2xl desktopMax:py-[18px]"
          />
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
              <CButton variant="bordered" text="Cancel Order" className="desktop:w-[60%]" />
              <CButton
                variant="confirm"
                text="Confirm Payment"
                className={clsx('mobile:h-[44px]', {
                  '!bg-customGray !pointer-events-none !text-lightGrayishBlue': !validateField,
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
