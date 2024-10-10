import { Horizon, SorobanRpc } from '@stellar/stellar-sdk';
import Testnet from '../../constants/networks';

const getServer = () => {
  return {
    soroban: new SorobanRpc.Server(Testnet.sorobanRpcUrl),
    horizon: new Horizon.Server(Testnet.networkUrl),
  };
};
export default getServer;
