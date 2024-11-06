import { useParams } from 'react-router-dom';

import Loading from './containers/Loading';
import NotFound from './containers/NotFound';

import useGetOrderData from './utils/getOrderData';
import { tokensToOptions } from './utils/tokensToOptions';

export default function App() {
  // const { id } = useParams();

  // const { loading, data, error } = useGetOrderData(id || '');

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error || !data) {
  //   return <NotFound />;
  // }

  // const tokens = tokensToOptions(data.token);

  return (
    <div className="w-full mobile:h-full tablet:h-full h-[100dvh]">
      {/* <OrderOverview data={data} id={id} />
      <PaymentOptions data={data} methods={methods} tokens={tokens} id={id || ''} /> */}
    </div>
  );
}
