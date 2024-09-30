import { useEffect, useState } from 'react';
import freighterApi from '@stellar/freighter-api';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

import CButton from '../CButton';
import ErrorModal from '../Modals/ErrorModal';

import shortenAddress from '../../utils/shortenAddress';
import copyToClipboard from '../../utils/copyToClipboard';

import ArrowRightStartOnRectangleIcon from '../../assets/ArrowRightStartOnRectangleIcon';
import SquareStackIcon from '../../assets/SquareStackIcon';

interface ConnectButtonProps {
  onAddressChange?: (address: string) => void;
}

const ConnectButton = ({ onAddressChange }: ConnectButtonProps) => {
  const [address, setAddress] = useState<string>('');
  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  useEffect(() => {
    if (onAddressChange) {
      onAddressChange(address);
    }
  }, [address, onAddressChange]);

  const handleConnect = async () => {
    if (address) {
      return;
    }

    freighterApi.isConnected().then((isConnected) => {
      if (!isConnected) {
        setErrorModal({
          isOpen: true,
          title: 'Error',
          message: 'Freighter is not installed',
        });
      }
    });

    try {
      await freighterApi.requestAccess();

      const publicKey = await freighterApi.getPublicKey();
      setAddress(publicKey);
    } catch {
      setErrorModal({
        isOpen: true,
        title: 'Error',
        message: 'Freighter Not Connected',
      });
    }
  };

  const handleDisconnect = () => {
    setAddress('');
  };

  const handleCopy = () => {
    copyToClipboard(address);
  };

  const btnStyle = `flex justify-between items-center hover:bg-white text-left`;
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
              anchor="left"
              className="flex flex-col p-2 space-y-2 mt-6 -ml-1 w-[180px] text-left text-[13px] bg-[#f4f5f7b8] rounded-[10px]"
            >
              <MenuItem>
                <CButton variant="simple" className={btnStyle} onClick={handleCopy}>
                  <p>{shortAddress}</p>
                  <SquareStackIcon fill="#000" />
                </CButton>
              </MenuItem>
              <MenuItem>
                <CButton variant="simple" className={btnStyle} onClick={handleDisconnect}>
                  Disconnect
                  <ArrowRightStartOnRectangleIcon fill="#000" />
                </CButton>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      )}

      <ErrorModal
        title={errorModal.title}
        message={errorModal.message}
        isOpen={errorModal.isOpen}
        onClose={() => setIsErrorModalIsOpen(false)}
      />
    </div>
  );
};

export default ConnectButton;
