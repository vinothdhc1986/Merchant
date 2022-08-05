interface Props {
  idleTimeout: number;
  afterIdleHardLogoutTime: number;
  logoutAction: CallableFunction;
  refreshTokenAction: CallableFunction;
}

export default Props;
