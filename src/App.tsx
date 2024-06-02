import CSelect from './components/CSelect';
import useGetPaymentDetails from './hooks/useGetPaymentDetails';
import { tokensToOptions } from './utils/tokensToOptions';

import { OptionType } from './models';
import CButton from './components/CButton';
import CConnectWallet from './components/CConnectWallet';
import CRadioButtonGroup from './components/CRadioButtonGroup';

export default function App() {
  const handleSelectChange = (item: OptionType | null) => {
    console.log(item?.value);
  };

  const data = useGetPaymentDetails('1');

  if (!data) {
    return <p>Loading!</p>;
  }
  const tokens = tokensToOptions(data.settings.tokens);

  const tabs = [
    { value: 'stream', label: 'Stream' },
    { value: 'single', label: 'Single' },
    { value: 'vesting', label: 'Vesting' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="flex justify-between items-center">
        <span>
          <p className="text-xl font-medium"> Select token</p>
          <p className="text-lg text-cadetBlue">
            Choose the token you'd like to make transaction with
          </p>
        </span>
        <div className="w-1/4">
          <CSelect onChange={handleSelectChange} options={tokens} />
        </div>
      </div>
      <div className="p-4">
        <div className="w-[247px]">
          <CConnectWallet />
        </div>

        <div className="flex w-[50%] space-x-2 mt-2">
          <CButton variant="bordered" text="Cancel Order" className="w-[50%]" />
          <CButton variant="confirm" text="Confirm Payment" />
        </div>
        <div className="w-[300px]">
          <CRadioButtonGroup tabs={tabs} defaultSelectedTab={tabs[0].value} />
        </div>
      </div>
    </div>
  );
}
