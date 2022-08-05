export interface SelectProps {
  optionList?: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  bordered?: boolean;
  wrapperClass?: string;
  value?: string;
  parentId?: string;
  DropdownIcon?: JSX.Element;
  error?: boolean;
  errorMessage?: string;
}

interface Option {
  value: string;
  label: string;
}
