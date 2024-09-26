import { xdr, Address } from '@stellar/stellar-sdk';

import numberToScVal from './numberToScVal';

const { scvU32, scvU64, scvSymbol, scvString } = xdr.ScVal;

class ToScVal {
  public static i128(value: bigint) {
    return numberToScVal(value);
  }
  public static u32(number: number) {
    return scvU32(number);
  }
  public static address(address: string) {
    return Address.fromString(address).toScVal();
  }
  public static u64(number: string) {
    return scvU64(xdr.Uint64.fromString(number));
  }
  public static symbol(symbol: string) {
    return scvSymbol(symbol);
  }
  public static string(symbol: string) {
    return scvString(symbol);
  }
}

export default ToScVal;
