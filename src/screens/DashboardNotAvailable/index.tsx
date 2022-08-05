import React, { FC, useEffect } from 'react';
import imgURL from '../../lib/imgURL';
import Button from '../../components/Button';
import './styles.scss';
import { Props } from './typing';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';

const DashboardNotAvailable: FC<Props> = (props): JSX.Element => {
  useEffect(() => {
    !props.isAdmin &&
      pushClevertapEvent(
        clevertapEventConfigList.INCOMPATIBLE_DEVICE_DIALOG_SHOWN
      );
  }, []);

  return (
    <div className='dashboard-not-available'>
      <img src={imgURL['responsive-not-available-icon']} />
      <h5>Plural is currently not available on this device</h5>
      <p>Please login to your account using a laptop or a desktop</p>

      <Button
        btnStyleClass='login-primary-button'
        label={'Logout'}
        enable={true}
        type='submit'
        onClick={() => props.onClickHandler()}
      />
    </div>
  );
};

export default DashboardNotAvailable;
