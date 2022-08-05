import React, { FC, useState } from 'react';
import imgURL from '../../lib/imgURL';
import { TextInputProps } from './typings';
import './style.scss';

const TextInput: FC<TextInputProps> = (props): JSX.Element => {
  const {
    label,
    type,
    value,
    placeholder,
    bgIcon,
    id,
    onBlur = () => {},
    handleChange = () => {},
    maxlength,
    className,
    error,
    errorMessage,
    isRequired,
    readonly,
    style = {},
    formGroupClassName,
    forgotPassword,
  } = props;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isImageEye, setIsImageEye] = useState<boolean>(false);
  const bgIconStyle = bgIcon
    ? {
        paddingLeft: '44px',
        background: `url(${bgIcon}) 16px center no-repeat`,
      }
    : {};

  const maxLengthCheck = (object) => {
    if (maxlength && object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };
  const openEyeStyle = {
    background: `url(${imgURL['open-eye']}) 0 0 no-repeat`,
  };

  const closeEyeStyle = {
    background: `url(${imgURL['close-eye']}) 0 0 no-repeat`,
  };

  return (
    <div
      className={`form-group ${
        error ? 'error-field' : isFocus ? 'input-focus' : ''
      } ${formGroupClassName || ''}`}
    >
      {forgotPassword && forgotPassword}
      {label && (
        <label>
          {label}
          {isRequired && <em>*</em>}
        </label>
      )}
      <input
        id={id}
        name={props.name}
        style={{ ...style, ...bgIconStyle }}
        type={type !== 'password' ? type : isImageEye ? 'text' : 'password'}
        value={value || ''}
        disabled={readonly}
        maxLength={maxlength}
        onInput={maxLengthCheck}
        placeholder={placeholder}
        className={`form-control ${className}`}
        onChange={handleChange}
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
          setIsFocus(false);
          onBlur(e);
        }}
      />
      {error && <div className='error'>{errorMessage}</div>}
      {type === 'password' && (
        <span
          onClick={() => setIsImageEye(!isImageEye)}
          style={isImageEye ? openEyeStyle : closeEyeStyle}
          className='eye'
        ></span>
      )}
    </div>
  );
};

export default TextInput;
