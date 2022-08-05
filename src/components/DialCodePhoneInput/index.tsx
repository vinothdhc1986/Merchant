import React, { FC, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { TextInputProps } from './typings';
import 'react-phone-input-2/lib/style.css';
import './style.scss';

const DialCodePhoneInput: FC<TextInputProps> = (props): JSX.Element => {
  const {
    label,
    value,
    placeholder,
    //id,
    onBlur = () => {},
    handleChange = () => {},
    //className,
    error,
    errorMessage,
    isRequired,
    formGroupClassName,
    inputProps,
    country,
    onlyCountries,
    //masks,
    countryCodeEditable,
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <div
      className={`form-group ${
        error ? 'error-field' : isFocus ? 'input-focus' : ''
      } ${formGroupClassName || ''}`}
    >
      {label && (
        <label>
          {label}
          {isRequired && <em>*</em>}
        </label>
      )}

      <PhoneInput
        inputStyle={{
          background: '#ffffff',
          border: '1px solid #ebecef',
          boxSizing: 'border-box',
          borderRadius: '6px',
          width: '100%',
          height: '50px',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '24px',
          letterSpacing: '0.1px',
          color: '#282c44',
          padding: '10px 75px 16px',
        }}
        inputProps={inputProps}
        placeholder={placeholder}
        country={country}
        onlyCountries={onlyCountries}
        //masks={masks}
        value={value}
        countryCodeEditable={countryCodeEditable}
        onChange={handleChange}
        onBlur={(e) => {
          setIsFocus(false);
          onBlur(e);
        }}
      />

      {error && <div className='error'>{errorMessage}</div>}
    </div>
  );
};

export default DialCodePhoneInput;
