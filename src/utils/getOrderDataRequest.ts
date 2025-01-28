import fetcher, { IResponse } from './fetcher';

import { IOrderDetailsResponse } from '../models';

const getOrderDataRequest = async (id: string) => {
  const url = `${import.meta.env.VITE_WAGENT_API}/orders/${id}`;

  const { data, response } = await fetcher<IResponse<IOrderDetailsResponse>>(url);

  return { data, response };
};

export default getOrderDataRequest;
