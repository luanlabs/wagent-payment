import fetcher, { IResponse } from './fetcher';

export const CancelOrder = async (id: string) => {
  const url = `https://api.wagent.app/orders/${id}`;

  const { data } = await fetcher<IResponse<null>>(url, {
    method: 'DELETE',
  });

  return data;
};

const useCancelOrder = (id: string) => {
  const cancelData = async () => {
    await CancelOrder(id);
  };

  return cancelData;
};

export default useCancelOrder;
