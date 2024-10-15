import { TransactionBuilder, Account, xdr, Operation } from '@stellar/stellar-sdk';
import getFee from '../getFee';

const baseTransaction = (
  account: Account,
  passPhrase: string,
  call: xdr.Operation<Operation.InvokeHostFunction>,
) => {
  const fee = getFee();

  let transaction = new TransactionBuilder(account, {
    fee,
    networkPassphrase: passPhrase,
  });

  transaction = transaction.addOperation(call);
  transaction = transaction.setTimeout(30);

  return transaction.build();
};

export default baseTransaction;
