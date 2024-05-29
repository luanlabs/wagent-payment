import { ITokenResponse, OptionType } from '../models';

export const tokensToOptions = (tokens: ITokenResponse[]): OptionType[] => {
  const mappedTokens = tokens.map((token) => ({
    label: token.assetCode.toUpperCase(),
    value: token.assetCode + ':' + token.assetIssuer,
    logo: token.logo,
  }));
  return mappedTokens;
};
