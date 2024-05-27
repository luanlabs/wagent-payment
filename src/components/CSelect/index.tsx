import { useState } from 'react';
import Select, { components, OptionProps } from 'react-select';

import arrowLogo from '/images/arrow.svg';

import { OptionType } from '../../models';
import selectCustomStyles from './selectCustomStyles';

type CSelectProps = {
  placeholder?: string;
  className?: string;
  onChange?: (value: OptionType | null) => void;
};

const options: OptionType[] = [
  { value: 'xlm', label: 'xlm', icon: 'xlm.png' },
  { value: 'usdc', label: 'usdc', icon: 'xlm.png' },
  { value: 'else', label: 'else', icon: 'xlm.png' },
];

const DropdownIndicator = () => (
  <div className="mr-2">
    <img src={arrowLogo} alt="arrow" />
  </div>
);

const CustomSingleValue = ({ data }: { data: OptionType }) => (
  <div className="flex items-center">
    <img src={data.icon} alt={data.label} className="w-4 h-4 mr-2" />
    {data.label}
  </div>
);

const Option = (props: OptionProps<OptionType>) => (
  <components.Option {...props}>
    <img src={props.data.icon} width={20} height={20} alt={props.data.label} className="mr-2" />
    {props.data.label}
  </components.Option>
);

const CSelect = ({ placeholder, className, onChange }: CSelectProps) => {
  const [selectValue, setSelectValue] = useState<OptionType | null>(null);

  const handleChange = (item: OptionType | null) => {
    setSelectValue(item);

    if (onChange) {
      onChange(item);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <Select
        autoFocus={false}
        options={options}
        components={{
          Option: Option,
          DropdownIndicator,
          SingleValue: CustomSingleValue,
        }}
        styles={selectCustomStyles}
        placeholder={placeholder}
        isSearchable={false}
        value={selectValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default CSelect;
