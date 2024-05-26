import React from 'react';
import { SorobanReactProvider } from '@soroban-react/core';
import { futurenet, sandbox, standalone, testnet } from '@soroban-react/chains';
import { freighter } from '@soroban-react/freighter';
import type { ChainMetadata, Connector } from '@soroban-react/types';

const chains: ChainMetadata[] = [sandbox, standalone, futurenet, testnet];
const connectors: Connector[] = [freighter()];

const SorobanProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SorobanReactProvider
      chains={chains}
      appName={'Wagent Payment'}
      activeChain={testnet}
      connectors={connectors}
    >
      {children}
    </SorobanReactProvider>
  );
};

export default SorobanProvider;
