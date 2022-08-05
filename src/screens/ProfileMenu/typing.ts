interface Props {
  clearLoginAction: CallableFunction;
  logOutAction: CallableFunction;
  loginState: {
    UserFullName: string;
    UserEmail: string;
    lastLoggedIn: string | number | Date;
    failedLoginTime: string | number | Date;
    isAdmin: boolean;
  };
  clearChangePasswordAction: CallableFunction;
  clearLogOutAction: CallableFunction;
  handleClickChangePassword: CallableFunction;
  clearMerchantInfoAction: CallableFunction;
}

export default Props;
