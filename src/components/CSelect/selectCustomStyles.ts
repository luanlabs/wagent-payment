import { StylesConfig } from 'react-select';

interface OptionType {
  value: string;
  label: string;
  icon: string;
}

const selectCustomStyles: StylesConfig<OptionType, false> = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#039855' : 'black',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '40px',
    backgroundColor: state.isSelected ? '#F9FAFB' : 'white',
    '&:hover': {
      backgroundColor: state.isFocused ? '#F9FAFB' : '',
    },
  }),

  control: (provided, state) => ({
    ...provided,
    width: '100%',
    backgroundColor: '',
    height: '40px',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#039855',
    padding: '0 7px',
    cursor: 'pointer',
    border: state.isFocused ? '1px solid #D0D5DD' : '1px solid #D0D5DD',
    transition: 'none',
    outline: 'none',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#D0D5DD',
    },
  }),
  valueContainer: () => ({
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    padding: '0 7px',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),

  menu: (defaultStyles) => ({
    ...defaultStyles,
    borderRadius: '8px',
  }),

  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#98A2B3' }),
};

export default selectCustomStyles;
