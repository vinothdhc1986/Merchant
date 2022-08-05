import React, { FC } from 'react';
import Props from './typing';
import './styles.scss';

const CustomModalRow: FC<Props> = (props) => {
  const { label, value, isRequired } = props;
  return (
    <div className='custom-modal-row'>
      <label className='custom-label'>
        {label} {isRequired && <span className='red'>*</span>}
      </label>
      <div className='custom-value'>
        {value}
      </div>
    </div>
  );
};

export default CustomModalRow;
