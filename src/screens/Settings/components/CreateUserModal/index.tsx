import React, { FC, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from 'components/TextInput';
import FilterModal from 'components/Modal';
import Select from 'components/Select';
import Button from 'components/Button';
import CustomSwitch from 'components/CustomSwitch';
import {
  nameValidationRegex,
  emailValidationRegex,
} from 'lib/constants';
import Props from './typing';
import './styles.scss';

const RenderModalBody: FC<Props> = (props): JSX.Element => {
  const {
    validationErrors,
    allRoles,
    manageUserPayload,
    handleCreateUser,
    handleUpdateUser,
  } = props;

  const [selectedRole, setSelectedRole] = useState<string>(
    manageUserPayload.role
  );

  const getRoleId = (roleName) => {
    return allRoles.find((item) => item.role_name === roleName)['role_id'];
  };

  const formik = useFormik({
    initialValues: {
      name: manageUserPayload.name,
      email: manageUserPayload.email,
      trmEnabled: manageUserPayload.trmEnabled,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(nameValidationRegex, 'Invalid Name')
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      email: Yup.string()
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
    }),
    onSubmit: (values) => {
      if (manageUserPayload.mode === 'edit') {
        handleUpdateUser({
          role_id: getRoleId(selectedRole),
          user_id: manageUserPayload.userId,
          is_trm_enabled: values.trmEnabled,
        });
      } else {
        handleCreateUser({
          email: values.email.trim(),
          role_id: getRoleId(selectedRole),
          name: values.name.trim(),
          is_trm_enabled: values.trmEnabled,
        });
      }
    },
  });

  useEffect(() => {
    if (manageUserPayload.mode === 'add' && allRoles.length > 0) {
      setSelectedRole(allRoles[0].role_name);
    }
  }, [manageUserPayload]);

  return (
    <div className='create-user-modal' id='create-user-modal'>
      <h3>
        {manageUserPayload.mode === 'edit'
          ? 'Update User Permissions'
          : 'Create New User'}
      </h3>

      <div className='modal-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='filter-row'>
            <label>Full Name</label>
            <div className='value-box'>
              <Input
                id='name'
                name='name'
                type='text'
                className='form-control'
                placeholder='Enter Name'
                value={formik.values.name}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.name && formik.errors.name)}
                errorMessage={formik.errors.name}
                readonly={manageUserPayload.mode === 'edit'}
              />
            </div>
          </div>

          <div className='filter-row'>
            <label>Email</label>
            <div className='value-box'>
              <Input
                id='email'
                name='email'
                type='text'
                className='form-control'
                placeholder='Enter Email'
                value={formik.values.email}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                errorMessage={formik.errors.email}
                readonly={manageUserPayload.mode === 'edit'}
              />
            </div>
          </div>

          <div className='filter-row'>
            <label>Role</label>
            <Select
              onChange={(value) => setSelectedRole(value)}
              optionList={allRoles.map((item) => ({
                label: item.role_name,
                value: item.role_name,
              }))}
              placeholder='Select Role'
              value={selectedRole}
              parentId='create-user-modal'
              wrapperClass={'create-user-dropdown'}
            />
          </div>
          {!props.isAdminUserManagementView && (
            <>
              <div className='filter-row'>
                <label>TRM</label>
                <CustomSwitch
                  onChange={(checked) =>
                    formik.setFieldValue('trmEnabled', checked)
                  }
                  className='create-user-custom-switch'
                  checked={formik.values.trmEnabled}
                />
              </div>
              <div className='filter-row trm-note'>
                Note: To access TRM for Created User, TRM should be enabled on
                Merchant as well.
              </div>
            </>
          )}

          <div className='action-button text-right'>
            <Button
              btnStyleClass='secondry-button'
              label='Cancel'
              onClick={() => props.handleCancel()}
              enable
            />
            <Button
              btnStyleClass='primary-button'
              label={
                manageUserPayload.mode === 'edit'
                  ? 'Update User Permissions'
                  : 'Create User'
              }
              type='submit'
              enable={
                !!formik.values.email &&
                !!formik.values.name &&
                !!selectedRole &&
                !formik.errors.name &&
                !formik.errors.email &&
                !!selectedRole
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateUserModal: FC<Props> = (props): JSX.Element => {
  return (
    <FilterModal
      ModalBody={RenderModalBody}
      modalBodyProps={{ ...props }}
      onBackdropClick={() => props.handleCancel()}
    />
  );
};

export default CreateUserModal;
