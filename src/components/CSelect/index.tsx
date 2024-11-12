import { useState } from 'react';
import Select, { components, DropdownIndicatorProps, OptionProps } from 'react-select';

import arrowLogo from '/images/arrow.svg';

import { OptionType } from '../../models';
import customStyles from './selectCustomStyles';

type CSelectProps = {
  placeholder?: string;
  className?: string;
  options: OptionType[];
  onChange?: (value: OptionType | null) => void;
  value?: OptionType;
};

const CSelect = ({ placeholder, className, onChange, options, value }: CSelectProps) => {
  const [selectValue, setSelectValue] = useState<OptionType | null>(null);

  const handleChange = (item: OptionType | null) => {
    setSelectValue(item);

    if (onChange) {
      onChange(item);
    }
  };

  const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => (
    <components.DropdownIndicator {...props}>
      <img
        src={arrowLogo}
        alt="arrow"
        className={`${
          props.selectProps.menuIsOpen
            ? 'rotate-180 transition-all duration-300'
            : 'rotate-0 transition-all duration-300'
        }`}
      />
    </components.DropdownIndicator>
  );

  const CustomSingleValue = ({ data }: { data: OptionType }) => (
    <div className="flex items-center">
      <img src={data.logo} alt={data.label} className="w-4 h-4 mr-2" />
      {data.label}
    </div>
  );

  const Option = (props: OptionProps<OptionType>) => (
    <components.Option {...props}>
      <img src={props.data.logo} width={20} height={20} alt={props.data.label} className="mr-2" />
      {props.data.label}
    </components.Option>
  );

  return (
    <div className={`w-full ${className}`}>
      <Select
        options={options}
        autoFocus={false}
        value={selectValue ? selectValue : value}
        isSearchable={false}
        onChange={handleChange}
        placeholder={placeholder}
        components={{
          Option: Option,
          DropdownIndicator,
          SingleValue: CustomSingleValue,
        }}
        styles={customStyles()}
      />
    </div>
  );
};

export default CSelect;
