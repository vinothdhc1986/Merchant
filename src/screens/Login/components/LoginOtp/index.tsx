import React, { FC, useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import { OtpProps } from './typings';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  setIsTimerComplete,
  fetchLoginOtpAction,
  resendLoginOtpAction,
  validateLoginOtpAction,
  clearResendLoginOtpAction,
  clearValidateLoginOtpAction,
  logOutAction,
  clearLoginAction,
} from '../../../../redux/actions/login';
import { isMobile, isDesktop } from 'react-device-detect';
import DashboardNotAvailable from '../../../DashboardNotAvailable';
import imgURL from '../../../../lib/imgURL';
import Button from '../../../../components/Button';
import Timer from '../../../../components/Timer';
import TextMessage from '../TextMessage';
import notify from 'lib/notifiy';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import { UiRoutes, LOGIN_CONSTANTS, ERROR_CONSTANTS } from 'lib/constants';
import useRedirect from 'hooks/useRedirect';
import './style.scss';
import '../../../NewSignup/style.scss';

const LoginOtp: FC<OtpProps> = (props): JSX.Element => {
  const { UserEmail, isAdmin, showOtpScreen } = props.loginState;
  const styles = {
    bgStrip: {
      background: `url(${imgURL['login-bg']}) 0 0 no-repeat`,
      backgroundSize: 'cover',
    },
  };

  const [toggleTimerResendButton, setToggleTimerResendButton] = useState<
    'TIMER' | 'RESEND'
  >();

  const { validationErrors } = props;
  const { push } = useRedirect();

  const formik = useFormik({
    initialValues: {
      otp: '',
    },
    validationSchema: Yup.object({
      otp: Yup.string(),
    }),
    onSubmit: () => {
      if (!isAdmin)
        pushClevertapEvent(clevertapEventConfigList.LOGIN_OTP_SUBMITTED);
      props.validateLoginOtpAction({
        email: UserEmail,
        isAdmin: isAdmin,
        otp: formik.values.otp,
        otpToken: props.loginOTPState.otpToken,
      });
    },
  });

  useEffect(() => {
    const { isFailure, errorMessage, otpExpired } = props.validateOtpState;
    if (isFailure) {
      let clevertapErrorMessage = '';
      if (otpExpired) {
        setToggleTimerResendButton('RESEND');
        formik.setFieldValue('otp', '');
        clevertapErrorMessage =
          validationErrors.INCORRECT_VERIFICATION_CODE_FOR_FIVE_TIMES;
      } else if (errorMessage === ERROR_CONSTANTS.OTP_IS_NOT_VALID) {
        clevertapErrorMessage = validationErrors.INCORRECT_VERIFICATION_CODE;
        formik.setFieldError(
          'otp',
          validationErrors.INCORRECT_VERIFICATION_CODE
        );
      } else if (errorMessage === ERROR_CONSTANTS.OTP_EXPIRED) {
        clevertapErrorMessage = validationErrors.LOGIN_OTP_EXPIRED;
        formik.setFieldError('otp', validationErrors.LOGIN_OTP_EXPIRED);
      }
      if (clevertapErrorMessage && !isAdmin)
        pushClevertapEvent({
          eventName:
            clevertapEventConfigList.LOGIN_OTP_ERROR_MESSAGE_SHOWN.eventName,
          eventPayload: {
            errorMessage: clevertapErrorMessage,
          },
        });
    }
  }, [props.validateOtpState]);

  useEffect(() => {
    if (showOtpScreen && isDesktop && !isMobile) {
      if (!isAdmin)
        pushClevertapEvent(clevertapEventConfigList.LOGIN_OTP_PAGE_SHOWN);
      props.fetchLoginOtpAction({
        email: UserEmail,
        isAdmin: isAdmin,
        type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_FETCH,
      });
    }
    return () => {
      props.clearValidateLoginOtpAction();
      props.clearResendLoginOtpAction();
    };
  }, []);

  useEffect(() => {
    if (!showOtpScreen) push(isAdmin ? UiRoutes.ADMIN_LOGIN : UiRoutes.LOGIN);
  }, [showOtpScreen]);

  useEffect(() => {
    !props.timerState.isTimerComplete
      ? setToggleTimerResendButton('TIMER')
      : setToggleTimerResendButton('RESEND');
  }, [props.timerState]);

  useEffect(() => {
    const { isFailure, isSuccess, errorMessage, type } = props.loginOTPState;
    if (isFailure) {
      if (errorMessage === ERROR_CONSTANTS.USER_IS_TERMINATED) {
        push(isAdmin ? UiRoutes.ADMIN_LOGIN : UiRoutes.LOGIN);
        notify({
          message: 'Error',
          type: 'error',
          description: validationErrors.USER_IS_TERMINATED,
        });
      }
      if (type === LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_FETCH) {
        // fetch error: show notify and activate resend
        setToggleTimerResendButton('RESEND');
        notify({
          message: 'Something went wrong!',
          type: 'error',
          description: validationErrors.RESEND_OTP,
        });
      }

      if (type === LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_RESEND) {
        if (errorMessage === ERROR_CONSTANTS.INTERNAL_SERVER_ERROR) {
          push(isAdmin ? UiRoutes.ADMIN_LOGIN : UiRoutes.LOGIN);
          notify({
            message: 'Something went wrong!',
            type: 'error',
            description: validationErrors.SOMETHING_WENT_WRONG,
          });
        }
      }
    }
    if (isSuccess) {
      // resend success or fetch success -> show timer
      setToggleTimerResendButton('TIMER');
      if (formik.values.otp) formik.setFieldValue('otp', '');
    }
  }, [props.loginOTPState]);

  const handleResendClick = () => {
    if (!isAdmin) pushClevertapEvent(clevertapEventConfigList.LOGIN_OTP_RESENT);
    props.resendLoginOtpAction({
      email: UserEmail,
      isAdmin: isAdmin,
      type: LOGIN_CONSTANTS.FETCH_LOGIN_OTP_API_TYPE_RESEND,
    });
  };

  return isDesktop && !isMobile ? (
    <React.Fragment>
      <div className='auth-wrapper' style={styles.bgStrip}>
        <div className='top-gradiant'></div>
        <div className='login-warpper'>
          <div className='login-page'>
            <div className='logo-section'>
              <img src={imgURL.logo} alt='logo' />
            </div>
            <div className='form-section otp-form-section'>
              <h2>Enter Verification Code</h2>
              <div className='refresh-message'>
                Do not refresh the page or navigate away during login process.
                Thank you for your patience!
              </div>
              <div className='otp-sub-heading'>
                We sent a verification code to your email address{' '}
                <span>{UserEmail ?? ''}</span>
              </div>
              <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <div
                  className={`form-group otp-field ${
                    formik.errors.otp ? 'otp-field-error' : ''
                  }`}
                >
                  <OtpInput
                    value={formik.values.otp}
                    onChange={(value) => formik.setFieldValue('otp', value)}
                    numInputs={LOGIN_CONSTANTS.OTP_LENGTH}
                    isInputNum={true}
                    isDisabled={props.validateOtpState.otpExpired}
                  />
                  {formik.errors.otp && (
                    <TextMessage type='error' message={formik.errors.otp} />
                  )}
                </div>
                <div className='resend-container'>
                  {toggleTimerResendButton === 'TIMER' ? (
                    <>
                      <div className='resend-timer'>
                        Resend Code in{' '}
                        <span>
                          <Timer
                            countdownTimeInSeconds={
                              LOGIN_CONSTANTS.LOGIN_OTP_EXP_TIME_IN_SECONDS
                            }
                          />
                        </span>
                      </div>
                      <TextMessage
                        type='success'
                        message={`Code sent successfully`}
                      />
                    </>
                  ) : (
                    <div className='resend-button-container'>
                      <Button
                        btnStyleType='roundedSecondary'
                        label={'Resend Code'}
                        enable
                        onClick={handleResendClick}
                      />
                      {props.validateOtpState.otpExpired && (
                        <TextMessage
                          type='error'
                          message={
                            validationErrors.INCORRECT_VERIFICATION_CODE_FOR_FIVE_TIMES
                          }
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className='form-group mb-0 otp-button-section'>
                  <Button
                    btnStyleClass='login-primary-button'
                    label={'Continue'}
                    enable={
                      formik.values.otp.length === LOGIN_CONSTANTS.OTP_LENGTH
                    }
                    type='submit'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='top-gradiant'></div>
      </div>
    </React.Fragment>
  ) : (
    <DashboardNotAvailable
      onClickHandler={
        props.loginState.showOtpScreen
          ? props.clearLoginAction
          : props.logOutAction
      }
      isAdmin={props.loginState.isAdmin}
    />
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  timerState: loginReducer.timerState,
  loginOTPState: loginReducer.loginOTPState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  validateOtpState: loginReducer.validateLoginOtpState,
  loginState: loginReducer.loginState,
});

export default connect(mapStateToProps, {
  setIsTimerComplete,
  fetchLoginOtpAction,
  resendLoginOtpAction,
  validateLoginOtpAction,
  clearResendLoginOtpAction,
  clearValidateLoginOtpAction,
  logOutAction,
  clearLoginAction,
})(LoginOtp);
