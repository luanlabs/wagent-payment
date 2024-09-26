import { Contract, xdr, scValToNative } from '@stellar/stellar-sdk';
import { Api } from '@stellar/stellar-sdk/rpc';

import createTransaction from './Transaction/baseTransaction';
import getServer from './getServer';

const sorobanCall = async <T>(
  user: string,
  passPhrase: string,
  contractAddress: string,
  callSignature: string,
  callParameters?: xdr.ScVal[],
) => {
  const { soroban: server } = getServer(passPhrase);
  const account = await server.getAccount(user);
  const contract = new Contract(contractAddress);

  let call = contract.call(callSignature);

  if (callParameters) {
    call = contract.call(callSignature, ...callParameters);
  }

  const transactionResult = createTransaction(account, passPhrase, call);

  const txSimulate = await server.simulateTransaction(transactionResult);

  if (!Api.isSimulationSuccess(txSimulate)) {
    throw Error('Failed to fetch data');
  }

  if (!txSimulate.result?.retval) {
    throw Error('No data returned');
  }

  // eslint-disable-next-line prefer-const
  let retval: T = scValToNative(txSimulate.result.retval);

  return retval;
};

export default sorobanCall;
