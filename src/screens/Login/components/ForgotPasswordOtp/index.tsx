import React, { FC, useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import Timer from '../../../../components/Timer';
import { ERROR_CONSTANTS, LOGIN_CONSTANTS } from '../../../../lib/constants';
import Modal from '../Modal';
import {
  validateOtpAction,
  forgetPasswordAction,
} from '../../../../redux/actions/login';
import { OtpProps } from './typings';
import './style.scss';

const Otp: FC<OtpProps> = (props): JSX.Element => {
  const { length, onBackClick, formData, onNextClick } = props;

  const [otp, setOtp] = useState<string>('');
  const [otpError, setOtpError] = useState<boolean>(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState<string>('');
  const handleChange = (otp: string) => {
    clearOTPError();
    setOtp(otp);
    return false;
  };

  const [toggleTimerResendButton, setToggleTimerResendButton] = useState<
    'TIMER' | 'RESEND' | 'DISABLE'
  >('TIMER');

  useEffect(() => {
    const { isSuccess, isValid, isFailure, errorMessage, showResendButton } =
      props.validateOtpState;
    if (isFailure) {
      setOtpError(true);
      if (errorMessage === ERROR_CONSTANTS.MAX_OTP_ATTEMPTS_LIMIT_REACHED) {
        setOtpErrorMessage(
          props.validationErrors?.MAX_OTP_ATTEMPTS_LIMIT_REACHED
        );
        setToggleTimerResendButton('DISABLE');
      } else if (errorMessage === ERROR_CONSTANTS.OTP_EXPIRED) {
        setOtpErrorMessage(props.validationErrors?.LOGIN_OTP_EXPIRED);
      } else if (showResendButton) {
        setToggleTimerResendButton('RESEND');
        setOtpErrorMessage(
          props.validationErrors?.INCORRECT_VERIFICATION_CODE_FOR_FIVE_TIMES
        );
        setOtp('');
      } else {
        setOtpErrorMessage(props.validationErrors?.INCORRECT_OTP);
      }
    } else if (isSuccess && isValid) {
      onNextClick();
    } else if (isSuccess && !isValid) {
      setOtpError(true);
      setOtpErrorMessage(props.validationErrors?.INCORRECT_OTP);
    }
  }, [props.validateOtpState]);

  useEffect(() => {
    const { isSuccess, isFailure, message } = props.forgetPasswordState;
    if (isFailure) {
      if (message === ERROR_CONSTANTS.MAX_OTP_ATTEMPTS_LIMIT_REACHED) {
        setOtpError(true);
        setOtpErrorMessage(
          props.validationErrors?.MAX_OTP_ATTEMPTS_LIMIT_REACHED
        );
        setToggleTimerResendButton('DISABLE');
      }
    }
    if (isSuccess) {
      clearOTPError();
      setToggleTimerResendButton('TIMER');
    }
  }, [props.forgetPasswordState]);

  const handleNextClick = (e) => {
    e.preventDefault();
    if (otp.length !== length) {
      setOtpError(true);
    } else {
      props.validateOtpAction({
        otpToken: props.forgetPasswordState.otpToken,
        otpValue: otp,
      });
    }
  };

  const handleResendClick = () => {
    props.forgetPasswordAction({
      EmailId: formData.email,
    });
  };

  const timerOnComplete = () => {
    setToggleTimerResendButton('RESEND');
  };

  const clearOTPError = () => {
    setOtpError(false);
    setOtpErrorMessage('');
  };

  return (
    <React.Fragment>
      <Modal
        className={'forgot-model'}
        backButtonEnable={true}
        onBackButtonClick={onBackClick}
        title={'Enter OTP'}
        description={`Enter the ${length} digit code sent to ${formData.email}`}
      >
        <div
          className={`form-group otp-field ${
            otpError ? `otp-field-error` : ''
          }`}
        >
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={length}
            isInputNum={true}
            isDisabled={props.validateOtpState.showResendButton}
          />

          {otpError && <div className='error'>{otpErrorMessage}</div>}
        </div>

        <div
          className={`resend-timer text-left top-margin ${
            toggleTimerResendButton !== 'TIMER' ? `invisible` : ``
          }`}
        >
          {' '}
          Resend Code in{' '}
          {toggleTimerResendButton === 'TIMER' && (
            <span>
              <Timer
                countdownTimeInSeconds={
                  LOGIN_CONSTANTS.LOGIN_OTP_EXP_TIME_IN_SECONDS
                }
                onComplete={timerOnComplete}
              />
            </span>
          )}
        </div>
        <div className='action-button'>
          <button
            className={`secondry-button resend ${
              toggleTimerResendButton !== 'RESEND' ? `dissable` : ``
            }`}
            onClick={handleResendClick}
            disabled={
              toggleTimerResendButton === 'DISABLE'
                ? true
                : toggleTimerResendButton !== 'RESEND'
            }
          >
            Resend
          </button>{' '}
          <button
            className={`primary-button ${
              toggleTimerResendButton === 'DISABLE'
                ? 'dissable'
                : otp.length !== length
                ? 'dissable'
                : ''
            }`}
            disabled={
              toggleTimerResendButton === 'DISABLE'
                ? true
                : otp.length !== length
            }
            onClick={handleNextClick}
          >
            Next
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  validateOtpState: loginReducer.validateOtpState,
  forgetPasswordState: loginReducer.forgetPasswordState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, {
  validateOtpAction,
  forgetPasswordAction,
})(Otp);
