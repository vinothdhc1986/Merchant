import React, { FC } from 'react';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import './style.scss';

const ImeiRequestFailed: FC<Props> = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className='imei-rquest-failed'>
        <h4>Verify IMEI Request Failed</h4>
        <p>
          This feature is not available for merchants who do not have Plural
          Gateway configured.
        </p>
        <button
          onClick={() =>
            window.open(`${process.env.REACT_APP_VERIFY_IMEI_LINK}`)
          }
          className='secondry-button'
        >
          Learn More About Plural Gateway{' '}
          <img src={imgURL['open-new-tab-blue']} alt='' />{' '}
        </button>
      </div>
    </React.Fragment>
  );
};

export default ImeiRequestFailed;
