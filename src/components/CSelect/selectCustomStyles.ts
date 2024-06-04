import { StylesConfig } from 'react-select';
import { OptionType } from '../../models';

const customStyles = (open: boolean) => {
  const selectCustomStyles: StylesConfig<OptionType, false> = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#039855' : 'black',
      display: 'flex',
      borderRadius: '2px',
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

    menu: (provided) => ({
      ...provided,
      marginTop: 0,
      fontSize: 12,
      height: open ? '100px' : '10px',
      overflow: 'hidden',
      opacity: open ? 1 : 0,
      transition: 'all 1s ease-in-out',
      visibility: open ? 'visible' : 'hidden',
      borderRadius: '8px',
      border: '1px #D0D5DD solid',
      boxShadow: 'none',
    }),

    placeholder: (defaultStyles) => ({ ...defaultStyles, color: '#98A2B3', fontWeight: 'normal' }),
  };

  return selectCustomStyles;
};

export default customStyles;
