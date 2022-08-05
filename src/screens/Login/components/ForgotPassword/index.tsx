import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../Modal';
import imgURL from '../../../../lib/imgURL';
import Button from '../../../../components/Button';
import Input from '../../../../components/TextInput';
import { forgetPasswordAction } from '../../../../redux/actions/login';
import { emailValidationRegex, ERROR_CONSTANTS, UiRoutes } from 'lib/constants';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from 'lib/analyticsUtil';
import useRedirect from '../../../../hooks/useRedirect';
import { ForgotPasswordProps } from './typing';

const ForgotPassword: FC<ForgotPasswordProps> = (props): JSX.Element => {
  const { onCancelClick, onSendOtpClick, validationErrors } = props;

  const { push } = useRedirect();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .required(validationErrors.REQUIRED_FIELD)
        .max(50, validationErrors.EMAIL_MAX_LENGTH),
    }),
    onSubmit: (values) => {
      props.forgetPasswordAction({
        EmailId: values.email.trim(),
        isAdmin: props.isAdmin,
      });
    },
  });

  useEffect(() => {
    const { isSuccess, isFailure, message } = props.forgetPasswordState;

    if (isFailure) {
      if (message === ERROR_CONSTANTS.MAX_OTP_ATTEMPTS_LIMIT_REACHED) {
        formik.setFieldError(
          'email',
          validationErrors.MAX_OTP_ATTEMPTS_LIMIT_REACHED
        );
      } else if (message === ERROR_CONSTANTS.USER_DOES_NOT_EXISTS) {
        onCancelClick();
        push(UiRoutes.SIGNUP);
      } else if (message === ERROR_CONSTANTS.MAX_RESET_PASSWORD_LIMIT_REACHED) {
        formik.setFieldError(
          'email',
          validationErrors.MAX_RESET_PASSWORD_LIMIT_REACHED
        );
      } else if (message === ERROR_CONSTANTS.ACCOUNT_IS_BLOCKED) {
        onCancelClick();
      }
    } else if (isSuccess) {
      const email = formik.values.email.trim();
      if (!props.isAdmin)
        pushClevertapEvent(
          clevertapEventConfigList.RESET_PASSWORD_EXITED_SEND_OTP
        );
      onSendOtpClick({ email });
    }
  }, [
    props.forgetPasswordState.isSuccess,
    props.forgetPasswordState.isFailure,
  ]);

  useEffect(() => {
    if (!props.isAdmin)
      pushClevertapEvent(clevertapEventConfigList.RESET_PASSWORD_SHOWN);
  }, []);

  const handleCancel = () => {
    if (!props.isAdmin)
      pushClevertapEvent(clevertapEventConfigList.RESET_PASSWORD_EXITED_CANCEL);
    onCancelClick();
  };

  return (
    <React.Fragment>
      <Modal
        className={'forgot-model'}
        backButtonEnable={false}
        title={'Reset Your Password'}
        description={
          'Please enter the email address registered with your account. We will send you an OTP to reset your password. The OTP will expire in 20 minutes.'
        }
        onBackdropClick={handleCancel}
      >
        <form autoComplete='off' onSubmit={formik.handleSubmit}>
          <Input
            id='email'
            label='Email'
            name='email'
            // type='email'
            value={formik.values.email}
            className='email-field'
            placeholder='example@xyzmail.com'
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            bgIcon={imgURL['email-icon']}
            error={Boolean(formik.touched.email && formik.errors.email)}
            errorMessage={formik.errors.email}
          />

          <div className='action-button'>
            <button
              className='secondry-button'
              type='reset'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <Button
              btnStyleClass='primary-button'
              enable={
                (formik.values.email.trim() && !formik.errors.email) ||
                undefined
              }
              label='Send OTP'
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
  validationErrors: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, { forgetPasswordAction })(
  ForgotPassword
);
