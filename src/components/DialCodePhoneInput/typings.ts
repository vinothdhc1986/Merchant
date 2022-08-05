export interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  handleChange: (
    value: string,
    data: {
      name: string;
      dialCode: string;
    },
    event: React.ChangeEvent<HTMLInputElement>,
    formattedValue: string
  ) => void;
  mobile?: boolean;
  prefix?: string;
  value?: string;
  maxlength?: number;
  otp?: boolean;
  defaultValue?: string;
  id?: string;
  error?: boolean;
  errorMessage?: string;
  onBlur?: CallableFunction;
  numbersOnly?: boolean;
  alphabetsOnly?: boolean;
  className?: string;
  autoComplete?: string;
  readonly?: boolean;
  isRequired?: boolean;
  name?: string;
  formGroupClassName?: string;
  forgotPassword?: JSX.Element;
  isPhoneInput?: boolean;
  inputProps?;
  country?: string;
  onlyCountries?: Array<string>;
  masks?;
  countryCodeEditable?: boolean;
}
