import { useParams } from 'react-router-dom';

import Header from './containers/Header';
import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import Successful from './containers/Successful';
import PaymentGatewayMultiStep from './containers/PaymentGatewayMultiStep';

import gradient from '/images/gradient.png';
import useGetOrderData from './utils/getOrderData';
import calculateRemainingTime from './utils/calculateRemainingTime';

export default function App() {
  const { id } = useParams();

  const { loading, data, error } = useGetOrderData('66dced5d0a1e1ccd057c0a1c');
  const isExpired = !!calculateRemainingTime(data?.expiredTimestamp as number);

  if (loading) {
    return <Loading />;
  }
  const isSuccessful = false;
  // Todo implement is Successful in back so if the order is successful we know here

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
      <div className="static desktop:fixed desktop:top-0 desktop:right-0 desktop:left-0 z-[33]">
        <Header isExpired={isExpired} orderId={id || ''} />
      </div>

      <div className="h-full flex justify-center items-center">
        {isSuccessful ? (
          <Successful
            currency="USDC"
            networkImg="someImg"
            amount="342"
            txHash="66dced5d0a1e1ccd057c0a1c"
            network="stellar"
            token="xlm"
            dateTime="May 25, 2024, 20:13"
            status="completed"
          />
        ) : (
          <div className="h-[520px] desktopMax:h-[480px] z-20 w-full m-auto ">
            <PaymentGatewayMultiStep data={data} orderId={id || ''} />
          </div>
        )}
      </div>
    </div>
  );
}
