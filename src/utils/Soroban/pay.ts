import BN from '../BN';

import ToScVal from './scVal';
import toDecimals from './toDecimals';
import sorobanSend from './sorobanSend';
import passPhraseToNetworkDetail from './passPhraseToNetworkDetail';

import { IPaymentDetails } from '../../models';

const pay = async (passPhrase: string, address: string, params: IPaymentDetails) => {
  const tokenAddressScVal = ToScVal.address(params.tokenAddress);
  const senderScVal = ToScVal.address(address);
  const receiverScVal = ToScVal.address(params.receiver);
  const amountScVal = ToScVal.i128(toDecimals(new BN(params.amount)));
  const orderIdScVal = ToScVal.string(params.orderId);

  const tx = await sorobanSend(
    address,
    passPhrase,
    passPhraseToNetworkDetail(passPhrase).contract,
    'pay',
    [tokenAddressScVal, senderScVal, receiverScVal, amountScVal, orderIdScVal],
  );

  return tx;
};

export default pay;
