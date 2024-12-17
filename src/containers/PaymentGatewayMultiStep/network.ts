import { OptionType } from '../../models';

import stellarNetworkLogo from '../../../public/images/stellar.svg';

export interface ITokensByNetwork {
  network: OptionType;
  tokens: OptionType[];
}

export const networks = {
  stellar: {
    value: 'stellar',
    label: 'Stellar',
    logo: stellarNetworkLogo,
  },
};

const tokens = {
  usdt: {
    value: 'usdt',
    label: 'USDT',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  },
  usdc: {
    value: 'usdc',
    label: 'USDC',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
  },
  xlm: {
    value: 'xlm',
    label: 'XLM',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/512.png',
  },
};

export const tokensByNetwork: ITokensByNetwork[] = [
  {
    network: networks.stellar,
    tokens: [tokens.xlm, tokens.usdt, tokens.usdc],
  },
];
