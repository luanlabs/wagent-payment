import { Futurenet, Mainnet, Testnet } from '../../constants/networks';

const passPhraseToNetworkDetail = (passPhrase: string) => {
  if (passPhrase === Mainnet.networkPassphrase) {
    return {
      network: 'mainnet',
      contract: Mainnet.contract,
      sorobanRPC: Mainnet.sorobanRpcUrl,
      horizonRPC: Mainnet.networkUrl,
    };
  } else if (passPhrase === Futurenet.networkPassphrase) {
    return {
      network: 'futurenet',
      contract: Futurenet.contract,
      sorobanRPC: Futurenet.sorobanRpcUrl,
      horizonRPC: Futurenet.networkUrl,
    };
  }

  return {
    network: 'testnet',
    contract: Testnet.contract,
    sorobanRPC: Testnet.sorobanRpcUrl,
    horizonRPC: Testnet.networkUrl,
  };
};

export default passPhraseToNetworkDetail;
