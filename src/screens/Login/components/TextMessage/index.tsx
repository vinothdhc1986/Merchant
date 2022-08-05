import React from 'react';
import imgURL from '../../../../lib/imgURL';
import './style.scss';

const iconMapping = {
  error: 'alert-red',
  success: 'green-double-tick'
};

const TextMessage = (props: {
  type: 'success' | 'error';
  message: string;
}): JSX.Element => {
  return (
    <div className='error-component'>
      <span
        className={`icon-wrapper ${
          props.type === 'success' ? 'success-icon-wrapper' : ''
        }`}
      >
        <img src={imgURL[iconMapping[props.type]]} />
      </span>
      <span className={`text-message ${props.type}-color`}>
        {props.message}
      </span>
    </div>
  );
};

export default TextMessage;
