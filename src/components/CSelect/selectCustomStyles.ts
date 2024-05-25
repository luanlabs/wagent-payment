const selectCustomStyles = () => ({
  option: (provided: any, state: any) => ({
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

  control: (provided: any, state: any) => ({
    ...provided,
    width: '100%',
    display: 'flex',
    backgroundColor: '',
    height: '40px',
    borderRadius: '8px',
    fontSize: '16px',
    padding: '0 7px',
    cursor: 'pointer',
    border: '1px solid #D0D5DD',
    transition: 'none',
    outline: state.isFocused ? 'none' : 'none',
  }),

  indicatorSeparator: () => ({
    border: 'none',
  }),

  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    borderRadius: '9px',
    overflow: 'auto',
  }),

  menuList: () => ({
    backgroundColor: '#fff',
    width: '100%',
    overflow: 'auto',
  }),

  placeholder: (defaultStyles: any) => ({ ...defaultStyles, color: '#98A2B3' }),
});

export default selectCustomStyles;
