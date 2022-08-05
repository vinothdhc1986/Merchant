import React, { FC } from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { logOutAction, clearLogOutAction } from '../../redux/actions/login';
import useRedirect from '../../hooks/useRedirect';
import { SETTINGS_TAB_CONSTANTS, UiRoutes } from '../../lib/constants';
import { getProfileImgText } from '../../lib/helper';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from '../../lib/analyticsUtil';
import { listConstants } from './profile.constants';
import Props from './typing';
import './style.scss';

const ProfileMenu: FC<Props> = (props): JSX.Element => {
  const { push } = useRedirect();

  const handleClickLogOut = () => {
    props.logOutAction();
  };

  const handleClickUserManagement = () => {
    if (props.loginState.isAdmin) {
      push(UiRoutes.ADMIN_USER_MANAGEMENT);
      props.clearMerchantInfoAction();
    } else {
      pushClevertapEvent(
        clevertapEventConfigList.USER_MANAGEMENT_CLICKED_PROFILE
      );
      push(UiRoutes.SETTINGS, {
        tab: SETTINGS_TAB_CONSTANTS.userManagement.value,
      });
    }
  };

  return (
    <React.Fragment>
      <div className='profile-menu-box'>
        <div className='user-detail-profile'>
          <div className='sort-name'>
            {props?.loginState?.UserFullName
              ? getProfileImgText(props.loginState.UserFullName)
              : 'N/A'}
          </div>
          <div className='user-des'>
            <h6>{props?.loginState?.UserFullName ?? 'NA'}</h6>
            <p>{props?.loginState?.UserEmail ?? 'NA'}</p>
            <label>
              Last successful log in on{' '}
              {props?.loginState?.lastLoggedIn
                ? format(
                    new Date(props.loginState.lastLoggedIn),
                    'd MMM hh:mm aa'
                  )
                : 'NA'}
            </label>
            <label>
              {props?.loginState?.failedLoginTime &&
                `Last failed log in attempt on ${format(
                  new Date(props.loginState.failedLoginTime),
                  'd MMM hh:mm aa'
                )}`}
            </label>
          </div>
        </div>
        <ul>
          {listConstants({
            handleClickChangePassword: props.handleClickChangePassword,
            handleClickLogOut,
            handleClickUserManagement,
          }).map((item, index) => (
            <li key={index}>
              <a onClick={item.onClick}>
                <img src={item.src} alt={item.alt} /> {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  loginState: loginReducer.loginState,
});

export default connect(mapStateToProps, {
  logOutAction,
  clearLogOutAction,
})(ProfileMenu);
