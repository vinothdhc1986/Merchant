import React, { FC, useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import imgURL from '../../lib/imgURL';
import Input from '../../components/TextInput';
import Button from '../../components/Button';
import Timer from 'components/Timer';
import useRedirect from '../../hooks/useRedirect';
import {
  UiRoutes,
  passwordValidationRegex,
  emailValidationRegex,
  LOGIN_CONSTANTS,
  ERROR_CONSTANTS,
} from '../../lib/constants';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from 'lib/analyticsUtil';
import { getClientSecretKeyFromStore } from 'lib/helper';
import {
  loginAction,
  clearLoginAction,
  clearForgetPasswordAction,
  clearValidateOtpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
  setUserDataAction,
} from '../../redux/actions/login';
import notify from '../../lib/notifiy';
import Props from './typing';
import '../NewSignup/style.scss';

const ForgotPassword = React.lazy(() => import('./components/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./components/ResetPassword'));
const Otp = React.lazy(() => import('./components/ForgotPasswordOtp'));

const styles = {
  bgStrip: {
    background: `url(${imgURL['login-bg']}) 0 0 no-repeat`,
    backgroundSize: 'cover',
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const Login: FC<Props> = (props): JSX.Element => {
  const { validationErrors } = props;
  const { push, generatePath, path } = useRedirect();
  const [isForgotPopup, setIsForgotPopup] = useState<boolean>(false);
  const [isOtpPopup, setIsOtpPopup] = useState<boolean>(false);
  const [isResetPopup, setIsResetPopup] = useState<boolean>(false);
  const [forgotFormData, setForgotFormData] = useState<{
    email?: string;
  }>({});

  const isAdminLogin = useMemo(() => {
    return path === UiRoutes.ADMIN_LOGIN;
  }, [path]);

  useEffect(() => {
    if (!isAdminLogin) pushClevertapEvent(clevertapEventConfigList.LOGIN_SHOWN);
    if (path === UiRoutes.ADMIN_LOGIN)
      props.setUserDataAction({
        isAdmin: true,
      });
  }, []);

  useEffect(() => {
    if (props.loginState.loginTimeLeft > LOGIN_CONSTANTS.ZERO)
      formik.setFieldValue('email', props.loginState.UserEmail);
  }, [props.loginState.UserEmail, props.loginState.loginTimeLeft]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .max(50, validationErrors.EMAIL_MAX_LENGTH),
      password: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .min(8, validationErrors.PASSWORD_MIN_LENGTH)
        .max(100, validationErrors.PASSWORD_MAX_LENGTH)
        .matches(passwordValidationRegex, validationErrors.PASSWORD_REGEX),
    }),
    onSubmit: () => {
      captchaVerifyHandler();
    },
  });

  const captchaVerifyHandler = () => {
    const SITE_KEY = getClientSecretKeyFromStore();
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(SITE_KEY, { action: 'submit' })
        .then((token) => {
          props.verifyCaptchaAction({ captchaResponse: token });
        });
    });
  };

  useEffect(() => {
    if (props.captchaVerifyState.isSuccess && !isResetPopup) {
      props.loginAction({
        EmailId: formik.values.email.trim(),
        Password: formik.values.password,
        isAdmin: isAdminLogin,
      });
      props.clearVerifyCaptchaAction();
    }
    if (props.captchaVerifyState.isFailure) {
      notify({
        message: 'reCaptcha Failed!',
        type: 'error',
        description: validationErrors.CAPTCHA_LOADING_FAILED,
      });
      props.clearVerifyCaptchaAction();
    }
  }, [props.captchaVerifyState.isSuccess, props.captchaVerifyState.isFailure]);

  useEffect(() => {
    const {
      isTokenFailure,
      isFailure,
      opCode,
      message,
      isAdmin,
      isSuccess,
      showOtpScreen,
      loginTimeLeft,
      remainingAttempts,
    } = props.loginState;
    if (isSuccess) {
      if (showOtpScreen) {
        props.setUserDataAction({
          isSuccess: false,
        });
        if (!isAdminLogin)
          pushClevertapEvent(
            clevertapEventConfigList.LOGIN_PAGE_EXITED_CONTINUE
          );
        push(UiRoutes.LOGIN_OTP);
      }
    } else if (isFailure) {
      if (opCode === '8215') {
        notify({
          message: validationErrors.INVALID_CREDENTIALS,
          type: 'error',
          description: remainingAttempts
            ? validationErrors.REMAINING_ATTEMPTS.replace(
                '${remainingAttempts}',
                remainingAttempts
              )
            : validationErrors.EMAIL_ADDRESS_OR_PASSWORD_IS_INCORRECT,
        });
      } else if (isTokenFailure && opCode === '8090') {
        // refresh token failed - forbidden
        isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
        notify({ message: 'Token', type: 'error', description: message });
      } else if (message === ERROR_CONSTANTS.ACCOUNT_IS_BLOCKED) {
        // already handled this message
      } else if (message === ERROR_CONSTANTS.PASSWORD_EXPIRED) {
        notify({
          message: 'Error',
          type: 'error',
          description: validationErrors.PASSWORD_EXPIRED,
        });
      } else {
        notify({
          message: 'Error',
          type: 'error',
          description: validationErrors.SOMETHING_WENT_WRONG,
        });
      }
      if (loginTimeLeft === LOGIN_CONSTANTS.ZERO) props.clearLoginAction();
    }
  }, [props.loginState]);

  const handleSendOtpButton = (obj: { email?: string }): void => {
    setForgotFormData(obj);
    setIsForgotPopup(false);
    setIsOtpPopup(true);
  };

  const handleCancelClick = (): void => {
    props.clearForgetPasswordAction();
    setForgotFormData({ email: '' });
    setIsForgotPopup(false);
  };

  const handleOtpBackClick = (): void => {
    props.clearForgetPasswordAction();
    props.clearValidateOtpAction();
    setIsOtpPopup(false);
    setIsForgotPopup(true);
  };

  const handleOtpNextClick = (): void => {
    setIsOtpPopup(false);
    setIsResetPopup(true);
  };

  return (
    <React.Fragment>
      <div className='auth-wrapper' style={styles.bgStrip}>
        <div className='top-gradiant'></div>
        <div className='login-warpper'>
          <div className='login-page'>
            <div className='logo-section'>
              <img src={imgURL.logo} alt='logo' />
            </div>
            <div className='form-section'>
              <h2>Log in to your account</h2>
              <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <Input
                  id='email'
                  label='Email'
                  name='email'
                  value={formik.values.email}
                  className='email-field'
                  placeholder='example@xyzmail.com'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  errorMessage={formik.errors.email}
                />
                <Input
                  id='password'
                  label='Password'
                  name='password'
                  type='password'
                  value={formik.values.password}
                  className='password-field'
                  placeholder='Enter Password'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  errorMessage={formik.errors.password}
                  forgotPassword={
                    <a
                      href=''
                      onClick={(e) => {
                        e.preventDefault();
                        setIsForgotPopup(true);
                        if (!isAdminLogin)
                          pushClevertapEvent(
                            clevertapEventConfigList.LOGIN_PAGE_EXITED_FORGOT_PASSWORD
                          );
                      }}
                      className='forgot'
                    >
                      Forgot your password?
                    </a>
                  }
                />

                {Boolean(
                  props.loginState.loginTimeLeft > LOGIN_CONSTANTS.ZERO
                ) && (
                  <div
                    className={`suspended-user-timer ${
                      formik.values.email?.trim() !== props.loginState.UserEmail
                        ? 'suspended-user-timer-hidden'
                        : ''
                    }`}
                  >
                    Your account is currently suspended. Your suspension will
                    end in{' '}
                    <Timer
                      countdownTimeInSeconds={props.loginState.loginTimeLeft}
                      onComplete={() => {
                        props.setUserDataAction({
                          loginTimeLeft: LOGIN_CONSTANTS.ZERO,
                        });
                      }}
                    />{' '}
                    minutes.
                  </div>
                )}

                <div className='form-group mb-0'>
                  <Button
                    btnStyleClass='login-primary-button'
                    label='Continue'
                    enable={
                      props.loginState.loginTimeLeft === LOGIN_CONSTANTS.ZERO ||
                      formik.values.email !== props.loginState.UserEmail
                    }
                    type='submit'
                  />

                  {!isAdminLogin && (
                    <div className='tag'>
                      Don’t have an account?{' '}
                      <a
                        href=''
                        onClick={(e) => {
                          e.preventDefault();
                          pushClevertapEvent(
                            clevertapEventConfigList.LOGIN_PAGE_EXITED_SIGN_UP
                          );
                          props.clearLoginAction();
                          push(generatePath(UiRoutes.SIGNUP));
                        }}
                      >
                        Sign Up
                      </a>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='top-gradiant'></div>

        {isForgotPopup && (
          <ForgotPassword
            formData={forgotFormData}
            onCancelClick={handleCancelClick}
            onSendOtpClick={handleSendOtpButton}
            isAdmin={isAdminLogin}
          />
        )}
        {isOtpPopup && (
          <Otp
            formData={forgotFormData}
            length={LOGIN_CONSTANTS.OTP_LENGTH}
            onBackClick={handleOtpBackClick}
            onNextClick={handleOtpNextClick}
          />
        )}
        {isResetPopup && (
          <ResetPassword
            onCancelClick={() => {
              setIsResetPopup(false);
              props.clearForgetPasswordAction();
              props.clearValidateOtpAction();
              setForgotFormData({ email: '' });
            }}
            onSaveClick={() => {
              setIsResetPopup(false);
            }}
            isAdmin={isAdminLogin}
          />
        )}

        {/* TODO: {isLoader && <Loader message={'Logging you in'} />} */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  loginState: loginReducer.loginState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  captchaVerifyState: loginReducer.captchaVerifyState,
});

export default connect(mapStateToProps, {
  loginAction,
  clearLoginAction,
  clearForgetPasswordAction,
  clearValidateOtpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
  setUserDataAction,
})(Login);
