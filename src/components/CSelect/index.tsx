import { useState } from 'react';
import Select, { components } from 'react-select';

import { ReactSelectOnChangeType } from '../../models';

import arrowLogo from '../../../public/images/arrow.svg';

import selectCustomStyles from './selectCustomStyles';

interface CSelectProps {
  placeholder?: string;
  label?: string;
  tooltipDetails?: string;
  className?: string;
}

const options = [
  { value: 'xlm', label: 'XLM', icon: 'xlm.png' },
  { value: 'xlm1', label: 'XLM1', icon: 'xlm.png' },
  { value: 'xlm3', label: 'XLM3', icon: 'xlm.png' },
  { value: 'xlm45', label: 'XLM4', icon: 'xlm.png' },
  { value: 'xlm31', label: 'XLM5', icon: 'xlm.png' },
  { value: 'xlm2', label: 'XLM2', icon: 'xlm.png' },
];

const Option = (props: any) => (
  <components.Option {...props}>
    <img src={arrowLogo} width={30} height={20} alt={props.data.label} className="mr-2" />
    {props.data.label}
  </components.Option>
);

const DropdownIndicator = () => {
  return (
    <div>
      <img src={arrowLogo} alt="arrow" />
    </div>
  );
};

const CSelect = ({ placeholder, className, ...props }: CSelectProps) => {
  const [selectValue, setSelectValue] = useState(null);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full">
        <Select
          options={options}
          components={{ Option, DropdownIndicator }}
          styles={selectCustomStyles()}
          placeholder={placeholder}
          isSearchable={true}
          onChange={setSelectValue}
          {...props}
        />
      </div>
    </div>
  );
};

export default CSelect;
