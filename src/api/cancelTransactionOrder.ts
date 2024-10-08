import { ExternalPages } from '../constants/externalPages';
import fetcher from '../utils/fetcher';

const cancelTransactionOrder = async (id: string) => {
  await fetcher(ExternalPages.WAGENT_API + `/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default cancelTransactionOrder;
