import fetcher from '../utils/fetcher';

const cancelTransactionOrder = async (id: string) => {
  await fetcher(import.meta.env.VITE_WAGENT_API + `/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default cancelTransactionOrder;
