import fetcher from '../utils/fetcher';

const sendConfirmedTransaction = async (id: string, hash: string, payerEmail: string) => {
  await fetcher(import.meta.env.VITE_WAGENT_API + `/orders/${id}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hash: hash,
      payerEmail: payerEmail,
    }),
  });
};

export default sendConfirmedTransaction;
