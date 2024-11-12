import React from 'react';
import clsx from 'clsx';

import Check from '../../assets/Check';

export type CRadioButtonType = 'primary' | 'secondary';

type CRadioButtonProps = {
  checked: boolean;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string | React.JSX.Element;
  value: string | number;
  type?: CRadioButtonType;
  className?: string;
};

const CRadioButton = ({ checked, onChange, label, value, name, className }: CRadioButtonProps) => {
  return (
    <label className={clsx(className, 'flex items-center space-x-2')}>
      <input
        type="radio"
        className="hidden"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-checked={checked}
      />
      <div
        className={clsx(
          'flex items-center justify-center rounded-full transition-transform duration-100 ease-in-out border border-1 border-[#D0D5DD] w-[20px] h-[20px]',
        )}
        role="radio"
        aria-checked={checked}
      >
        {checked && <Check fill="#073834" />}
      </div>

      {label && (
        <span
          className={clsx(
            'text-base select-none transition-colors duration-100',
            checked ? 'text-black' : 'text-gray-500',
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
};

export default CRadioButton;
