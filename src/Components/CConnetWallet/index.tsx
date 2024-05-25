// ConnectButton.js
import { useState } from 'react';
import { useSorobanReact } from '@soroban-react/core';
import CButton from '../CButton';
import shortenAddress from '../../utils/shortenAddress';
import { Connector } from '@soroban-react/types';

const ConnectButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const sorobanContext = useSorobanReact();

  const { address, disconnect, setActiveConnectorAndConnect } = sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConnect = (wallet: Connector) => {
    try {
      setActiveConnectorAndConnect && setActiveConnectorAndConnect(wallet);
      setMenuOpen(false);
    } catch {
      console.log('error');
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    console.log('Disconnected');
  };

  return (
    <div className="relative">
      {!activeAccount ? (
        <div>
          {browserWallets.map((w) => (
            <CButton key={w.name} text="Connect wallet" onClick={() => handleConnect(w)} />
          ))}
        </div>
      ) : (
        <div>
          <CButton text={shortenAddress(address, 5)} onClick={handleMenuToggle} />
          {menuOpen && (
            <div
              className="px-4 py-2 cursor-pointer bg-gray-100 mt-2 rounded flex items-center"
              onClick={handleDisconnect}
            >
              Disconnect
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
