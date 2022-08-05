import React, { FC } from 'react';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import './styles.scss';

const WarningMessage: FC<Props> = (props): JSX.Element => {
  return (
    <div className='warningMessage'>
      <img src={imgURL['warning-icon-circle']} alt='logo' />
      <div className='warning-text'>{props.warningText}</div>
    </div>
  );
};

export default WarningMessage;
