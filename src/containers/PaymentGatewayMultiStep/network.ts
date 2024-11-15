import { OptionType } from '../../models';

export const networks: OptionType[] = [
  {
    value: 'stellar',
    label: 'Stellar',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/512.png',
  },
  {
    value: 'ethereum',
    label: 'Ethereum',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
];

export const tokensByNetwork: Record<string, OptionType[]> = {
  stellar: [
    {
      value: 'usdt',
      label: 'USDT',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    },
    {
      value: 'usdc',
      label: 'USDC',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
    },
  ],
  ethereum: [
    {
      value: 'eth',
      label: 'ETH',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    },
    {
      value: 'dai',
      label: 'DAI',
      logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
    },
  ],
};
