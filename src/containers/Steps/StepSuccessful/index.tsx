import Successful from '../../Successful';

import formatDate from '../../../utils/formatDate';

import { networks } from '../../PaymentGatewayMultiStep/network';

import { IOrderDetailsResponse, OptionType } from '../../../models';

interface IStepSuccessful {
  selectedNetwork: OptionType;
  data: IOrderDetailsResponse;
  isRedirect: boolean;
  orderId: string;
}

const StepSuccessful = ({ data, selectedNetwork, isRedirect, orderId }: IStepSuccessful) => {
  const transaction = data.transaction!;

  if (isRedirect) {
    setInterval(() => {
      window.location.href = data.redirectUrl;
    }, 4000);
  }

  return (
    <div className="h-full w-full">
      <Successful
        networkImg={networks.stellar.logo}
        amount={transaction.amount}
        txHash={transaction!.hash}
        network={selectedNetwork.label}
        token={transaction.token}
        dateTime={formatDate(transaction.submittedAt)}
        status={transaction.successful ? 'success' : data.status}
        currency={data.currency}
        orderId={orderId}
      />
    </div>
  );
};

export default StepSuccessful;
