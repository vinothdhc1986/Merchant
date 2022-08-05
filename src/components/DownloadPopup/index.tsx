import React, { FC } from 'react';
import './style.scss';
import Props from './typing';
import imgURL from '../../lib/imgURL';

const Download: FC<Props> = (props): JSX.Element => {
  const { cancelHandler, totalRecords } = props;
  return (
    <React.Fragment>
      <div className="download-model">
        <button className="close-model" onClick={cancelHandler}>
          <img src={imgURL['close-model']} alt="close" />
        </button>
        <h5>Download Started</h5>
        <p>
          Your download for {totalRecords} transactions will be processed soon.
        </p>
        {/* <button className="cancel-button" onClick={cancelHandler}>
          Cancel
        </button> */}
      </div>
    </React.Fragment>
  );
};

export default Download;
