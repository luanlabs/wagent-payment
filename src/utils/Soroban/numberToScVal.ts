import { xdr } from '@stellar/stellar-sdk';
import { Buffer } from 'buffer';

const bigIntToI128 = (bn: bigint): Buffer => {
  let hex = BigInt(bn).toString(16).replace(/^-/, '');
  if (hex.length % 2) {
    hex = `0${hex}`;
  }

  const len = hex.length / 2;
  const u8 = new Uint8Array(len);

  let i = 0;
  let j = 0;

  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  if (bn < BigInt(0)) {
    u8[0] |= 0x80;
  }

  return Buffer.from(u8);
};

const bigNumberFromBytes = (signed: boolean, ...bytes: (string | number | bigint)[]): bigint => {
  let sign = 1;
  if (signed && bytes[0] === 0x80) {
    sign = -1;
    bytes[0] &= 0x7f;
  }
  let b = BigInt(0);
  for (const byte of bytes) {
    b <<= BigInt(8);
    b |= BigInt(byte);
  }
  return b * BigInt(sign);
};

const numberToScVal = (value: bigint) => {
  const b: bigint = value;
  const buf = bigIntToI128(b);

  if (buf.length > 16) {
    throw new Error('BigNumber overflows i128');
  }

  if (b < 0) {
    buf[0] &= 0x7f;
  }

  const padded = Buffer.alloc(16);
  buf.copy(padded, padded.length - buf.length);

  if (b < 0) {
    padded[0] |= 0x80;
  }

  const hi = new xdr.Int64([
    Number(bigNumberFromBytes(false, ...padded.subarray(4, 8))),
    Number(bigNumberFromBytes(false, ...padded.subarray(0, 4))),
  ]);
  const lo = new xdr.Uint64([
    Number(bigNumberFromBytes(false, ...padded.subarray(12, 16))),
    Number(bigNumberFromBytes(false, ...padded.subarray(8, 12))),
  ]);

  const amountSc = xdr.ScVal.scvI128(new xdr.Int128Parts({ lo, hi }));

  return amountSc;
};

export default numberToScVal;
