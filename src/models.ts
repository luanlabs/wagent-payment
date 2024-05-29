export interface OptionType {
  value: string;
  label: string;
  logo: string;
}

export interface ITokenResponse {
  assetCode: string;
  assetIssuer: string;
  logo: string;
}

export interface IPaymentDetailsResponse {
  settings: {
    merchant: {
      address: string;
      name: string;
      logo: string;
    };
    tokens: ITokenResponse[];
    methods: string[];
  };
  order: {
    products: {
      logo: string;
      name: string;
      amount: string;
    }[];
    totalAmount: string;
  };
}
