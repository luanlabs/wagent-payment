import BN from '../../utils/BN';

import CCard from '../../components/CCard';
import CDisclosure from '../../components/CDisclosure';
import CountdownTimer from '../../components/CountdownTimer';

import { IPaymentDetailsResponse } from '../../models';

import humanizeAmount from '../../utils/humanizeAmount';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';

import logoType from '/images/logoType.svg';
import defaultUserLogo from '/images/defaultUserLogo.png';
import ShoppingCardIcon from '../../assets/ShoppingCardIcon';

interface OrderOverviewProps {
  data: IPaymentDetailsResponse;
  id?: string;
}

const OrderOverview = ({ data, id }: OrderOverviewProps) => {
  const orderTop = (
    <div className="mt-2 space-y-3">
      {data.products?.map((product) => (
        <CCard
          key={product.name}
          type="detailed"
          title={capitalizeFirstLetter(product.name)}
          subtitle={`X ${product.count}`}
          amount={`$${humanizeAmount(product.amount.toString())}`}
          totalAmount={`$${BN(product.amount).times(product.count)}`}
          image={product.logo}
        />
      ))}
    </div>
  );

  const orderBottom = (
    <div className="flex space-x-2">
      <CCard type="summary" title="Total Amount" subtitle={`$${humanizeAmount(data.amount)}`} />
      <CCard type="summary" title="Order ID" subtitle={`#${id}`} />
    </div>
  );

  return (
    <div className="desktop:w-2/5 w-full h-full order-1">
      <div className="relative center flex-col text-offWhite text-center bg-primaryGreen desktop:h-1/3 tablet:!h-[300px] mobile:!h-[300px] desktopMax:h-2/5 h-[260px] rounded-t-[10px]">
        {data.status === 'pending' && (
          <div className="absolute top-0 left-0">
            <CountdownTimer expiredTimeStamp={data.expiredTimestamp} />
          </div>
        )}
        <img src={logoType} alt="Wagent Logo" draggable={false} />
        <p className="text-2xl font-medium mt-[36px] px-4">
          Simple and fast transactions for everyone
        </p>
        <p className="text-xs mt-[16px] w-3/4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>

        <div className="absolute gap-2 shadow-md rounded-[10px] py-2 pl-2 pr-3 inline-flex items-center z-10 -bottom-[30px] min-w-[240px] bg-white text-black">
          <img
            src={data.user.logo ? data.user.logo : defaultUserLogo}
            alt="userLogo"
            width={60}
            height={60}
            className="rounded-[10px] object-cover"
          />
          <p className="font-medium whitespace-nowrap">{capitalizeFirstLetter(data.user.name)}</p>
        </div>
      </div>

      <div className="bg-white tablet:!h-2/3 desktop:h-2/3 desktopMax:h-3/5 desktop:p-8 p-6 space-y-4 rounded-b-[10px] pt-16 overflow-y-auto mobile:overflow-hidden">
        <CDisclosure
          label="Order overview"
          title="Order Details"
          content={orderBottom}
          icon={<ShoppingCardIcon fill="#000" />}
        />

        {data.products && data.products.length > 0 ? (
          <CDisclosure
            title="Order information"
            subTitle={`${data.products.length} Products in your cart`}
            content={orderTop}
            icon={<ShoppingCardIcon fill="#000" />}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OrderOverview;
