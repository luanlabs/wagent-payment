import { useParams } from 'react-router-dom';

import Loading from './containers/Loading';
import NotFound from './containers/NotFound';

import Method from './utils/Methods';
import useGetOrderData from './utils/getOrderData';
import { tokensToOptions } from './utils/tokensToOptions';

import PaymentOptions from './containers/PaymentOptions';
import OrderOverview from './containers/OrderOverview';

export default function App() {
  const { id } = useParams();

  const { loading, data, error } = useGetOrderData(id || '');

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  const methods = Method.toString(data.user.methods);
  const tokens = tokensToOptions(data.token);

  return (
    <div
      className="desktop:center desktop:flex-row flex flex-col justify-start 
      gap-2 p-2 desktop:p-[12px] w-full mobile:h-full tablet:h-full h-[100dvh]"
    >
      <OrderOverview data={data} id={id} />
      <PaymentOptions data={data} methods={methods} tokens={tokens} id={id || ''} />
    </div>
  );
}
