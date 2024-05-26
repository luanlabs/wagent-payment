// ConnectButton.js
import { Connector } from '@soroban-react/types';
import { useSorobanReact } from '@soroban-react/core';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon, Square2StackIcon } from '@heroicons/react/16/solid';

import CButton from '../CButton';
import shortenAddress from '../../utils/shortenAddress';
import copyToClipboard from '../../utils/copyToClipboard';

const ConnectButton = () => {
  const sorobanContext = useSorobanReact();

  const { address, disconnect, setActiveConnectorAndConnect } = sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;

  const handleConnect = (wallet: Connector) => {
    try {
      setActiveConnectorAndConnect && setActiveConnectorAndConnect(wallet);
    } catch {
      console.log('error');
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
  };

  const handleCopy = () => {
    if (activeAccount) {
      copyToClipboard(address);
    }
  };

  const Btnstyle = `flex justify-between items-center hover:bg-[#fff] text-left`;

  return (
    <div className="relative">
      {!activeAccount ? (
        <div>
          {browserWallets.map((w) => (
            <CButton
              key={w.name}
              text="Connect wallet"
              variant="bordered"
              onClick={() => handleConnect(w)}
            />
          ))}
        </div>
      ) : (
        <div>
          <Menu>
            <MenuButton className={`w-full`}>
              <CButton text={shortenAddress(address, 5)} variant="bordered" />
            </MenuButton>
            <Transition
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <MenuItems
                anchor="right"
                className="flex flex-col p-2 space-y-2 ml-3 mt-6 bg- w-[160px] text-left text-[12px] bg-[#f4f5f7b8] rounded-md"
              >
                <MenuItem>
                  <CButton variant="simple" className={Btnstyle} onClick={handleCopy}>
                    <p>Copy Address</p>
                    <Square2StackIcon className="size-4 fill-black" />
                  </CButton>
                </MenuItem>
                <MenuItem>
                  <CButton variant="simple" onClick={handleDisconnect} className={Btnstyle}>
                    Disconnect
                    <ArrowLeftEndOnRectangleIcon className="size-4 fill-black" />
                  </CButton>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
