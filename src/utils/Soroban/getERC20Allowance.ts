import ToScVal from './scVal';
import sorobanCall from './sorobanCall';

const getERC20Allowance = async (
  contractAddress: string,
  passPhrase: string,
  owner: string,
  spenderAddress: string,
) => {
  const from = ToScVal.address(owner);
  const spender = ToScVal.address(spenderAddress);

  const retval = await sorobanCall<bigint>(owner, passPhrase, contractAddress, 'allowance', [
    from,
    spender,
  ]);

  return retval.toString();
};

export default getERC20Allowance;
