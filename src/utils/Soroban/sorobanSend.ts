import { Contract, xdr } from '@stellar/stellar-sdk';

import createTransaction from './Transaction/baseTransaction';
import getServer from './getServer';

const sorobanSend = async (
  user: string,
  passPhrase: string,
  contractAddress: string,
  callSignature: string,
  callParameters?: xdr.ScVal[],
) => {
  const { soroban: server } = getServer();
  const account = await server.getAccount(user);

  const contract = new Contract(contractAddress);

  let call = contract.call(callSignature);

  if (callParameters) {
    call = contract.call(callSignature, ...callParameters);
  }

  const xdr = createTransaction(account, passPhrase, call);

  return await server.prepareTransaction(xdr);
};

export default sorobanSend;
