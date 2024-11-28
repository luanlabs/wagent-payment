import CircularProgress from '../../../components/CircularProgress';
import StepWrapper from '../../../components/StepWrapper';

const StepFour = () => {
  // TODO implement current network load confirmation time
  return (
    <StepWrapper title="Payment Confirmation" showNext={false} showCountdown={false}>
      <p className="text-[#475467] text-sm">
        We have detected your transaction. Based on the current network load confirmation can take
        approximately: <em className="text-[#101828] font-[Aeonik-b]">NOT IMPLEMENTED IN BACK</em>
      </p>
      <div className="center flex-col my-16">
        <CircularProgress percentage={34} />

        <p className="text-[#667085] text-center mt-8">
          There is nothing else you need to do!
          <br /> You may close this window.
        </p>
      </div>
    </StepWrapper>
  );
};

export default StepFour;
