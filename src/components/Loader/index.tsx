import React, { FC } from 'react';
import './style.scss';
import Props from './typing';
import imgURL from '../../lib/imgURL';

const Loader: FC<Props> = (props): JSX.Element => {
  const { message } = props;
  return (
    <React.Fragment>
      <div className="overlay"></div>
      <div className="modal modal-dialog-centered loader" id="loader">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <img src={imgURL.loader} alt="loader" />
              { <h4>{(message && message) || 'Loading...'}</h4>}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loader;
