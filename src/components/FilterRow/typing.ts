interface Props {
  filterRowProps: {
    dateRangePicker?: {
      cancelHandler: () => void;
      saveHandler: CallableFunction;
      dateRange;
      visible: boolean;
      onVisibleChange: CallableFunction;
    };
    filterBy?: {
      handleClickFilterBtn: () => void;
      disableToolbar;
    };
    accountBalance?: {
      onClick: CallableFunction;
    };
    download?: {
      onClick: () => void;
    };
    faq?: {
      onClick: CallableFunction;
    };
  };
}

export default Props;
