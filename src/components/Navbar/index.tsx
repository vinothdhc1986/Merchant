import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileMenu from 'screens/ProfileMenu';
import SupportModal from './SupportModal';
import Popper from 'components/Popper';
import TestEnvLabel from '../TestEnvLabel';
import { clearChangePasswordAction } from 'redux/actions/login';
import {
  clearMerchantInfoAction,
  getTRMRedirectUrlAction,
  clearTRMRedirectUrlStateAction,
} from '../../redux/actions/login';
import imgURL from 'lib/imgURL';
import { getProfileImgText } from 'lib/helper';
import notify from '../../lib/notifiy';
import ChangePassword from './ChangePassword';
import { redirectToUrl } from '../../lib/helper';
import useRedirect from '../../hooks/useRedirect';
import { SETTINGS_TAB_CONSTANTS, UiRoutes } from '../../lib/constants';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from '../../lib/analyticsUtil';
import Props from './typing';
import './style.scss';
// import Badge from 'antd/lib/badge';
// import CustomSearchInput from '../CustomSearchInput';
// import NotificationDropdown from './NotificationDropdown';

const Navbar: FC<Props> = (props): JSX.Element => {
  const { push } = useRedirect();

  const [isProfileMenu, setIsProfileMenu] = useState<boolean>(false);
  const [isChangePasswordModal, setIsChangePassword] = useState<boolean>(false);

  const [supportModalVisible, setSupportModalVisible] =
    useState<boolean>(false);
  // const [showNotificationDropdown, setShowNotificationDropdown] =
  //   useState<boolean>(false);

  const handleClickChangePassword = () => {
    setIsChangePassword(true);
    setIsProfileMenu(false);
  };

  const handleCancelChangePasswordClick = () => {
    setIsChangePassword(false);
    props.clearChangePasswordAction();
  };

  useEffect(() => {
    const { isSuccess, trmRedirectUrl, isFailure, responseMessage } =
      props.trmRedirectUrlState;
    if (isSuccess && trmRedirectUrl) {
      redirectToUrl(trmRedirectUrl);
      props.clearTRMRedirectUrlStateAction();
    } else if (isFailure) {
      notify({
        type: 'error',
        message: responseMessage,
        description: '',
      });
      props.clearTRMRedirectUrlStateAction();
    }
  }, [props.trmRedirectUrlState]);

  const showSupportModal = () => {
    return (
      <SupportModal
        handleClose={() => setSupportModalVisible(false)}
        merchantId={props?.loginState?.MerchantId}
      />
    );
  };

  return (
    <React.Fragment>
      <nav
        className={`navbar ${props.isCollapsed ? 'navbar-collapsed' : ''}
        ${
          process.env.REACT_APP_BUILD_ENV !== 'qa' &&
          process.env.REACT_APP_BUILD_ENV !== 'stag'
            ? 'justify-content-flex-end'
            : ''
        }
        `}
        id='plural-xt-sticky-header'
      >
        {/* <CustomSearchInput /> */}

        {(process.env.REACT_APP_BUILD_ENV === 'qa' ||
          process.env.REACT_APP_BUILD_ENV === 'stag') && <TestEnvLabel />}

        <div
          className={`top-right ${
            process.env.REACT_APP_BUILD_ENV === 'qa' ||
            process.env.REACT_APP_BUILD_ENV === 'stag'
              ? 'top-right-max-width'
              : ''
          }`}
        >
          <ul>
            {/* TODO: To be added in the next sprint 
            <li style={{cursor:'pointer'}}>
              <Popper
                visible={showNotificationDropdown}
                placement='bottomRight'
                onVisibleChange={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                }}
                content={<NotificationDropdown />}
              >
                <Badge
                  count={12}
                  overflowCount={99}
                  size='small'
                  offset={[-4, 4]}
                >
                  <img
                    src={imgURL['notification-icon']}
                    className='notification-icon'
                  ></img>
                </Badge>
              </Popper>
            </li> */}
            {Boolean(props.isAdmin && props.loginState.MerchantId) && (
              <>
                <span className='cursor-pointer all-merchant-button-wrapper'>
                  <img
                    src={imgURL['back-arrow-blue']}
                    className='back-arrow-blue'
                  />
                  <button
                    onClick={() => props.clearMerchantInfoAction({})}
                    className='header-blue-button'
                  >
                    All Merchants
                  </button>
                </span>
                <div className='divider'></div>
                <button
                  onClick={() =>
                    push(UiRoutes.SETTINGS, {
                      tab: SETTINGS_TAB_CONSTANTS.customization.value,
                    })
                  }
                  className='header-blue-button'
                >
                  Customizations
                </button>
                <div className='divider'></div>
                <li>
                  <div
                    title={`${props.loginState.merchantName?.split(' ')[0]} ( ${
                      props.loginState.MerchantId
                    } )`}
                    className='merchant-name'
                  >
                    {props.loginState.merchantName?.split(' ')[0]} ({' '}
                    {props.loginState.MerchantId} )
                  </div>
                </li>
                <div className='divider'></div>
              </>
            )}
            {props.showTrmPortalLink && (
              <>
                <li>
                  <span
                    onClick={() => {
                      props.getTRMRedirectUrlAction();
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={imgURL['trm-icon']} alt='trm' />
                    TRM
                  </span>
                </li>
                <div className='divider'></div>
              </>
            )}
            {!props.isAdmin && (
              <>
                <li>
                  <span
                    onClick={() => setSupportModalVisible(true)}
                    style={{ cursor: 'pointer' }}
                    className='overflow-ellipse'
                    title={'Contact Support'}
                  >
                    <img src={imgURL.phone} alt='phone' />
                    Contact Support
                  </span>
                </li>
                <div className='divider'></div>
                <li>
                  <span
                    onClick={() => {
                      pushClevertapEvent(
                        clevertapEventConfigList.DOCUMENTATION_CLICKED
                      );
                      window.open(`${process.env.REACT_APP_DOCUMENTATION_URL}`);
                    }}
                    style={{ cursor: 'pointer' }}
                    className='overflow-ellipse'
                    title={'Documentation'}
                  >
                    <img src={imgURL['help-icon']} alt='help' />
                    Documentation
                  </span>
                </li>
                <div className='divider'></div>
              </>
            )}

            <li className='dropdown'>
              {/* <div className='user-profile'>
                {props?.loginState?.UserFullName
                  ? getProfileImgText(props.loginState.UserFullName)
                  : 'N/A'}
              </div> */}
              <Popper
                visible={isProfileMenu}
                placement='bottomRight'
                parentId='plural-xt-sticky-header'
                onVisibleChange={() => {
                  setIsProfileMenu(!isProfileMenu);
                }}
                content={
                  <ProfileMenu
                    handleClickChangePassword={handleClickChangePassword}
                    clearMerchantInfoAction={() =>
                      props.clearMerchantInfoAction({})
                    }
                  />
                }
                className='popper-navbar'
              >
                {/* <div className='user-name'>
                  {props?.loginState?.UserFullName?.split(' ')[0]}
                </div>
                <img src={imgURL['dropdown-icon']}></img> */}
                <div className='user-profile'>
                  {props?.loginState?.UserFullName
                    ? getProfileImgText(props.loginState.UserFullName)
                    : 'N/A'}
                </div>
              </Popper>
            </li>
          </ul>
        </div>
      </nav>
      {supportModalVisible && showSupportModal()}
      {isChangePasswordModal && (
        <ChangePassword cancelHandler={handleCancelChangePasswordClick} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = ({
  sidebarReducer,
  loginReducer,
  validationReducer,
}) => ({
  isCollapsed: sidebarReducer.isCollapsed,
  loginState: loginReducer.loginState,
  isAdmin: loginReducer.loginState.isAdmin,
  validationErrorState: validationReducer.validationErrorState.validationErrors,
  showTrmPortalLink: loginReducer.loginState.showTrmPortalLink || false,
  trmRedirectUrlState: loginReducer.trmRedirectUrlState,
});

export default connect(mapStateToProps, {
  clearChangePasswordAction,
  clearMerchantInfoAction,
  getTRMRedirectUrlAction,
  clearTRMRedirectUrlStateAction,
})(Navbar);
