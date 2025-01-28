export interface OptionType {
  value: string;
  label: string;
  logo: string;
}

export interface iconProps {
  fill: string;
}

export interface IOrderTokens {
  token: ITokenResponse;
  amount: string;
}

export interface ITokenResponse {
  symbol: string;
  address: string;
  logo: string;
}

interface IProducts {
  count: number;
  amount: number;
  logo?: string;
  name: string;
}

interface IUser {
  name: string;
  logo?: string;
}

export type StatusType = 'pending' | 'completed' | 'expired' | 'cancelled' | 'success';

export interface IOrderDetailsResponse {
  memo: string;
  user: IUser;
  amount: string;
  currency: string;
  status: StatusType;
  redirectUrl: string;
  tokens: IOrderTokens[];
  products?: IProducts[];
  expiredTimestamp: number;
  transaction?: ITransactionDetails;
}

export type SvgProps = {
  fill?: string;
  width?: string;
  height?: string;
};

export interface IPaymentDetails {
  sender: string;
  receiver: string;
  tokenAddress: string;
  amount: string;
  orderId: string;
  redirectUrl: string;
}

export interface IApiResponse<T> {
  loading: boolean;
  data: null | T;
  error: null | boolean;
}

export interface ITransactionDetails {
  hash: string;
  method: string;
  payerEmail?: string;
  submittedAt: number;
  payerAddress: string;
  successful: boolean;
  amount: string;
  token: ITokenResponse;
}
