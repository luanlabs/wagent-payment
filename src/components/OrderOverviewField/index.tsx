import { ReactNode } from 'react';

interface IOrderOverviewField {
  label: string;
  value: string | ReactNode;
}

const OrderOverviewField = ({ label, value }: IOrderOverviewField) => {
  return (
    <li className="flex justify-between px-4 py-4 rounded-xl bg-white border border-1 border-[#F2F4F7] cursor-default">
      <p className="text-[#667085] mobile:text-sm">{label}</p>
      <p className="text-[#101828] font-[Aeonik-m] mobile:text-sm">{value}</p>
    </li>
  );
};

export default OrderOverviewField;
