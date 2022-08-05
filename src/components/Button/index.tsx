import React, { FC } from 'react';
import { btnStyleClassMapping } from './constants';
import { ButtonProps } from './typing';
import './style.scss';

const Button: FC<ButtonProps> = (props): JSX.Element => {
  const {
    label,
    onClick,
    enable,
    btnStyleClass,
    type,
    btnStyleType = 'secondary',
  } = props;

  return (
    <button
      disabled={!enable}
      type={type || 'button'}
      className={`${btnStyleClassMapping[btnStyleType]} ${btnStyleClass} ${
        !enable ? 'dissable' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
