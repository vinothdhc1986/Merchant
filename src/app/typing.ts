interface Props {
  loaderState?;
  refreshTokenAction: CallableFunction;
  loginState: {
    isAdmin: boolean;
    token: string;
    tokenExpiryInSec: number;
    isUserAuthenticated: boolean;
    isTokenFailure: boolean;
    UserFullName: string;
    HardLogOutTime: number;
    IdleTimeOutTime: number;
  };
  clearLoginAction: CallableFunction;
  logOutAction: CallableFunction;
  clearLogOutAction: CallableFunction;
  logOutState: {
    isSuccess: boolean;
    isUserLoggedOut: boolean;
    isFailure: boolean;
    message: string;
  };
  validationErrorAction: CallableFunction;
  clearValidationErrorAction: CallableFunction;
  userPermissions;
  getClientSecretKeyAction: CallableFunction;
}

export default Props;
