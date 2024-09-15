import { ITokenResponse, OptionType } from '../models';

import defaultTokenLogo from '../../public/images/defaultToken.svg';

export const tokensToOptions = (tokens: ITokenResponse[]): OptionType[] => {
  const mappedTokens = tokens.map((token) => ({
    label: token.symbol.toUpperCase(),
    value: token.address,
    logo: token.logo ? token.logo : defaultTokenLogo,
  }));
  return mappedTokens;
};
