import { useEffect } from 'react';
import clsx from 'clsx';

import CSelect from '../../../components/CSelect';
import StepWrapper from '../../../components/StepWrapper';
import CRadioButton from '../../../components/CRadioButton';

import { OptionType } from '../../../models';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  networks: OptionType[];
  tokensByNetwork: Record<string, OptionType[]>;
  selectedNetwork: OptionType | null;
  setSelectedNetwork: (network: OptionType | null) => void;
  selectedToken: OptionType | null;
  setSelectedToken: (token: OptionType | null) => void;
}

const StepTwo = ({
  nextStep,
  prevStep,
  networks,
  tokensByNetwork,
  selectedNetwork,
  setSelectedNetwork,
  selectedToken,
  setSelectedToken,
}: StepTwoProps) => {
  useEffect(() => {
    if (!selectedNetwork) {
      const defaultNetwork = networks.find((network) => network.value === 'stellar');
      setSelectedNetwork(defaultNetwork || null);
    }
  }, [selectedNetwork, networks, setSelectedNetwork]);

  const handleNetworkChange = (network: OptionType | null) => {
    setSelectedNetwork(network);
    setSelectedToken(null);
  };

  const handleTokenChange = (token: OptionType) => {
    setSelectedToken(token);
  };

  const tokens = selectedNetwork
    ? tokensByNetwork[selectedNetwork.value]
    : tokensByNetwork['stellar'];

  return (
    <StepWrapper
      title="Select Network & Token"
      nextStep={nextStep}
      prevStep={prevStep}
      disable={!selectedToken}
    >
      <div className="space-y-4">
        <div className="flex justify-between items-center mt-9">
          <span className="w-[40%] font-[Aeonik-m] mobile:text-[15px]">Select Network</span>
          <div className="w-[40%] desktopMax:w-[45%] mobile:!w-[60%]">
            <CSelect
              value={selectedNetwork || networks[0]}
              options={networks}
              placeholder="Select Network"
              onChange={handleNetworkChange}
            />
          </div>
        </div>

        {tokens.length > 0 && (
          <div className="flex flex-col mt-4 border border-1 border-[#F2F4F7] bg-[#FCFCFD] p-4 rounded-lg space-y-2">
            {tokens.map((token) => (
              <CRadioButton
                key={token.value}
                name="token"
                type="secondary"
                value={token.value}
                checked={selectedToken?.value === token.value}
                onChange={() => handleTokenChange(token)}
                label={
                  <div className="w-full flex items-center">
                    <img src={token.logo} alt={token.label} className="w-5 h-5 mr-2" />
                    <span className="text-base font-[Aeonik-m]">{token.label}</span>
                  </div>
                }
                className={clsx(
                  'w-full flex items-center justify-between flex-row-reverse py-[10px] px-3 cursor-pointer rounded-[10px] bg-white border-[1.7px] border-[#D0D5DD]',
                  { '!border-[#073834]': selectedToken?.value === token.value },
                )}
              />
            ))}
          </div>
        )}
      </div>
    </StepWrapper>
  );
};

export default StepTwo;
