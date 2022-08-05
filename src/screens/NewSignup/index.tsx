import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DialCodePhoneInput from '../../components/DialCodePhoneInput';
import imgURL from '../../lib/imgURL';
import Swiper from '../../components/Swiper';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import {
  UiRoutes,
  passwordValidationRegex,
  nameValidationRegex,
  selectedCountryPhoneRegex,
  emailValidationRegex,
} from '../../lib/constants';
import useRedirect from '../../hooks/useRedirect';
import { signupAction, clearSignUpAction } from '../../redux/actions/signup';
import {
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
} from '../../redux/actions/login';
import notify from '../../lib/notifiy';
import { getClientSecretKeyFromStore } from 'lib/helper';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from 'lib/analyticsUtil';
import SignUpProps from './typings';
import './style.scss';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;

const SignUp: FC<SignUpProps> = (props): JSX.Element => {
  const { validationErrors } = props;
  const { push, generatePath } = useRedirect();

  const styles = {
    bgStrip: {
      background: `url(${imgURL['login-bg']}) 0 0 no-repeat`,
      backgroundSize: 'cover',
    },
  };

  const [selectedCountry, setSelectedCountry] = useState('');
  const [dialCode, setDialCode] = useState('');
  const selectedCountryRegex = selectedCountryPhoneRegex[selectedCountry];

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .max(50, validationErrors.USER_NAME_MAX_LENGTH)
        .matches(nameValidationRegex, validationErrors.INVALID_USER_NAME)
        .trim(),
      email: Yup.string()
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .required(validationErrors.REQUIRED_FIELD)
        .max(50, validationErrors.EMAIL_MAX_LENGTH)
        .trim(),
      phone: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(selectedCountryRegex, validationErrors.INVALID_PHONE),
      password: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .min(8, validationErrors.PASSWORD_MIN_LENGTH)
        .max(100, validationErrors.PASSWORD_MAX_LENGTH)
        .matches(passwordValidationRegex, validationErrors.PASSWORD_REGEX),
      confirmPassword: Yup.string().when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .required(validationErrors.REQUIRED_FIELD)
          .oneOf([Yup.ref('password')], validationErrors.PASSWORD_MATCH_ERROR),
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
      const rawPhone = formik.values.phone.slice(dialCode.length);
      props.signupAction({
        MerchantName: formik.values.name.trim(),
        EmailId: formik.values.email.trim(),
        MobileNumber: rawPhone,
        DialCode: `+${dialCode}`,
        Password: formik.values.password,
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
    const { isSuccess, isFailure, opCode } = props.signupState;
    if (isSuccess) {
      props.clearSignUpAction();
      pushClevertapEvent(
        clevertapEventConfigList.SIGN_UP_EXITED_CREATE_ACCOUNT
      );
      push(UiRoutes.LOGIN);
      notify({
        message: 'Success',
        type: 'success',
        description: validationErrors?.SIGNUP_SUCCESS ?? '',
      });
    } else if (isFailure) {
      if (opCode === '8250') {
        formik.setFieldError('name', validationErrors.NAME_ALREADY_EXISTS);
      } else if (opCode === '8120') {
        formik.setFieldError('email', validationErrors.USER_ALREADY_EXIST);
      }
    }
  }, [props.signupState]);

  useEffect(() => {
    pushClevertapEvent(clevertapEventConfigList.SIGN_UP_SHOWN);
  }, []);

  return (
    <React.Fragment>
      <div className='auth-wrapper' style={styles.bgStrip}>
        <div className='top-gradiant'></div>
        <div className='signup-warpper'>
          <div className='mob-logo logo-section'>
            <img src={imgURL.logo} alt='logo' />
          </div>
          <div className='login-left-section'>
            <div className='logo-section'>
              <img src={imgURL.logo} alt='logo' />
            </div>
            <Swiper />
          </div>

          <div className='right-left-section'>
            <div className='form-section'>
              <h2>Let&#39;s get you set up</h2>
              <form onSubmit={formik.handleSubmit}>
                <TextInput
                  id='name'
                  placeholder='Enter Name'
                  label='Full Name'
                  name='name'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  errorMessage={formik.errors.name}
                  value={formik.values.name}
                />
                <TextInput
                  id='email'
                  placeholder={'example@xyzmail.com'}
                  label={'Email'}
                  name='email'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  errorMessage={formik.errors.email}
                  value={formik.values.email}
                />
                <DialCodePhoneInput
                  id='phone'
                  placeholder='Enter your mobile no.'
                  label='Phone Number'
                  name='phone'
                  handleChange={(value, data) => {
                    setSelectedCountry(data.name);
                    setDialCode(data.dialCode);
                    formik.setFieldValue('phone', value);
                  }}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                  errorMessage={formik.errors.phone}
                  value={formik.values.phone}
                  inputProps={{
                    name: 'phone',
                  }}
                  country={'in'}
                  onlyCountries={['in']}
                  masks={{ in: '..........' }}
                  countryCodeEditable={false}
                />
                <TextInput
                  id='password'
                  type={'password'}
                  placeholder='Enter Password'
                  label='Password'
                  className={'password-field'}
                  name='password'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  errorMessage={formik.errors.password}
                  value={formik.values.password}
                />
                <TextInput
                  id='confirmPassword'
                  className={'password-field'}
                  type={'password'}
                  placeholder='Re-enter Password'
                  label='Confirm Password'
                  name='confirmPassword'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                  )}
                  errorMessage={formik.errors.confirmPassword}
                  value={formik.values.confirmPassword}
                />

                <div className='form-group mb-0'>
                  <Button
                    btnStyleClass='login-primary-button'
                    label={'Create Account'}
                    enable
                    type='submit'
                  />
                  <div className='tag'>
                    Have an account?{' '}
                    <a
                      href=''
                      onClick={(e) => {
                        e.preventDefault();
                        pushClevertapEvent(
                          clevertapEventConfigList.SIGN_UP_EXITED_SIGN_IN
                        );
                        push(generatePath(UiRoutes.LOGIN));
                      }}
                    >
                      Sign In
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='top-gradiant'></div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  signupReducer,
  validationReducer,
  loginReducer,
}) => ({
  signupState: signupReducer.signupState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  captchaVerifyState: loginReducer.captchaVerifyState,
});

export default connect(mapStateToProps, {
  signupAction,
  clearSignUpAction,
  verifyCaptchaAction,
  clearVerifyCaptchaAction,
})(SignUp);
