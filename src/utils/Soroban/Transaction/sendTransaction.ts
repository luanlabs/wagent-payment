import { Memo, MemoType, Operation, Transaction } from '@stellar/stellar-sdk';
import getServer from '../getServer';

const sendTransaction = async (signedXDR: Transaction<Memo<MemoType>, Operation[]>) => {
  const { soroban: server } = getServer();

  // eslint-disable-next-line prefer-const
  let tx = await server.sendTransaction(signedXDR);

  return tx;
};

export default sendTransaction;
