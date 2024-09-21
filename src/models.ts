import { MethodsNumerical } from './utils/Methods';

export interface OptionType {
  value: string;
  label: string;
  logo: string;
}

export interface iconProps {
  fill: string;
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
  methods: MethodsNumerical;
  logo?: string;
}

export type StatusType = 'pending' | 'complete' | 'expired';

export interface IPaymentDetailsResponse {
  amount: string;
  token: ITokenResponse[];
  user: IUser;
  status: StatusType;
  expiredTimestamp: number;
  products?: IProducts[];
  redirectUrl: string;
}
