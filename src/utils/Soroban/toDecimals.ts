import BigNumber from 'bignumber.js';
import BN from '../BN';

const toDecimals = (amount: BigNumber): bigint => {
  const value = new BN(amount).times(10 ** 7).toFixed(0);

  return BigInt(value);
};

export default toDecimals;
