import CButton from '../../components/CButton';
import CDisclosure from '../../components/CDisclosure';
import OrderOverviewField from '../../components/OrderOverviewField';

import { IPaymentDetailsResponse } from '../../models';

interface IOrderOverview {
  data: IPaymentDetailsResponse;
  orderId: string;
}

const OrderOverview = ({ data, orderId }: IOrderOverview) => {
  return (
    <>
      <div className="mobile:hidden px-4 py-8 w-full h-full rounded-[12px] bg-white flex flex-col justify-between">
        <div>
          <div className="flex items-center bg-[#F9FAFB] border border-1 border-[#F2F4F7] rounded-[12px] p-2 mb-4">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-lg ">
              <img
                src="https://static01.nyt.com/images/2024/09/20/business/20adviser/20adviser-articleLarge.png?quality=75&auto=webp&disable=upscale"
                alt="logo"
                className="object-cover"
              />
            </div>
            <span className="ml-3 text-[#101828] font-medium tracking-[0.5px] cursor-default">
              AmandaShop
            </span>
          </div>
          <ul className="space-y-3">
            <OrderOverviewField label="Amount" value={data.amount + ' USD'} />
            <OrderOverviewField label="Order ID" value={orderId} />
            <OrderOverviewField label="Website" value={data.redirectUrl} />
          </ul>
        </div>

        <div className="mobile:mt-4">
          <CButton variant="green" text="Transaction info" />
        </div>
      </div>
      <div className="mobile:block desktop:hidden">
        <CDisclosure
          title="Amanda Shop"
          content={
            <>
              <ul className="space-y-1">
                <OrderOverviewField label="Amount" value={data.amount + ' USD'} />
                <OrderOverviewField label="Order ID" value={orderId} />
                <OrderOverviewField label="Website" value={data.redirectUrl} />
              </ul>
              <div className="mobile:mt-4">
                <CButton variant="green" text="Transaction info" />
              </div>
            </>
          }
          icon="https://static01.nyt.com/images/2024/09/20/business/20adviser/20adviser-articleLarge.png?quality=75&auto=webp&disable=upscale"
        />
      </div>
    </>
  );
};

export default OrderOverview;
