import { useEffect, useState } from 'react';
import BN from '../../utils/BN';

import ErrorModal from '../../components/Modals/ErrorModal';
import ProcessModal from '../../components/Modals/ProcessModal';
import ApproveModal from '../../components/Modals/ApproveModal';
import SuccessModal from '../../components/Modals/SuccessModal';

import { IPaymentDetails } from '../../models';
import Testnet from '../../constants/networks';

import pay from '../../utils/Soroban/pay';
import timeout from '../../utils/timeout';
import approve from '../../utils/Soroban/approve';
import toDecimals from '../../utils/Soroban/toDecimals';
import getERC20Allowance from '../../utils/Soroban/getERC20Allowance';
import signTransaction from '../../utils/Soroban/Transaction/signTransaction';
import sendTransaction from '../../utils/Soroban/Transaction/sendTransaction';
import finalizeTransaction from '../../utils/Soroban/Transaction/finalizeTransaction';
import sendConfirmedTransaction from '../../api/sendConfirmedTransaction';

interface ConfirmPaymentProps {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  data: IPaymentDetails;
  payerEmail: string;
}

const ConfirmPayment = ({
  isConfirmClicked,
  setIsConfirmClicked,
  data,
  payerEmail,
}: ConfirmPaymentProps) => {
  const [approveModalIsOpen, setIsApproveModalIsOpen] = useState(false);
  const [successModalIsOpen, setIsSuccessModalIsOpen] = useState(false);
  const [payModalIsOpen, setIsPayModalIsOpen] = useState(false);
  const [processModal, setProcessModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  const [errorModal, setErrorModal] = useState({
    isOpen: false,
    title: '',
    message: '',
  });

  useEffect(() => {
    if (isConfirmClicked) {
      setIsApproveModalIsOpen(true);
      setIsConfirmClicked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmClicked]);

  const handleRedirectUrl = () => {
    window.location.href = data.redirectUrl;
  };

  const handleApproveModal = async () => {
    setIsApproveModalIsOpen(false);

    setProcessModal({
      isOpen: true,
      title: 'Waiting for token access approval',
      message: 'You are granting Wagent access to your tokens equal to your total order amount',
    });

    const checkAllowance = await getERC20Allowance(
      data.tokenAddress,
      Testnet.networkPassphrase,
      data.sender,
      Testnet.contract,
    );

    if (toDecimals(BN(data.amount)) <= BigInt(checkAllowance)) {
      setProcessModal({
        isOpen: false,
        title: '',
        message: '',
      });

      await timeout(50);

      setIsPayModalIsOpen(true);

      return;
    }

    const approveXdr = await approve(
      data.tokenAddress,
      Testnet.networkPassphrase,
      data.sender,
      BN(data.amount),
    );

    let signedTx;

    try {
      signedTx = await signTransaction(data.sender, Testnet.networkPassphrase, approveXdr);
    } catch {
      setProcessModal({
        isOpen: false,
        title: '',
        message: '',
      });

      await timeout(50);
      setErrorModal({
        isOpen: true,
        title: 'Error',
        message: 'Error signing approval transaction',
      });

      return;
    }
    setErrorModal({
      isOpen: false,
      title: '',
      message: '',
    });

    let tx;

    try {
      tx = await sendTransaction(signedTx);
    } catch {
      await timeout(50);
      setErrorModal({ isOpen: true, title: 'Error', message: 'Failed to submit the transaction' });

      return;
    }
    setErrorModal({ isOpen: false, title: '', message: '' });

    if (tx) {
      await timeout(50);
      setProcessModal({
        isOpen: false,
        title: '',
        message: '',
      });
      await timeout(100);

      setProcessModal({ isOpen: true, title: 'Waiting for transaction approval', message: '' });

      const finalize = await finalizeTransaction(tx.hash);

      setProcessModal({
        isOpen: false,
        title: '',
        message: '',
      });

      if (!finalize) {
        setProcessModal({
          isOpen: false,
          title: '',
          message: '',
        });

        setErrorModal({
          isOpen: true,
          title: 'Error',
          message: 'Approval transaction failed to finalize',
        });

        return;
      }
    } else {
      setProcessModal({
        isOpen: false,
        title: '',
        message: '',
      });

      setErrorModal({ isOpen: false, title: '', message: '' });

      return;
    }

    setProcessModal({
      isOpen: false,
      title: '',
      message: '',
    });

    await timeout(50);
    setIsPayModalIsOpen(true);
  };

  const handlePay = async () => {
    setIsPayModalIsOpen(false);
    await timeout(50);
    setProcessModal({ isOpen: true, title: 'Waiting for transaction confirmation', message: '' });

    let paymentXdr;
    try {
      paymentXdr = await pay(Testnet.networkPassphrase, data.sender, data);
    } catch (error) {
      setErrorModal({ isOpen: true, title: 'Error', message: 'Error Create Transaction' });
    }

    setErrorModal({ isOpen: false, title: '', message: '' });

    let signedXdr;

    try {
      signedXdr = await signTransaction(data.sender, Testnet.networkPassphrase, paymentXdr);
    } catch (e) {
      setProcessModal({ isOpen: false, title: '', message: '' });
      setErrorModal({ isOpen: true, title: 'Error', message: 'Error signing create transaction' });

      return;
    }

    setErrorModal({ isOpen: false, title: '', message: '' });

    setProcessModal({ isOpen: false, title: '', message: '' });
    await timeout(50);
    setProcessModal({ isOpen: true, title: 'Completing pay creation transaction', message: '' });

    let tx;

    try {
      tx = await sendTransaction(signedXdr);
    } catch {
      setProcessModal({ isOpen: false, title: '', message: '' });

      await timeout(50);
      setErrorModal({ isOpen: true, title: 'Error', message: 'Failed to submit the transaction' });
      return;
    }

    setErrorModal({ isOpen: false, title: '', message: '' });

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash);

      if (!finalize) {
        setProcessModal({ isOpen: false, title: '', message: '' });
        await timeout(50);
        setErrorModal({
          isOpen: true,
          title: 'Error',
          message: 'Create  transaction failed to finalize',
        });
        return;
      }
      setErrorModal({ isOpen: false, title: '', message: '' });
    }

    setProcessModal({ isOpen: false, title: '', message: '' });
    await timeout(50);
    setIsSuccessModalIsOpen(true);

    await sendConfirmedTransaction(data.orderId, tx.hash, payerEmail);

    handleRedirectUrl();
  };

  return (
    <div>
      <ProcessModal
        title={processModal.title}
        message={processModal.message}
        isOpen={processModal.isOpen}
        onClose={() => setProcessModal({ isOpen: false, title: '', message: '' })}
      />

      <ApproveModal
        buttonText="Approve"
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
        title={errorModal.title}
        message={errorModal.message}
        isOpen={errorModal.isOpen}
        onClose={() => setErrorModal({ isOpen: false, title: '', message: '' })}
      />

      <ApproveModal
        buttonText="Pay"
        title="pay"
        message="pay"
        isOpen={payModalIsOpen}
        onClose={() => setIsPayModalIsOpen(false)}
        onClick={handlePay}
      />
    </div>
  );
};

export default ConfirmPayment;
