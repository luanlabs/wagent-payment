import CDisclosure from './components/CDisclosure';
import CCard from './components/CCard';
import ShoppingCardIcon from './assets/ShoppingCardIcon';

import Hoodie from '../public/images/hoodi.png';

export default function App() {
  const orderTop = (
    <div className="mt-2 space-y-3">
      <CCard type="detailed" title="Purple Hoodie" subtitle="$15.00" image={Hoodie} />
      <CCard type="detailed" title="Purple Hoodie" subtitle="$15.00" image={Hoodie} />
    </div>
  );

  const orderBottom = (
    <div className="flex space-x-2">
      <CCard type="summary" title="Total Amount" subtitle="$40.00" />
      <CCard type="summary" title="Order ID" subtitle="#1321451234142" />
    </div>
  );

  return (
    <>
      <h1 className="text-3xl font-normal">Wagent</h1>
      <h1 className="text-3xl font-medium">Wagent</h1>
      <h1 className="text-3xl font-semibold">Wagent</h1>

      <div className="w-[556px] m-4 bg-white p-4">
        <CDisclosure
          title="Order information"
          subTitle="2 Products in your cart"
          content={orderTop}
          icon={<ShoppingCardIcon fill="#000" />}
          label="Order overview"
        />
      </div>

      <div className="w-[556px] m-4 bg-white p-4">
        <CDisclosure
          title="Order Details"
          content={orderBottom}
          icon={<ShoppingCardIcon fill="#000" />}
        />
      </div>

      <div className="w-[556px] p-6">
        <div className="bg-white p-2">
          <CCard type="detailed" title="Purple Hoodie" subtitle="$15.00" image={Hoodie} />
        </div>

        <CCard type="simple" title="Payment overview" className="mt-3" />

        <div className="mt-3 w-[270px]">
          <CCard type="summary" title="Total amount" subtitle="$40.000" />
        </div>
      </div>
    </>
  );
}
