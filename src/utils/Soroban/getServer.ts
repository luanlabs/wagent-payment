import { Horizon, SorobanRpc } from '@stellar/stellar-sdk';
import passPhraseToNetworkDetail from './passPhraseToNetworkDetail';

const getServer = (passPhrase: string) => {
  const { sorobanRPC, horizonRPC } = passPhraseToNetworkDetail(passPhrase);

  return {
    soroban: new SorobanRpc.Server(sorobanRPC),
    horizon: new Horizon.Server(horizonRPC),
  };
};
export default getServer;
