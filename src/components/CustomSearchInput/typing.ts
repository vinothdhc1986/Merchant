interface Props {
  placeholder?: string;
  list?: Array<string>;
  handleSearch: CallableFunction;
  searchRecordsHandler: CallableFunction;
  customWidth?: string;
  suffix?: string | JSX.Element;
  value?: string;
}

export default Props;
