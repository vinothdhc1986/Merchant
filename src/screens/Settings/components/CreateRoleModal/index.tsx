import React, { FC, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AutoComplete } from 'antd';
import FilterModal from '../../../../components/Modal';
import CustomSwitch from '../../../../components/CustomSwitch';
import Button from '../../../../components/Button';
import Input from '../../../../components/TextInput';
import { alphaNumericValidationRegex } from '../../../../lib/constants';
import Props from './typing';
import './styles.scss';

const RenderModalBody: FC<Props> = (props): JSX.Element => {
  const { validationErrors, allPermissions } = props;
  const { Option } = AutoComplete;
  const [allowedPermissions, setAllowedPermissions] = useState<number[]>([]);
  const formik = useFormik({
    initialValues: {
      roleName: '',
      roleDescription: '',
    },
    validationSchema: Yup.object({
      roleName: Yup.string()
        .matches(alphaNumericValidationRegex, 'Special characters not allowed')
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      roleDescription: Yup.string()
        .matches(alphaNumericValidationRegex, 'Special characters not allowed')
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
    }),
    onSubmit: (values) => {
      props.handleSubmitCreateRole({
        role_name: values.roleName,
        role_description: values.roleDescription,
        permision_data: permissionHandler(),
      });
    },
  });

  const permissionHandler = () => {
    const allowedPermissionsArray = allowedPermissions.map((item) => {
      return {
        permission_code: item,
        is_active: true,
      };
    });
    return allowedPermissionsArray;
  };

  const handlePermissionChange = (permissionData) => {
    if (allowedPermissions.includes(permissionData.permission_code)) {
      const newData = allowedPermissions.filter(
        (item) => item !== permissionData.permission_code
      );
      setAllowedPermissions(newData);
    } else {
      const newData = [...allowedPermissions];
      newData.push(permissionData?.permission_code);
      setAllowedPermissions(newData);
    }
  };

  const renderPermissions = () => {
    return allPermissions.map((item) => (
      <CustomSwitch
        key={item.permission_code}
        onChange={() => handlePermissionChange(item)}
        label={item.permission_description}
        checked={allowedPermissions.includes(item.permission_code)}
      />
    ));
  };

  const handleChangeRole = (e) => {
    formik.setFieldValue('roleName', e);
    const selectedRoles = props.listOfRoleNames.filter(
      (role) => role.role_name === e
    );
    if (selectedRoles.length) {
      handleAutoComplete(selectedRoles[0]);
    } else {
      setAllowedPermissions([]);
    }
  };

  const handleAutoComplete = (selectedRole) => {
    formik.setFieldValue('roleDescription', selectedRole?.role_description);
    const selectedRolePermissions = selectedRole?.mapped_permissions;
    const newData = selectedRolePermissions?.map((permission) => {
      if (permission.is_active === true) {
        return permission.permission_code;
      }
    });
    if (newData.length) {
      const data = newData.filter((item) => item);
      setAllowedPermissions(data);
    }
  };

  const onToggleAllPermission = (toggle) => {
    if (!toggle) {
      setAllowedPermissions([]);
    } else {
      const allPermissionsArray = allPermissions.map(
        (item) => item.permission_code
      );
      setAllowedPermissions(allPermissionsArray);
    }
  };

  const isEnableAllChecked = useMemo(() => {
    return Boolean(props.allPermissions?.length === allowedPermissions?.length);
  }, [props.allPermissions, allowedPermissions]);

  const renderOptions = (role) => {
    return (
      <Option key={role.role_id} value={role.role_name}>
        {role.role_name}
      </Option>
    );
  };

  return (
    <div className='create-role-modal'>
      <h3>{'Create New Role or Update Existing Role'}</h3>

      <div className='modal-body' id='Create-Role-Modal'>
        <form onSubmit={formik.handleSubmit}>
          <div className='filter-row'>
            <label>Role Name</label>
            <div className='role-name-input-wrapper'>
              <AutoComplete
                onSearch={handleChangeRole}
                placeholder='Role Name'
                onSelect={handleChangeRole}
                bordered={false}
                className={`form-control ${
                  formik.touched.roleName && formik.errors.roleName
                    ? 'error-border'
                    : ''
                }`}
                dropdownClassName='dropdown-autocomplete'
                getPopupContainer={() =>
                  document.getElementById('Create-Role-Modal') || document.body
                }
                onBlur={formik.handleBlur}
                id='roleName'
                dataSource={
                  props.listOfRoleNames
                    ?.filter((item) =>
                      item.role_name.includes(formik.values.roleName)
                    )
                    ?.map(renderOptions) ?? []
                }
              ></AutoComplete>
              {Boolean(formik.touched.roleName && formik.errors.roleName) && (
                <div className='error'>{formik.errors.roleName}</div>
              )}
            </div>
          </div>

          <div className='filter-row'>
            <label>Role Description</label>
            <div className='value-box'>
              <Input
                id='roleDescription'
                name='roleDescription'
                type='text'
                className='form-control'
                placeholder='Role Description'
                value={formik.values.roleDescription}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.roleDescription &&
                    formik.errors.roleDescription
                )}
                errorMessage={formik.errors.roleDescription}
              />
            </div>
          </div>

          <div className='permission-wrapper'>
            <div className='enable-all-switch'>
              <h3>Permissions</h3>
              <CustomSwitch
                label='Enable All'
                onChange={(e) => onToggleAllPermission(e)}
                checked={isEnableAllChecked}
              />
            </div>
            <div className='permissions'>
              {allPermissions.length > 0 && renderPermissions()}
            </div>
          </div>

          <div className='action-button text-right'>
            <Button
              btnStyleClass='secondry-button'
              label='Cancel'
              onClick={() => props.handleCancel()}
              enable
            />
            <Button
              btnStyleClass='primary-button'
              label={'Save Changes'}
              type='submit'
              enable={
                !!formik.values.roleName &&
                !!formik.values.roleDescription &&
                !!allowedPermissions.length &&
                !formik.errors.roleName &&
                !formik.errors.roleDescription
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const CreateRoleModal: FC<Props> = (props): JSX.Element => {
  return (
    <FilterModal
      ModalBody={RenderModalBody}
      modalBodyProps={{ ...props }}
      onBackdropClick={() => props.handleCancel()}
    />
  );
};

export default CreateRoleModal;
