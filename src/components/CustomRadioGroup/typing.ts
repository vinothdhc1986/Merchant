interface Props {
  options: Array<{ label: string; value: string | null | number | boolean }>;
  onChange: CallableFunction;
  value: string | null | number | boolean;
  labelClassName?: string;
  groupType?: string;
  name?: string;
}

export default Props;
