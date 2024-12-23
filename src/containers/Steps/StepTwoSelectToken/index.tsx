import { useEffect } from 'react';
import clsx from 'clsx';

import CSelect from '../../../components/CSelect';
import StepWrapper from '../../../components/StepWrapper';
import CRadioButton from '../../../components/CRadioButton';

import { IOrderTokens, ITokenResponse, OptionType } from '../../../models';
import { networks as availableNetwork } from '../../PaymentGatewayMultiStep/network';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  tokens: IOrderTokens[];
  selectedNetwork: OptionType | null;
  setSelectedNetwork: (network: OptionType | null) => void;
  setSelectedToken: (token: ITokenResponse | null) => void;
  selectedToken: ITokenResponse | null;
}

const StepTwoSelectToken = ({
  nextStep,
  prevStep,
  tokens,
  selectedNetwork,
  setSelectedNetwork,
  selectedToken,
  setSelectedToken,
}: StepTwoProps) => {
  const networks = [availableNetwork.stellar];

  const selectableTokens = tokens.map((token) => token.token);

  useEffect(() => {
    if (!selectedNetwork) {
      const defaultNetwork = networks.find((network) => network.value === 'stellar');
      setSelectedNetwork(defaultNetwork || null);
    }
  }, [selectedNetwork, setSelectedNetwork]);

  const handleNetworkChange = (network: OptionType | null) => {
    setSelectedNetwork(network);
    setSelectedToken(null);
  };

  const handleTokenChange = (token: ITokenResponse) => {
    setSelectedToken(token);
  };

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

        {selectableTokens && selectableTokens.length > 0 && (
          <div className="flex flex-col mt-4 border border-1 border-[#F2F4F7] bg-[#FCFCFD] p-4 rounded-lg space-y-2">
            {selectableTokens.map((token) => (
              <CRadioButton
                key={token.symbol}
                name="token"
                type="secondary"
                value={token.symbol}
                checked={selectedToken?.symbol === token.symbol}
                onChange={() => handleTokenChange(token)}
                label={
                  <div className="w-full flex items-center">
                    <img src={token.logo} alt={token.symbol} className="w-5 h-5 mr-2" />
                    <span className="text-base font-[Aeonik-m]">{token.symbol.toUpperCase()}</span>
                  </div>
                }
                className={clsx(
                  'w-full flex items-center justify-between flex-row-reverse py-[10px] px-3 cursor-pointer rounded-[10px] bg-white border-[1.7px] border-[#D0D5DD]',
                  { '!border-[#073834]': selectedToken?.symbol === token.symbol },
                )}
              />
            ))}
          </div>
        )}
      </div>
    </StepWrapper>
  );
};

export default StepTwoSelectToken;
