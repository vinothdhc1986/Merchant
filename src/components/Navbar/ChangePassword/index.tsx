import React, { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import Input from 'components/TextInput';
import Button from 'components/Button';
import Modal from 'components/Modal';
import {
  changePasswordAction,
  clearChangePasswordAction,
} from 'redux/actions/login';
import notify from 'lib/notifiy';
import Props from './typing';
import './style.scss';
import { passwordValidationRegex } from 'lib/constants';

const RenderModalBody = (props) => {
  const { cancelHandler } = props;
  const { validationErrors } = props;
  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .min(8, validationErrors.PASSWORD_MIN_LENGTH)
        .max(100, validationErrors.PASSWORD_MAX_LENGTH)
        .matches(passwordValidationRegex, validationErrors.PASSWORD_REGEX),
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
      props.changePasswordAction({
        CurrentPassword: formik.values.currentPassword,
        NewPassword: formik.values.newPassword,
        isAdmin: props.isAdmin,
      });
    },
  });

  useEffect(() => {
    const { isSuccess, isPasswordChanged, isFailure, message, opCode } =
      props.changePasswordState;
    if (isFailure) {
      if (opCode === '8200') {
        formik.setFieldError(
          'currentPassword',
          validationErrors.INCORRECT_PASSWORD
        );
      } else if (opCode === '8190') {
        formik.setFieldError('newPassword', validationErrors.SIMILAR_PASSWORD);
      } else {
        notify({
          message: 'Error',
          type: 'error',
          description: message,
        });
      }
    } else if (isSuccess && isPasswordChanged) {
      cancelHandler();
      notify({
        message: 'Success',
        type: 'success',
        description: 'Password changed successfully.',
      });
    } else if (isSuccess && !isPasswordChanged) {
      notify({
        message: 'Error',
        type: 'error',
        description: message,
      });
    }
  }, [props.changePasswordState]);

  return (
    <React.Fragment>
      <h3>Change Password</h3>
      <div className='modal-body'>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id='currentPassword'
            label='Current Password'
            type='password'
            name='currentPassword'
            value={formik.values.currentPassword}
            className='password-field'
            placeholder='Your current password'
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.currentPassword && formik.errors.currentPassword
            )}
            errorMessage={formik.errors.currentPassword}
          />
          <Input
            id='newPassword'
            label='New Password'
            type='password'
            name='newPassword'
            value={formik.values.newPassword}
            className='password-field'
            placeholder='Enter new password'
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            placeholder='Confirm your new password'
            handleChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            errorMessage={formik.errors.confirmPassword}
          />
          <div className='action-button'>
            <Button
              btnStyleClass='secondry-button '
              label='Cancel'
              onClick={cancelHandler}
              enable={true}
            />
            <Button
              btnStyleClass='primary-button'
              label='Change Password'
              type='submit'
              enable={
                formik.values.currentPassword &&
                formik.values.newPassword &&
                formik.values.confirmPassword &&
                formik.values.newPassword === formik.values.confirmPassword
              }
            />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const ChangePassword: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        modalWrapperClass='change-password-model'
        onBackdropClick={props.cancelHandler}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ validationReducer, loginReducer }) => ({
  validationErrors: validationReducer.validationErrorState.validationErrors,
  changePasswordState: loginReducer.changePasswordState,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  changePasswordAction,
  clearChangePasswordAction,
})(ChangePassword);
