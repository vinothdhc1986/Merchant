import React, { FC, Suspense, useCallback, useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import IdleTimerContainer from './components/IdleTimer';
import notify from '../lib/notifiy';
import ErrorScreen from '../components/ErrorScreen';
import Loader from '../components/Loader';
import OpenRoute from '../routes/OpenRoute';
import routesConfig from '../routes/routesConfig';
import PrivateRoute from '../routes/PrivateRoute';
import AdminLoginPrivateRoute from '../routes/AdminLoginPrivateRoute';
import PayoutPrivateRoute from '../routes/PayoutPrivateRoute';
import { checkPermissions, convertSecondsToMilliSeconds } from '../lib/helper';
import {
  refreshTokenAction,
  clearLoginAction,
  logOutAction,
  clearLogOutAction,
  getClientSecretKeyAction,
} from '../redux/actions/login';
import {
  validationErrorAction,
  clearValidationErrorAction,
} from '../redux/actions/validationErrors';
import useRedirect from '../hooks/useRedirect';
import useOnlineHook from '../hooks/useOnlineHook';
import { REFRESH_TOKEN_MARGINAL_TIME, UiRoutes } from '../lib/constants';
import {
  removeUserAuthenticated,
  setUserAuthenticated,
} from '../lib/localStorage';
import Props from './typing';
import { permissionEnum } from '../lib/typing';
import 'antd/dist/antd.css';
import '../scss/common.scss';
import '../components/CustomSwitch/styles.scss';
import imgURL from '../lib/imgURL';
import { routeConfigType } from '../lib/typing';

const App: FC<Props> = (props): JSX.Element => {
  const { push } = useRedirect();
  const isOnline = useOnlineHook();
  const { isAdmin } = props.loginState;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // listner for multi-tab logout
  window.addEventListener('storage', (e) => {
    if (e.key === 'user' && e.oldValue && !e.newValue) {
      props.clearLogOutAction();
      props.clearLoginAction();
      isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
    }
  });

  useEffect(() => {
    props.getClientSecretKeyAction();
    props.refreshTokenAction();
    props.validationErrorAction();
  }, []);

  useEffect(() => {
    const { token, tokenExpiryInSec, isUserAuthenticated, isTokenFailure } =
      props.loginState;

    if (token?.length > 0 && isUserAuthenticated) {
      setUserAuthenticated();
      const tokenExpiryInMilliSeconds = convertSecondsToMilliSeconds(
        tokenExpiryInSec - REFRESH_TOKEN_MARGINAL_TIME
      );

      const tokenExpiryTimer = setTimeout(() => {
        props.refreshTokenAction();
      }, tokenExpiryInMilliSeconds);

      return () => {
        clearTimeout(tokenExpiryTimer);
      };
    } else if (isTokenFailure) {
      removeUserAuthenticated();
      props.clearLogOutAction();
      props.clearLoginAction();
      isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
    }
  }, [
    props.loginState.token,
    props.loginState.isUserAuthenticated,
    props.loginState.tokenExpiryInSec,
  ]);

  useEffect(() => {
    const { isSuccess, isUserLoggedOut, isFailure } = props.logOutState;
    if (isFailure || (isSuccess && !isUserLoggedOut)) {
      props.clearLogOutAction();
      props.clearLoginAction();
      isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
    } else if (isSuccess && isUserLoggedOut) {
      props.clearLogOutAction();
      props.clearLoginAction();
      isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
      notify({
        message: 'Success',
        type: 'success',
        description: 'Logged out successfully.',
        duration: 0.75,
      });
    }
    removeUserAuthenticated();
  }, [props.logOutState]);

  useEffect(() => {
    if (
      props.loaderState &&
      Array.isArray(props.loaderState.actionsLoading) &&
      props.loaderState.actionsLoading.length &&
      !isLoading
    ) {
      setIsLoading(true);
    } else if (
      props.loaderState &&
      Array.isArray(props.loaderState.actionsLoading) &&
      props.loaderState.actionsLoading.length === 0
    ) {
      setIsLoading(false);
    }
  }, [props.loaderState]);

  const checkPermissionMethod = useCallback(
    (permissions: Array<permissionEnum>): boolean => {
      return permissions.some((permissionName) =>
        checkPermissions(permissionName)
      );
    },
    [JSON.stringify(props.userPermissions)]
  );

  const renderLayout = (config: routeConfigType): JSX.Element => {
    switch (config.layout) {
      case 'admin':
        return (
          <AdminLoginPrivateRoute
            path={config.path}
            component={config.component}
            key={config.key}
            exact={config.exact}
          />
        );
      case 'merchant':
        return (
          <PrivateRoute
            path={config.path}
            component={config.component}
            key={config.key}
            exact={config.exact}
          />
        );
      case 'public':
        return (
          <OpenRoute
            path={config.path}
            component={config.component}
            key={config.key}
          />
        );
      case 'merchant-payout':
        return (
          <PayoutPrivateRoute
            path={config.path}
            component={config.component}
            key={config.key}
            exact={config.exact}
          />
        );
      default:
        return (
          <PrivateRoute
            path={config.path}
            component={config.component}
            key={config.key}
            exact={config.exact}
          />
        );
    }
  };

  const renderRoute = (config: routeConfigType): JSX.Element => {
    if (config.allowedPermission) {
      if (checkPermissionMethod(config.allowedPermission)) {
        return renderLayout(config);
      }
      return undefined;
    } else {
      return renderLayout(config);
    }
  };

  return (
    <>
      {!isOnline ? (
        <ErrorScreen
          errorBackground={imgURL['error-background']}
          squareImg={imgURL['square-four']}
        ></ErrorScreen>
      ) : (
        <Suspense fallback={<Loader />}>
          <Switch>
            {routesConfig.map((config) => renderRoute(config))}
            <Route path='/'>
              {isAdmin ? (
                <Redirect to={UiRoutes.ADMIN_LOGIN} />
              ) : (
                <Redirect to={UiRoutes.LOGIN} />
              )}
            </Route>
          </Switch>
        </Suspense>
      )}
      {isLoading && <Loader />}

      {props.loginState.isUserAuthenticated &&
        props.loginState.IdleTimeOutTime > 0 &&
        props.loginState.HardLogOutTime > 0 && (
          <IdleTimerContainer
            idleTimeout={props.loginState.IdleTimeOutTime}
            afterIdleHardLogoutTime={props.loginState.HardLogOutTime}
            logoutAction={() => props.logOutAction()}
            refreshTokenAction={() => props.refreshTokenAction()}
          />
        )}

      {/* Need below images in offline Mode */}
      <img
        src={imgURL['error-background']}
        style={{ width: '0px', height: '0px', display: 'none' }}
      />
      <img
        src={imgURL['square-four']}
        style={{ width: '0px', height: '0px', display: 'none' }}
      />
    </>
  );
};

const mapStateToProps = ({ loaderReducer, loginReducer }) => ({
  loaderState: loaderReducer,
  loginState: loginReducer.loginState,
  logOutState: loginReducer.logOutState,
  userPermissions: loginReducer.permissionState,
});

export default connect(mapStateToProps, {
  refreshTokenAction,
  clearLoginAction,
  logOutAction,
  clearLogOutAction,
  validationErrorAction,
  clearValidationErrorAction,
  getClientSecretKeyAction,
})(App);
