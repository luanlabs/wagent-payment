import fetcher from '../utils/fetcher';

interface IConfirmedTransactionBody {
  hash: string;
  payerEmail?: string;
}

const sendConfirmedTransaction = async (id: string, hash: string, payerEmail: string) => {
  const body: IConfirmedTransactionBody = { hash };

  if (payerEmail) {
    body.payerEmail = payerEmail;
  }

  await fetcher(import.meta.env.VITE_WAGENT_API + `/orders/${id}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};

export default sendConfirmedTransaction;
