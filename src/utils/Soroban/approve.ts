import BigNumber from 'bignumber.js';

import ToScVal from './scVal';
import getServer from './getServer';
import toDecimals from './toDecimals';
import sorobanSend from './sorobanSend';
import Testnet from '../../constants/networks';

const approve = async (
  contractAddress: string,
  passPhrase: string,
  address: string,
  amount: BigNumber,
) => {
  const { soroban: server } = getServer();
  const { sequence } = await server.getLatestLedger();

  const from = ToScVal.address(address);
  const spender = ToScVal.address(Testnet.contract);
  const amountScVal = ToScVal.i128(toDecimals(amount));
  const expirationLedger = ToScVal.u32(sequence + 1000);

  const tx = await sorobanSend(address, passPhrase, contractAddress, 'approve', [
    from,
    spender,
    amountScVal,
    expirationLedger,
  ]);

  return tx;
};

export default approve;
