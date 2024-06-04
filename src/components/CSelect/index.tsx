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
};

const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => (
  <components.DropdownIndicator {...props}>
    <img
      src={arrowLogo}
      alt="arrow"
      className={`${
        props.selectProps.menuIsOpen
          ? 'rotate-180 transition-all duration-[400ms]'
          : 'rotate-0 transition-all duration-[400ms]'
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

const customComponents = {
  Option: Option,
  DropdownIndicator: DropdownIndicator,
  SingleValue: CustomSingleValue,
};

const CSelect = ({ placeholder, className, onChange, options }: CSelectProps) => {
  const [selectValue, setSelectValue] = useState<OptionType | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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
        components={customComponents}
        styles={customStyles(open)}
        placeholder={placeholder}
        isSearchable={false}
        value={selectValue}
        onBlur={() => setOpen(false)}
        menuIsOpen
        onChange={handleChange}
      />
    </div>
  );
};

export default CSelect;
