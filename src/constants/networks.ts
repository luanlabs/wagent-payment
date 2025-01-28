const networks = {
  stellar: 'Stellar',
  ethereum: 'Ethereum',
  tron: 'Tron',
};

const tokens = {
  usdt: 'USDT',
  usdc: 'USDC',
  xlm: 'XLM',
  eth: 'ETH',
  dai: 'DAI',
  trx: 'TRX',
};

const pairs = [
  {
    network: networks.stellar,
    tokens: [tokens.usdt, tokens.usdc, tokens.xlm],
  },
];

export default pairs;
