import React, { FC, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PrivateLayout from '../layouts/PrivateLayout';
import { isMobile, isDesktop } from 'react-device-detect';
import { logOutAction, clearLoginAction } from '../redux/actions/login';
import { connect } from 'react-redux';
import { UiRoutes } from '../lib/constants';
import DashboardNotAvailable from '../screens/DashboardNotAvailable';

const PayoutPrivateRoute: FC<{
  component: FC;
  path: string;
  exact?: boolean;
  loginState;
  isAdmin: boolean;
  logOutAction: CallableFunction;
  clearLoginAction: CallableFunction;
  merchantPayoutEnabled: boolean;
}> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { path, exact, ...rest } = props;
  const Component = props.component;

  const { isUserAuthenticated, isWaitingForAPIResponse } = props.loginState;

  useEffect(() => {
    const ele = document.getElementsByClassName('grecaptcha-badge')[0];
    if (ele && !ele.hasAttribute('hidden')) {
      ele?.setAttribute('hidden', 'true');
    }
  }, []);

  return !isWaitingForAPIResponse ? (
    isUserAuthenticated ? (
      isDesktop && !isMobile ? (
        props.isAdmin && !props.loginState.MerchantId ? (
          <Redirect to={UiRoutes.MERCHANT_LISTING} />
        ) : props.merchantPayoutEnabled ? (
          <Route
            path={path}
            exact={exact}
            render={(renderProps) => (
              <PrivateLayout>
                <Component {...renderProps} />
              </PrivateLayout>
            )}
          />
        ) : (
          <Redirect to={UiRoutes.OVERVIEW} />
        )
      ) : (
        <DashboardNotAvailable
          isAdmin={props.isAdmin}
          onClickHandler={
            props.loginState.showOtpScreen
              ? props.clearLoginAction
              : props.logOutAction
          }
        />
      )
    ) : (
      <Redirect to='/login' />
    )
  ) : (
    <React.Fragment></React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  loginState: loginReducer.loginState,
  isAdmin: loginReducer.loginState.isAdmin,
  merchantPayoutEnabled:
    loginReducer?.loginState?.merchantPayoutEnabled ?? false,
});

export default connect(mapStateToProps, { logOutAction, clearLoginAction })(
  PayoutPrivateRoute
);
