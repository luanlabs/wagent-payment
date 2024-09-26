import { useEffect, useState } from 'react';
import BN from '../../utils/BN';

import ErrorModal from '../../components/Modals/ErrorModal';
import ProcessModal from '../../components/Modals/ProcessModal';
import ApproveModal from '../../components/Modals/ApproveModal';
import SuccessModal from '../../components/Modals/SuccessModal';

import { IPaymentDetails } from '../../models';
import { Testnet } from '../../constants/networks';

import pay from '../../utils/Soroban/pay';
import timeout from '../../utils/timeout';
import approve from '../../utils/Soroban/approve';
import toDecimals from '../../utils/Soroban/toDecimals';
import getERC20Allowance from '../../utils/Soroban/getERC20Allowance';
import signTransaction from '../../utils/Soroban/Transaction/signTransaction';
import sendTransaction from '../../utils/Soroban/Transaction/sendTransaction';
import finalizeTransaction from '../../utils/Soroban/Transaction/finalizeTransaction';
import passPhraseToNetworkDetail from '../../utils/Soroban/passPhraseToNetworkDetail';

interface ConfirmPaymentProps {
  isConfirmClicked: boolean;
  setIsConfirmClicked: (_: boolean) => void;
  data: IPaymentDetails;
}

const ConfirmPayment = ({ isConfirmClicked, setIsConfirmClicked, data }: ConfirmPaymentProps) => {
  const [processModalIsOpen, setIsProcessModalIsOpen] = useState(false);
  const [approveModalIsOpen, setIsApproveModalIsOpen] = useState(false);
  const [successModalIsOpen, setIsSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setIsErrorModalIsOpen] = useState(false);
  const [payModalIsOpen, setIsPayModalIsOpen] = useState(false);
  const [processText, setProcessText] = useState({
    title: '',
    message: '',
  });

  const [errorTextModal, setErrorTextModal] = useState({
    title: '',
    message: '',
  });

  const handleOnCloseModal = () => {
    setIsProcessModalIsOpen(false);
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

    setProcessText({
      title: 'Waiting for token access approval',
      message: 'You are granting Wagent access to your tokens equal to your total order amount',
    });

    setIsProcessModalIsOpen(true);

    const checkAllowance = await getERC20Allowance(
      data.tokenAddress,
      Testnet.networkPassphrase,
      data.sender,
      passPhraseToNetworkDetail(Testnet.networkPassphrase).contract,
    );

    if (toDecimals(BN(data.amount)) <= BigInt(checkAllowance)) {
      setIsProcessModalIsOpen(false);

      setIsPayModalIsOpen(true);

      console.log('success allowance', 'Transaction has been approved successfully');

      return;
    }

    console.log('start approve');

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
      setIsProcessModalIsOpen(false);
      setErrorTextModal({ title: 'Error', message: 'Error signing approval transaction' });
      setIsErrorModalIsOpen(true);

      return;
    }
    setIsErrorModalIsOpen(false);

    let tx;

    try {
      tx = await sendTransaction(signedTx, Testnet.networkPassphrase);
    } catch {
      setErrorTextModal({ title: 'Error', message: 'Failed to submit the transaction' });
      setIsErrorModalIsOpen(true);

      return;
    }
    setIsErrorModalIsOpen(false);

    if (tx) {
      setIsProcessModalIsOpen(false);
      setProcessText({ title: 'Waiting for transaction approval', message: '' });
      await timeout(100);
      setIsProcessModalIsOpen(true);

      const finalize = await finalizeTransaction(tx.hash, Testnet.networkPassphrase);

      setIsProcessModalIsOpen(false);

      if (!finalize) {
        setIsProcessModalIsOpen(false);

        setErrorTextModal({ title: 'Error', message: 'Approval transaction failed to finalize' });
        setIsErrorModalIsOpen(true);

        return;
      }
    } else {
      setIsProcessModalIsOpen(false);
      setIsErrorModalIsOpen(false);

      return;
    }

    console.log('success', 'Transaction has been approved successfully');

    setIsProcessModalIsOpen(false);
    await timeout(50);
    setIsPayModalIsOpen(true);
  };

  const handlePay = async () => {
    setIsPayModalIsOpen(false);
    await timeout(50);
    setProcessText({ title: 'Waiting for transaction confirmation', message: '' });
    setIsProcessModalIsOpen(true);

    const paymentXdr = await pay(Testnet.networkPassphrase, data.sender, data);

    let signedXdr;

    try {
      signedXdr = await signTransaction(data.sender, Testnet.networkPassphrase, paymentXdr);
    } catch (e) {
      setIsProcessModalIsOpen(false);
      setErrorTextModal({ title: 'Error', message: 'Error signing create transaction' });
      setIsErrorModalIsOpen(true);

      return;
    }
    setIsErrorModalIsOpen(false);

    setIsProcessModalIsOpen(false);
    await timeout(50);
    setProcessText({ title: 'Completing pay creation transaction', message: '' });
    setIsProcessModalIsOpen(true);

    let tx;

    try {
      tx = await sendTransaction(signedXdr, Testnet.networkPassphrase);
    } catch {
      setIsProcessModalIsOpen(false);

      setErrorTextModal({ title: 'Error', message: 'Failed to submit the transaction' });
      setIsErrorModalIsOpen(true);
      return;
    }

    setIsErrorModalIsOpen(false);

    if (tx) {
      const finalize = await finalizeTransaction(tx.hash, Testnet.networkPassphrase);

      if (!finalize) {
        setIsProcessModalIsOpen(false);

        setErrorTextModal({ title: 'Error', message: 'Create  transaction failed to finalize' });
        setIsErrorModalIsOpen(true);
        return;
      }
      setIsErrorModalIsOpen(false);
    }

    await timeout(50);
    setIsSuccessModalIsOpen(true);
  };

  return (
    <div>
      <ProcessModal
        title={processText.title}
        message={processText.message}
        isOpen={processModalIsOpen}
        onClose={handleOnCloseModal}
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
        title={errorTextModal.title}
        message={errorTextModal.message}
        isOpen={errorModalIsOpen}
        onClose={() => setIsErrorModalIsOpen(false)}
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
