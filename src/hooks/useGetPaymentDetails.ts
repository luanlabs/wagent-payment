import { useEffect, useState } from 'react';
import { IPaymentDetailsResponse } from '../models';

const useGetPaymentDetails = (_: string) => {
  const [data, setData] = useState<IPaymentDetailsResponse | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setData({
        settings: {
          merchant: {
            address: '0x012114',
            name: 'LuanShop',
            logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
          },
          tokens: [
            {
              assetCode: 'xlm',
              assetIssuer: '0x012242',
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
            },
            {
              assetCode: 'usdc',
              assetIssuer: '0x012143',
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
            },
            {
              assetCode: 'usdt',
              assetIssuer: '0x012644',
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
            },
          ],
          methods: ['single', 'stream', 'vesting'],
        },
        order: {
          products: [
            {
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
              name: 'Nft',
              amount: '12',
            },
            {
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
              name: 'Nft',
              amount: '12',
            },
            {
              logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
              name: 'Nft',
              amount: '12',
            },
          ],
          totalAmount: '12',
        },
      });
    }, 500);
  }, []);

  return data;
};

export default useGetPaymentDetails;
