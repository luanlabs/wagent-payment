import { useState } from 'react';

import freighterApi from '@stellar/freighter-api';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import CButton from '../CButton';
import shortenAddress from '../../utils/shortenAddress';
import copyToClipboard from '../../utils/copyToClipboard';

import { ArrowRightStartOnRectangleIcon, SquareStackIcon } from './icons';

const ConnectButton = () => {
  const [address, setAddress] = useState<string>('');

  const handleConnect = async () => {
    if (address) {
      return;
    }

    freighterApi.isConnected().then((isConnected) => {
      if (!isConnected) {
        console.log('Freighter is not installed');
      }
    });

    try {
      await freighterApi.requestAccess();

      const publicKey = await freighterApi.getPublicKey();
      setAddress(publicKey);
    } catch {
      console.log('Freighter not connected');
    }
  };

  const handleDisconnect = () => {
    setAddress('');
  };

  const handleCopy = () => {
    copyToClipboard(address);
  };

  const Btnstyle = `flex justify-between items-center hover:bg-[#fff] text-left`;
  const shortAddress = shortenAddress(address, 5);

  return (
    <div>
      {!address ? (
        <CButton text="Connect wallet" variant="bordered" onClick={handleConnect} />
      ) : (
        <Menu>
          <MenuButton className="w-full">
            <CButton text={shortAddress} variant="bordered" />
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
                  <p>{shortAddress}</p>
                  <SquareStackIcon fill="#000" />
                </CButton>
              </MenuItem>
              <MenuItem>
                <CButton variant="simple" className={Btnstyle} onClick={handleDisconnect}>
                  Disconnect
                  <ArrowRightStartOnRectangleIcon fill="#000" />
                </CButton>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      )}
    </div>
  );
};

export default ConnectButton;
