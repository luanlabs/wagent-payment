import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loading from './containers/Loading';
import NotFound from './containers/NotFound';
import PaymentGatewayMultiStep from './containers/PaymentGatewayMultiStep';

import { useAppSelector } from './hooks/useRedux';
import getOrderData from './hooks/useOrderData';

import gradient from '/images/gradient.png';

export default function App() {
  const { id } = useParams();

  useEffect(() => {
    getOrderData(id);
  }, [id]);

  const { loading, data, error } = useAppSelector((state) => state.data);

  if (loading) {
    return <Loading />;
  }

  if (error || !data) {
    return <NotFound />;
  }

  return (
    <div className="w-full mobile:h-full tablet:h-full h-screen">
      <img
        src={gradient}
        alt="gradient"
        draggable={false}
        className="absolute w-full top-0 left-0 right-0"
      />
      <div className="w-full m-auto z-[5]">
        <PaymentGatewayMultiStep data={data} orderId={id || ''} />
      </div>
    </div>
  );
}
