import { useParams } from 'react-router-dom';

import Header from './containers/Header';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import PaymentGatewayMultiStep from './containers/PaymentGatewayMultiStep';

import useGetOrderData from './utils/getOrderData';

import gradient from '../public/images/Rectangle 2871.png';
import calculateRemainingTime from './utils/calculateRemainingTime';

export default function App() {
  const { id } = useParams();

  const { loading, data, error } = useGetOrderData('66dced5d0a1e1ccd057c0a1c');
  const isExpired = calculateRemainingTime(data?.expiredTimestamp as number) ? true : false;
  if (loading) {
    return <Loading />;
  }

  console.log(data);
  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full mobile:h-full tablet:h-full h-screen">
      <img
        src={gradient}
        alt="gradient"
        draggable={false}
        className="absolute w-full top-0 left-0 right-0 -z-1"
      />
      <div className="static desktop:fixed desktop:top-0 desktop:right-0 desktop:left-0 z-40">
        <Header isExpired={isExpired} orderId={id || ''} />
      </div>

      <div className="h-full flex justify-center items-center">
        <div className="h-[520px] desktopMax:h-[480px] z-30 w-full m-auto ">
          <PaymentGatewayMultiStep data={data} orderId={id || ''} />
        </div>
      </div>
    </div>
  );
}
