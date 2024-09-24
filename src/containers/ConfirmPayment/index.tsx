import { useEffect, useState } from 'react';

import ProcessModal from '../../components/Modals/ProcessModal';
import ApproveModal from '../../components/Modals/ApproveModal';
import { IPaymentDetailsResponse } from '../../models';
import timeout from '../../utils/timeout';
import SuccessModal from '../../components/Modals/SuccessModal';
import ErrorModal from '../../components/Modals/ErrorModal';

interface ConfirmPaymentProps {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  data: IPaymentDetailsResponse;
}

const ConfirmPayment = ({ isConfirmClicked, setIsConfirmClicked }: ConfirmPaymentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletConnectionIsOpen, setIsWalletConnectionIsOpen] = useState(false);
  const [approveModalIsOpen, setIsApproveModalIsOpen] = useState(false);
  const [successModalIsOpen, setIsSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setIsErrorModalIsOpen] = useState(false);

  const handleOnCloseModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isConfirmClicked) {
      setIsApproveModalIsOpen(true);
      setIsConfirmClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmClicked]);

  const handleApproveModal = async () => {
    setIsApproveModalIsOpen(false);
    setIsWalletConnectionIsOpen(true);
    await timeout(2000);
    setIsWalletConnectionIsOpen(false);
    await timeout(100);
    setIsOpen(true);
    await timeout(2000);
    setIsOpen(false);
    setIsSuccessModalIsOpen(true);

    await timeout(1000);
    setIsSuccessModalIsOpen(false);
    await timeout(100);
    setIsErrorModalIsOpen(true);
  };

  return (
    <div>
      <ProcessModal
        title="processing your order "
        message="Your order is being processed, please wait."
        isOpen={isOpen}
        onClose={handleOnCloseModal}
      />

      <ProcessModal
        title="Waiting for wallet connection"
        message="You are connecting your wallet in order to make a transaction with Wagent payment."
        isOpen={walletConnectionIsOpen}
        onClose={() => setIsWalletConnectionIsOpen(false)}
      />

      <ApproveModal
        title="Approve token Access"
        message="You need to approve token access first to continue creating the stream. "
        isOpen={approveModalIsOpen}
        onClose={() => setIsApproveModalIsOpen(false)}
        onClick={handleApproveModal}
      />

      <SuccessModal
        title="Transaction successful"
        message="You will be redirected shortly"
        isOpen={successModalIsOpen}
        onClose={() => setIsSuccessModalIsOpen(false)}
      />

      <ErrorModal
        title="Something went wrong"
        message="transaction failed due to [Error], we will redirect you shortly"
        isOpen={errorModalIsOpen}
        onClose={() => setIsErrorModalIsOpen(false)}
      />
    </div>
  );
};

export default ConfirmPayment;
