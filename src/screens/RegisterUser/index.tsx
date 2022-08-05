import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import imgURL from '../../lib/imgURL';
import Input from '../../components/TextInput';
import Button from '../../components/Button';
import useRedirect from '../../hooks/useRedirect';
import { UiRoutes, passwordValidationRegex } from '../../lib/constants';
import {
  newSignUpAction,
  clearNewSignUpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
  validateInvitationAction,
  clearValidateInvitationAction,
} from '../../redux/actions/login';
import { getClientSecretKeyFromStore } from 'lib/helper';
import notify from '../../lib/notifiy';
import Props from './typing';
import '../NewSignup/style.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const RegisterUser: FC<Props> = (props): JSX.Element => {
  const { validationErrors } = props;
  const { push, path, location } = useRedirect();

  const queryToken = location?.search?.split('token=')[1];
  const isAdmin = Boolean(path === UiRoutes.ADMIN_REGISTER);
  const styles = {
    bgStrip: {
      background: `url(${imgURL['login-bg']}) 0 0 no-repeat`,
      backgroundSize: 'cover',
    },
  };

  useEffect(() => {
    props.validateInvitationAction({
      token: queryToken,
      isAdmin: isAdmin,
    });
    return () => {
      props.clearValidateInvitationAction();
    };
  }, []);

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
      props.newSignUpAction({
        NewPassword: formik.values.newPassword,
        ConfirmPassword: formik.values.confirmPassword,
        Token: queryToken,
        isAdmin: isAdmin,
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
    const { isSuccess, isSignupCompleted, isFailure, message, opCode } =
      props.newSignUpState;
    if (isFailure) {
      if (opCode === '8100') {
        notify({
          message: 'Error',
          type: 'error',
          description: validationErrors?.USER_DOES_NOT_EXISTS ?? '',
        });
      } else {
        notify({
          message: 'Error',
          type: 'error',
          description: message,
        });
      }
    } else if (isSuccess && isSignupCompleted) {
      props.clearNewSignUpAction();
      notify({
        message: 'Success',
        type: 'success',
        description: validationErrors?.PASSWORD_SAVED ?? '',
      });

      isAdmin ? push(UiRoutes.ADMIN_LOGIN) : push(UiRoutes.LOGIN);
    } else if (isSuccess && !isSignupCompleted) {
      notify({
        message: 'Error',
        type: 'error',
        description: validationErrors?.TOKEN_EXPIRED,
      });
    }
  }, [props.newSignUpState]);

  const validURL = queryToken ? props.validateInvitationState.isSuccess : false;
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
              <h2>Welcome to Plural</h2>
              {validURL ? (
                <React.Fragment>
                  <p>
                    Your account has been created. Please set a secure password
                    to access your account.
                  </p>
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
                        formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                      )}
                      errorMessage={formik.errors.confirmPassword}
                    />
                    <div className='form-group mb-0'>
                      <Button
                        btnStyleClass='login-primary-button'
                        label='Set Password'
                        enable={true}
                        type='submit'
                      />
                    </div>
                  </form>
                </React.Fragment>
              ) : (
                <p>
                  This link is no longer valid. Please contact your
                  merchant&apos;s admin for resending the invitation.
                </p>
              )}
            </div>
          </div>
        </div>
        <div className='top-gradiant'></div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ loginReducer, validationReducer }) => ({
  validationErrors: validationReducer.validationErrorState.validationErrors,
  newSignUpState: loginReducer.newSignUpState,
  captchaVerifyState: loginReducer.captchaVerifyState,
  validateInvitationState: loginReducer.validateInvitationState,
});

export default connect(mapStateToProps, {
  clearNewSignUpAction,
  newSignUpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
  validateInvitationAction,
  clearValidateInvitationAction,
})(RegisterUser);
