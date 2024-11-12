import { StylesConfig } from 'react-select';
import { OptionType } from '../../models';

const customStyles = (): StylesConfig<OptionType, false> => ({
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#000' : '#6b7280',
    fontFamily: 'Aeonik-m',
    display: 'flex',
    borderRadius: '10px',
    alignItems: 'center',
    cursor: 'pointer',
    height: '40px',
    marginBottom: '5px',
    width: '100% !important',
    backgroundColor: state.isSelected ? '#f3f4f6' : 'white',
    '&:hover': {
      backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
    },
  }),

  control: (provided, state) => ({
    ...provided,
    width: '100%',
    fontFamily: 'Aeonik-m',
    backgroundColor: '',
    height: '42px',
    borderRadius: '8px',
    letterSpacing: '0.0001em',
    fontSize: '17px',
    color: '#000',
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

  menu: (provided, state) => ({
    ...provided,
    padding: '4px',
    overflow: 'hidden',
    transition: 'all 400ms ease-in-out',
    visibility: state.selectProps.menuIsOpen ? 'visible' : 'hidden',
    borderRadius: '0.6rem',
    boxShadow:
      ' rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;',
  }),

  placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#98A2B3', fontWeight: 'normal' }),
});

export default customStyles;
