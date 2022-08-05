import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ERROR_CONSTANTS,
  passwordValidationRegex,
} from '../../../../lib/constants';
import Input from '../../../../components/TextInput';
import Modal from '../Modal';
import imgURL from '../../../../lib/imgURL';
import Button from '../../../../components/Button';
import {
  saveNewPasswordAction,
  clearSaveNewPasswordAction,
  clearForgetPasswordAction,
  clearValidateOtpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
} from '../../../../redux/actions/login';
import { getClientSecretKeyFromStore } from 'lib/helper';
import notify from '../../../../lib/notifiy';
import { ResetPasswordProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const ResetPassword: FC<ResetPasswordProps> = (props): JSX.Element => {
  const { onCancelClick, onSaveClick, validationErrors } = props;

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .min(8, validationErrors.PASSWORD_MIN_LENGTH)
        .max(100, validationErrors.PASSWORD_MAX_LENGTH)
        .matches(passwordValidationRegex, validationErrors.PASSWORD_REGEX),
      confirmPassword: Yup.string().when('newPassword', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .required(validationErrors.REQUIRED_FIELD)
          .oneOf(
            [Yup.ref('newPassword')],
            validationErrors.PASSWORD_MATCH_ERROR
          ),
        otherwise: Yup.string()
          .required(validationErrors.REQUIRED_FIELD)
          .min(8, validationErrors.PASSWORD_MIN_LENGTH)
          .max(100, validationErrors.PASSWORD_MAX_LENGTH)
          .matches(passwordValidationRegex, validationErrors.PASSWORD_REGEX),
      }),
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
    if (props.captchaVerifyState.isSuccess) {
      props.saveNewPasswordAction({
        NewPassword: formik.values.confirmPassword,
        otpToken: props.forgetPasswordState.otpToken,
        isAdmin: props.isAdmin,
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
    const { isSuccess, isPasswordChanged, isFailure, message, opCode } =
      props.saveNewPasswordState;
    if (isFailure) {
      if (opCode === '8190') {
        formik.setFieldError('newPassword', validationErrors.SIMILAR_PASSWORD);
      } else if (message === ERROR_CONSTANTS.MAX_RESET_PASSWORD_LIMIT_REACHED) {
        formik.setFieldError(
          'newPassword',
          validationErrors.MAX_RESET_PASSWORD_LIMIT_REACHED
        );
      } else {
        formik.setFieldError('newPassword', message);
      }
    } else if (isSuccess && isPasswordChanged) {
      props.clearForgetPasswordAction();
      props.clearValidateOtpAction();
      props.clearSaveNewPasswordAction();
      notify({
        message: 'Success',
        type: 'success',
        description: validationErrors?.PASSWORD_CHANGED ?? '',
      });
      onSaveClick();
    } else if (isSuccess && !isPasswordChanged) {
      formik.setFieldError('newPassword', message);
    }
  }, [props.saveNewPasswordState]);

  return (
    <React.Fragment>
      <Modal
        className={'forgot-model'}
        backButtonEnable={false}
        title={'Reset Your Password'}
        onBackdropClick={onCancelClick}
      >
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <Input
            id='newPassword'
            label='New Password'
            type='password'
            name='newPassword'
            value={formik.values.newPassword}
            className='password-field'
            placeholder='Enter password'
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            bgIcon={imgURL['password-icon']}
            error={Boolean(
              formik.touched.newPassword && formik.errors.newPassword
            )}
            errorMessage={formik.errors.newPassword}
          />
          <Input
            id='confirmPassword'
            label='Confirm New Password'
            type='password'
            value={formik.values.confirmPassword}
            className='password-field'
            placeholder='Re-enter password'
            handleChange={formik.handleChange}
            bgIcon={imgURL['password-icon']}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            errorMessage={formik.errors.confirmPassword}
          />
          <div className='action-button'>
            <button
              className='secondry-button'
              type='reset'
              onClick={onCancelClick}
            >
              Cancel
            </button>
            <Button
              btnStyleClass='primary-button'
              label='Save Password'
              enable={
                (formik.values.newPassword &&
                  formik.values.confirmPassword &&
                  !formik.errors.newPassword &&
                  !formik.errors.confirmPassword &&
                  formik.values.newPassword ===
                    formik.values.confirmPassword) ||
                undefined
              }
              type='submit'
            />
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  forgetPasswordState: loginReducer.forgetPasswordState,
  saveNewPasswordState: loginReducer.saveNewPasswordState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  captchaVerifyState: loginReducer.captchaVerifyState,
});

export default connect(mapStateToProps, {
  saveNewPasswordAction,
  clearSaveNewPasswordAction,
  clearForgetPasswordAction,
  clearValidateOtpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
})(ResetPassword);
