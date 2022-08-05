import React, { FC, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { UiRoutes } from '../lib/constants';
import { getClientSecretKeyFromStore } from '../lib/helper';

const OpenRoute: FC<{
  component: FC;
  path: string;
  exact?: boolean;
  loginState;
}> = (props) => {
  const { path, exact } = props;
  
  const clientSecretKey =  getClientSecretKeyFromStore();

  useEffect(()=>{
    if(clientSecretKey){
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);
      if (!isScriptExist) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        script.id = id;
        script.onload = function () {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };
    // load the script by passing the URL
    loadScriptByURL("recaptcha-key", `https://www.google.com/recaptcha/api.js?render=${clientSecretKey}`, function () {
    });}
  },[clientSecretKey]);

  useEffect(() => {
    const ele = document.getElementsByClassName('grecaptcha-badge')[0];
    if (ele?.hasAttribute('hidden')) {
      ele.removeAttribute('hidden');
    }
  }, []);

  const { isUserAuthenticated } = props.loginState;
  return !isUserAuthenticated ? (
    <Route path={path} exact={exact} component={props.component} />
  ) : (
    <Redirect to={UiRoutes.OVERVIEW} />
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  loginState: loginReducer.loginState,
});

export default connect(mapStateToProps)(OpenRoute);
