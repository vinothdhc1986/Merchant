interface Props {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: CallableFunction;
  extraContent?: JSX.Element | string;
  extraContentWrapperClassName?: string;
}

export default Props;
