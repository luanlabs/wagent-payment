import { useEffect, useState } from 'react';

import fetcher, { IResponse } from './fetcher';
import { IPaymentDetailsResponse } from '../models';

export type OrderDataType = {
  loading: boolean;
  data: null | IPaymentDetailsResponse;
  error: null | boolean;
};

export const getOrderData = async (id: string) => {
  const url = `https://api.wagent.app/orders/${id}`;

  const { data } = await fetcher<IResponse<IPaymentDetailsResponse>>(url);

  return data.result;
};

const useGetOrderData = (id: string) => {
  const [orderData, setOrderData] = useState<OrderDataType>({
    loading: true,
    data: null,
    error: false,
  });

  useEffect(() => {
    const data = () => {
      getOrderData(id)
        .then((order) => {
          setOrderData({
            loading: false,
            data: order,
            error: false,
          });
        })
        .catch(() => {
          setOrderData({
            loading: false,
            data: null,
            error: true,
          });
        });
    };

    data();
  }, [id]);

  return orderData;
};

export default useGetOrderData;
