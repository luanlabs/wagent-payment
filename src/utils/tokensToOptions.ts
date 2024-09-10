import { ITokenResponse, OptionType } from '../models';

export const tokensToOptions = (tokens: ITokenResponse[]): OptionType[] => {
  const mappedTokens = tokens.map((token) => ({
    label: token.symbol.toUpperCase(),
    value: token.address,
    logo: token.logo,
  }));
  return mappedTokens;
};
