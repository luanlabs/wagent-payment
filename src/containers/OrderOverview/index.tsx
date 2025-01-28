import { useState } from 'react';
import BN from '../../utils/BN';

import CModal from '../../components/Modal';
import CButton from '../../components/CButton';
import CDisclosure from '../../components/CDisclosure';
import OrderOverviewField from '../../components/OrderOverviewField';
import PaymentDetailsModal from '../../components/Modals/PaymentDetailsModal';

import copyText from '../../utils/copyText';
import extractDomain from '../../utils/extractDomain';
import humanizeAmount from '../../utils/humanizeAmount';

import { IOrderDetailsResponse } from '../../models';

import Copy from '../../assets/Copy';
import defaultUserLogo from '../../../public/images/defaultUserLogo.png';

interface IOrderOverview {
  data: IOrderDetailsResponse;
  orderId: string;
}

const OrderOverview = ({ data, orderId }: IOrderOverview) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const transaction = data.transaction;

  return (
    <div className="h-full mobile:h-auto">
      <div className="mobile:hidden px-4 py-8 w-full h-full rounded-[12px] bg-white flex flex-col justify-between">
        <div>
          <div className="flex items-center bg-[#F9FAFB] border border-1 border-[#F2F4F7] rounded-[12px] p-2 mb-4">
            <div className="w-[50px] h-[50px] overflow-hidden rounded-lg ">
              <img
                src={data.user.logo ? data.user.logo : defaultUserLogo}
                alt="logo"
                className="object-cover"
              />
            </div>
            <span className="ml-3 text-[#101828] font-medium tracking-[0.5px] cursor-default">
              {data.user.name}
            </span>
          </div>
          <ul className="space-y-3">
            <OrderOverviewField
              label="Amount"
              value={`${humanizeAmount(data.amount)} ${data.currency.toUpperCase()}`}
            />
            <OrderOverviewField
              label="Order ID"
              value={
                <a
                  className="text-[#101828] flex items-center gap-1 cursor-pointer"
                  onClick={() => copyText(orderId)}
                >
                  <p className="text-[15px]">
                    <span className="text-base">#</span>
                    {orderId.substring(0, 6)}...{orderId.slice(-4)}
                  </p>
                  <div>
                    <Copy fill="#666" width="15px" height="15px" />
                  </div>
                </a>
              }
            />
            <OrderOverviewField
              label="Website"
              value={<a href={data.redirectUrl}>{extractDomain(data.redirectUrl)}</a>}
            />
          </ul>
        </div>

        <div className="mobile:mt-4">
          <CButton variant="green" text="Transaction info" onClick={handleOpenModal} />
          <CModal isOpen={isOpen} onClose={handleClose} className="w-[530px] mobile:w-full">
            <PaymentDetailsModal
              onClose={handleClose}
              amount={data?.amount}
              exchangeRate="1 USDT = 0.9352 USD"
              serviceTotal={BN(data.amount).times(1.65).toString()}
              totalPaid={'$ ' + BN(data.amount).times(1.65).toString()}
            />
          </CModal>
        </div>
      </div>

      <div className="mobile:block hidden">
        <CDisclosure
          title="Amanda Shop"
          content={
            <>
              <ul className="space-y-1">
                <OrderOverviewField label="Amount" value={data.amount + ' USD'} />
                <OrderOverviewField label="Order ID" value={orderId} />
                <OrderOverviewField label="Website" value={extractDomain(data.redirectUrl)} />
              </ul>
              <div className="mobile:mt-4">
                <CButton variant="green" text="Transaction info" onClick={handleOpenModal} />
                <CModal isOpen={isOpen} onClose={handleClose} className="w-full">
                  <PaymentDetailsModal
                    onClose={handleClose}
                    amount={transaction?.amount}
                    exchangeRate="1 USDT = 0.9352 USD"
                    serviceTotal={BN(data.amount).times(1.65).toString()}
                    totalPaid={'$ ' + BN(data.amount).times(1.65).toString()}
                  />
                </CModal>
              </div>
            </>
          }
          icon="https://static01.nyt.com/images/2024/09/20/business/20adviser/20adviser-articleLarge.png?quality=75&auto=webp&disable=upscale"
        />
      </div>
    </div>
  );
};

export default OrderOverview;
