import { useParams } from 'react-router-dom';

import Header from './containers/Header';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import PaymentGatewayMultiStep from './containers/PaymentGatewayMultiStep';

import useGetOrderData from './utils/getOrderData';

import gradient from '../public/images/Rectangle 2871.png';

export default function App() {
  const { id } = useParams();

  const { loading, data, error } = useGetOrderData('66dced5d0a1e1ccd057c0a1c');

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full mobile:h-full tablet:h-full h-[100dvh]">
      <img
        src={gradient}
        alt="gradient"
        draggable={false}
        className="absolute w-full top-0 left-0 right-0 -z-1"
      />

      <Header />

      <div className="h-[520px] desktopMax:h-[480px] z-50 w-full m-auto ">
        <PaymentGatewayMultiStep data={data} orderId={id || ''} />
      </div>
    </div>
  );
}
