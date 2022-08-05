import React, { FC } from 'react';
import './style.scss';
import Props from './typing';
import useRedirect from '../../hooks/useRedirect';
import { UiRoutes } from '../../lib/constants';

const Modal: FC<Props> = (props): JSX.Element => {
  const { push } = useRedirect();
  return (
    <React.Fragment>
      <div className='error-screen'>
        <img className='error-background' src={props.errorBackground} />
        <h2 className='heading-title'>Something went wrong!</h2>
        <p className='heading-description'>{`
        Sorry, we couldn't load that page. Let us take you back to the dashboard.`}
        </p>
        <div className='button-wrapper'>
          <button className='img-button-dashboard' onClick={()=> push(UiRoutes.OVERVIEW)}>
            <img src={props.squareImg} />
            Dashboard
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
