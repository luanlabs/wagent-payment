import { ChangeEvent, useState } from 'react';

import StepWrapper from '../../../components/StepWrapper';

interface StepOneProps {
  nextStep: () => void;
  emailAddress: string;
  setEmailAddress: (email: string) => void;
}

const StepOne = ({ nextStep, emailAddress, setEmailAddress }: StepOneProps) => {
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    setEmailAddress(email);
    setEmailError(email && !emailRegex.test(email) ? 'Please enter a valid email address' : '');
  };

  return (
    <StepWrapper title="Fill your information" nextStep={nextStep} disable={emailError !== ''}>
      <div className="flex justify-between items-center mt-9">
        <p className="text-black text-[16px] w-[50%]">Email address</p>

        <div className="w-[80%]">
          <input
            value={emailAddress}
            onChange={handleEmailChange}
            placeholder="Email Address"
            type="email"
            className="w-full h-10 py-[10px] px-[14px] text-base border border-gray rounded-lg placeholder:text-cadetBlue text-black focus:outline-none"
          />
          <p className="text-[13px] text-red-500 px-1 h-1 mt-[2px]">{emailError && emailError}</p>
        </div>
      </div>
    </StepWrapper>
  );
};

export default StepOne;
