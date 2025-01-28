import CircularProgress from '../../../components/CircularProgress';
import StepWrapper from '../../../components/StepWrapper';

interface IStepFour {
  setStep: (_: number) => void;
  setIsRedirect: (_: boolean) => void;
}

const StepFour = ({ setStep, setIsRedirect }: IStepFour) => {
  setTimeout(() => {
    setStep(5);
    setIsRedirect(true);
  }, 4000);

  return (
    <StepWrapper title="Payment Confirmation" showNext={false}>
      <p className="text-[#475467] text-sm">
        We have detected your transaction. Based on the current network load confirmation can take
        approximately:
      </p>
      <div className="center flex-col my-16">
        <CircularProgress percentage={100} duration={3000} color="#05DC91" />

        <p className="text-[#667085] text-center mt-8">
          There is nothing else you need to do!
          <br /> You may close this window.
        </p>
      </div>
    </StepWrapper>
  );
};

export default StepFour;
