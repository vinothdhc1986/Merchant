import React from 'react';

export interface TextInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mobile?: boolean;
  prefix?: string;
  value?: any;
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
  bgIcon?: any;
  isRequired?: boolean;
  name?: string;
  style?: any;
  formGroupClassName?: string;
  forgotPassword?: JSX.Element;
}
