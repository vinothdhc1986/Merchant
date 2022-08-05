import React, { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import PrivateLayout from "../layouts/PrivateLayout";
import { connect } from "react-redux";
import { UiRoutes } from "../lib/constants";

const AdminLoginPrivateRoute: FC<{
  component: FC;
  path: string;
  exact?: boolean;
  loginState;
  isAdmin: boolean;
}> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { path, exact, ...rest } = props;
  const Component = props.component;

  const { isUserAuthenticated, isWaitingForAPIResponse } = props.loginState;

  return !isWaitingForAPIResponse ? (
    isUserAuthenticated ? (
      (props.isAdmin && props.loginState.MerchantId) ||
      !props.isAdmin ? (
        <Redirect to={UiRoutes.OVERVIEW} />
      ) : (
        <Route
          path={path}
          exact={exact}
          render={(renderProps) => (
            <PrivateLayout>
              <Component {...renderProps} />
            </PrivateLayout>
          )}
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
});

export default connect(mapStateToProps)(AdminLoginPrivateRoute);
