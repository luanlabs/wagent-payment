// ConnectButton.js
import { useState } from 'react';
import { useSorobanReact } from '@soroban-react/core';

const ConnectButton = () => {
  const sorobanContext = useSorobanReact();
  const { activeChain, address, disconnect, setActiveConnectorAndConnect, setActiveChain } =
    sorobanContext;
  const activeAccount = address;
  const browserWallets = sorobanContext.connectors;
  const supportedChains = sorobanContext.chains;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConnect = (wallet) => {
    console.log(wallet);

    setActiveConnectorAndConnect && setActiveConnectorAndConnect(wallet);
    setMenuOpen(false);
  };

  const handleChainChange = (chain) => {
    setActiveChain && setActiveChain(chain);
    console.log(`Active chain changed to ${chain.name}`);
    setMenuOpen(false);
  };

  const handleDisconnect = async () => {
    await disconnect();
    console.log('Disconnected');
  };

  return (
    <div className="relative">
      {!activeAccount ? (
        <div>
          <button
            onClick={handleMenuToggle}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
          >
            Connect Wallet
          </button>
          {menuOpen && (
            <div className="absolute mt-2 bg-gray-800 text-white rounded-lg shadow-lg z-10">
              {browserWallets.map((w) => (
                <div
                  key={w.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleConnect(w)}
                >
                  {w.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <button
            onClick={handleMenuToggle}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center"
          >
            <div className="mr-2">
              <div>{activeChain?.name}</div>
              <div className="text-sm opacity-75">{address}</div>
            </div>
          </button>
          {menuOpen && (
            <div className="absolute mt-2 bg-gray-800 text-white rounded-lg shadow-lg z-10">
              {supportedChains.map((chain) => (
                <div
                  key={chain.name}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                  onClick={() => handleChainChange(chain)}
                >
                  <div className="flex items-center">
                    <div>{chain.name}</div>
                    {chain.network === activeChain?.network && 'wwww'}
                  </div>
                </div>
              ))}
              <hr className="border-gray-700 my-2" />
              <div
                className="px-4 py-2 cursor-pointer hover:bg-gray-700 flex items-center"
                onClick={handleDisconnect}
              >
                Disconnect
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectButton;
