import { useEffect, useState } from 'react';

import fetcher, { IResponse } from './fetcher';
import { IPaymentDetailsResponse } from '../models';

export type OrderDataType = {
  loading: boolean;
  loadingTime: number;
  data: null | IPaymentDetailsResponse;
  error: null | boolean;
};

export const getOrderData = async (id: string) => {
  const url = `https://api.wagent.app/orders/${id}`;

  const { data } = await fetcher<IResponse<IPaymentDetailsResponse>>(url);

  return data.result;
};

const useGetOrderData = (id: string | undefined) => {
  const [orderData, setOrderData] = useState<OrderDataType>({
    loading: true,
    loadingTime: 0,
    data: null,
    error: false,
  });

  useEffect(() => {
    let loadingTime = new Date().getTime();
    const data = () => {
      if (!id) {
        return setOrderData({
          loading: false,
          loadingTime: 0,
          data: null,
          error: true,
        });
      }
      getOrderData(id)
        .then((order) => {
          loadingTime = new Date().getTime() - loadingTime;

          setOrderData({
            loading: false,
            loadingTime,
            data: order,
            error: false,
          });
        })
        .catch(() => {
          setOrderData({
            loading: false,
            loadingTime: 0,
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
