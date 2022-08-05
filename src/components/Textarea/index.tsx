import React, { FC } from 'react';
import { Props } from './typings';
import './style.scss';

const TextInput: FC<Props> = (props): JSX.Element => {
  const {
    id,
    customStyleClass,
    textareaWrapperClass,
    name,
    value,
    placeholder,
    onBlur = () => {},
    handleChange = () => {},
    maxlength,
    rows,
    cols,
    error,
    errorMessage,
  } = props;

  return (
    <div
      className={`form-group ${textareaWrapperClass ?? ''} ${
        error ? 'error-field' : ''
      }`}
    >
      <textarea
        id={id}
        placeholder={placeholder}
        className={`form-control ${customStyleClass ?? ''}`}
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        onBlur={onBlur}
        rows={rows}
        maxLength={maxlength}
        cols={cols}
      />
      {error && <span className='error'>{errorMessage}</span>}
    </div>
  );
};

export default TextInput;
