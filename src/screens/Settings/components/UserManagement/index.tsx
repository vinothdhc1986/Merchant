import React, { useState, useEffect, FC, useMemo, useCallback } from 'react';
import { connect } from 'react-redux';
import { USER_MANAGEMENT_TABLE_CONSTANTS } from './constants';
import Button from 'components/Button';
import ConfirmationModal from 'components/ConfirmationModal';
import CreateUserModal from '../CreateUserModal';
import CreateRoleModal from '../CreateRoleModal';
import CustomTable from 'components/CustomTable';
import {
  getActiveUsersAction,
  getAllRolesAction,
  getAllPermissionsAction,
  createNewUserAction,
  createNewRoleAction,
  updateUserDetailsAction,
  deleteUserAction,
  clearDeleteUserAction,
  clearUpdateUserStateAction,
  clearCreateNewRoleStateAction,
  clearCreateNewUserStateAction,
  resendInvitationAction,
  clearResendInvitationAction,
} from 'redux/actions/settings';
import useRedirect from 'hooks/useRedirect';
import { checkPermissions, getMerchantIdFromStore } from 'lib/helper';
import notify from 'lib/notifiy';
import CustomNoDataFound from 'components/CustomNoDataFound';
import { UiRoutes } from 'lib/constants';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import { permissionEnum } from 'lib/typing';
import Props, { ManageUserPayload } from './typing';
import './styles.scss';

const UserManagement: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { path } = useRedirect();
  const {
    activeUsersListRecords,
    totalRecords,
    allPermissions,
    allRoles,
    validationErrors,
  } = props;

  const [sortBy, setSortBy] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('');

  const [page, setPage] = useState<number | string>(1);
  const [deleteUserId, setDeleteUserId] = useState<string>('');
  const [clickedActionBtnId, setClickedActionBtnId] = useState<string>('');
  const [manageUserPayload, setManageUserPayload] = useState<ManageUserPayload>(
    {
      mode: 'add',
      name: '',
      email: '',
      role: '',
      showModal: false,
      trmEnabled: false,
    }
  );
  const [showCreateRoleModal, setShowCreateRoleModal] =
    useState<boolean>(false);

  const { isAdmin, userId } = props.loginState;

  const handleClickCreateNewUser = () => {
    setManageUserPayload({
      userId: '',
      name: '',
      email: '',
      role: '',
      mode: 'add',
      showModal: true,
      trmEnabled: false,
    });
  };

  const fetchUserListing = ({
    pageNo,
    sortBy,
    orderBy,
  }: {
    pageNo?: number | string;
    sortBy?: string;
    orderBy?: string;
  }) => {
    props.getActiveUsersAction({
      merchantId: merchantId,
      pageNo: pageNo,
      limit: 10,
      sortBy,
      orderBy,
      isAdmin: isAdmin,
    });
  };

  useEffect(() => {
    fetchUserListing({
      pageNo: 1,
      sortBy,
      orderBy,
    });
    props.getAllRolesAction({
      merchantId: merchantId,
      isAdmin: isAdmin,
    });
    props.getAllPermissionsAction({ isAdmin: isAdmin, merchantId: merchantId });
    return () => {
      props.clearCreateNewRoleStateAction();
      props.clearCreateNewUserStateAction();
      props.clearDeleteUserAction();
      props.clearUpdateUserStateAction();
      props.clearResendInvitationAction();
    };
  }, []);
  // Create new user response handling
  useEffect(() => {
    const { isSuccess, isFailure, data, assignedRoleId } =
      props.createNewUserState;
    if (isSuccess) {
      const assignedRoleName = allRoles.reduce(
        (name: string, roleItem: { role_id: number; role_name: string }) => {
          if (roleItem.role_id === assignedRoleId) {
            return roleItem.role_name;
          }
          return name;
        },
        ''
      );
      if (!isAdmin && assignedRoleName) {
        pushClevertapEvent({
          eventName:
            clevertapEventConfigList.USER_MANAGEMENT_USER_CREATED.eventName,
          eventPayload: {
            roleAssigned: assignedRoleName,
          },
        });
      }
      notify({
        message: 'User Created successfully.',
        type: 'success',
        description: '',
      });
      fetchUserListing({
        pageNo: 1,
        sortBy,
        orderBy,
      });
      setPage(1);
      setManageUserPayload({
        ...manageUserPayload,
        showModal: false,
      });
    } else if (isFailure) {
      if (data?.error_code === '3420') {
        notify({
          message: 'User creation failed',
          type: 'error',
          description:
            (validationErrors && validationErrors['USER_ALREADY_EXIST']) || '',
        });
      } else {
        notify({
          message: 'User creation failed',
          type: 'error',
          description: '',
        });
      }
    }
  }, [props.createNewUserState]);

  // Delete User response handling
  useEffect(() => {
    const { isSuccess, isFailure, data } = props.deleteUserState;
    if (isSuccess) {
      notify({
        message: 'User deleted successfully.',
        type: 'success',
        description: '',
      });
      fetchUserListing({
        pageNo: page,
        sortBy,
        orderBy,
      });
    } else if (isFailure && data?.error_code !== '3060') {
      notify({
        message: 'User deletion failed.',
        type: 'error',
        description: '',
      });
    }
  }, [props.deleteUserState]);

  // Update User response handling
  useEffect(() => {
    const { isSuccess, isFailure, data } = props.updateUserState;
    if (isSuccess) {
      notify({
        message: 'User updated successfully.',
        type: 'success',
        description: '',
      });
      fetchUserListing({
        pageNo: page,
        sortBy,
        orderBy,
      });
      setManageUserPayload({
        ...manageUserPayload,
        showModal: false,
      });
    } else if (isFailure && data?.error_code !== '3060') {
      notify({
        message: 'User updation failed.',
        type: 'error',
        description: '',
      });
    }
  }, [props.updateUserState]);

  // Create new role response handling
  useEffect(() => {
    const { isSuccess, isFailure, data, responseCode } =
      props.createNewRoleState;
    if (isSuccess) {
      if (responseCode === '3610') {
        // TODO: Error message to be moved to backend API
        notify({
          message: 'Role updated successfully.',
          type: 'success',
          description: '',
        });
      } else if (responseCode === '3600') {
        notify({
          message: 'Role created successfully.',
          type: 'success',
          description: '',
        });
      }
      if (!isAdmin)
        pushClevertapEvent(
          clevertapEventConfigList.USER_MANAGEMENT_ROLE_CREATED
        );
      props.getAllRolesAction({
        merchantId: merchantId,
        isAdmin: isAdmin,
      });
    } else if (isFailure && data?.error_code !== '3060') {
      notify({
        message: 'Role creation failed.',
        type: 'error',
        description: '',
      });
    }
  }, [props.createNewRoleState]);

  // Resend invitation response handling
  useEffect(() => {
    const { isSuccess, isFailure, errorMessage } = props.resendInvitationState;
    if (isSuccess) {
      notify({
        message: 'Invitation sent successfully.',
        type: 'success',
        description: '',
      });
    } else if (isFailure) {
      notify({
        message: 'Invitation failed.',
        type: 'error',
        description: validationErrors[`${errorMessage}`],
      });
    }
  }, [props.resendInvitationState]);

  const onPageChange = (pageNo) => {
    props.getActiveUsersAction({
      merchantId: merchantId,
      pageNo: pageNo,
      limit: 10,
      isAdmin: isAdmin,
    });
    setPage(pageNo);
  };

  // Update user role handler
  const handleClickUpdateUserRole = (rowData) => {
    setManageUserPayload({
      mode: 'edit',
      userId: rowData.user_id,
      name: rowData.user_name,
      email: rowData.email,
      role: rowData.role_name,
      showModal: true,
      trmEnabled: rowData.is_trm_enabled || false,
    });
  };

  const handleSubmitCreateRole = (payload) => {
    isAdmin && merchantId === 0
      ? (payload = { ...payload, merchant_id: userId, isAdmin: isAdmin })
      : (payload = { ...payload, merchant_id: merchantId });
    props.createNewRoleAction({
      ...payload,
    });
    setShowCreateRoleModal(false);
  };

  const handleCreateUser = (payload) => {
    const createUserApiPayload = {
      ...payload,
      merchant_id: merchantId,
      isAdmin: isAdmin,
    };
    if (props.isAdminUserManagementView)
      delete createUserApiPayload.is_trm_enabled;
    props.createNewUserAction(createUserApiPayload);
  };

  const handleUpdateUser = (payload) => {
    const updateUserApiPayload = {
      ...payload,
      isAdmin: isAdmin,
      merchantId: merchantId,
    };
    if (props.isAdminUserManagementView)
      delete updateUserApiPayload.is_trm_enabled;
    props.updateUserDetailsAction(updateUserApiPayload);
  };

  const handleClickResendInvitation = (userId) => {
    props.resendInvitationAction({
      userId: userId,
      isAdmin: isAdmin,
      merchantId: merchantId,
    });
    setClickedActionBtnId('');
  };

  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    fetchUserListing({
      pageNo: page,
      sortBy: columnName,
      orderBy: order,
    });
    setOrderBy(order);
    setSortBy(columnName);
  };

  const listOfRoleNames = useMemo(() => {
    return Array.isArray(props.allRoles)
      ? props.allRoles.map((role) => role)
      : [];
  }, [props.allRoles]);

  const checkCommonPermissions = useCallback(
    (
      merchantPermission: permissionEnum,
      adminPermission: permissionEnum,
      isAdmin: boolean
    ) => {
      if (isAdmin) {
        return checkPermissions(adminPermission);
      }
      return checkPermissions(merchantPermission);
    },
    []
  );

  return (
    <>
      <div className='user-management'>
        <div className='result-count'>
          Active Users ({props.activeUserCount})
          <div className='action-button'>
            {checkCommonPermissions(
              'CREATE_ROLE',
              'CREATE_ADMIN_ROLE',
              Boolean(path === UiRoutes.ADMIN_USER_MANAGEMENT)
            ) && (
              <>
                <Button
                  btnStyleClass='secondry-button'
                  onClick={() => setShowCreateRoleModal(true)}
                  label='Create or Update Role'
                  enable
                />{' '}
              </>
            )}
            {checkCommonPermissions(
              'CREATE_USER',
              'CREATE_ADMIN_USER',
              Boolean(path === UiRoutes.ADMIN_USER_MANAGEMENT)
            ) && (
              <>
                <Button
                  btnStyleClass='secondry-button'
                  onClick={handleClickCreateNewUser}
                  label='Create New User'
                  enable
                />{' '}
              </>
            )}
          </div>
        </div>
        {activeUsersListRecords.length > 0 ? (
          <CustomTable
            columns={USER_MANAGEMENT_TABLE_CONSTANTS({
              clickedActionBtnId,
              setClickedActionBtnId,
              handleClickUpdateUserRole,
              setDeleteUserId,
              handleClickResendInvitation,
            })}
            dataSource={activeUsersListRecords}
            handleSorting={handleSorting}
            showPagination={Boolean(totalRecords > 0)}
            currentPage={page}
            onPageChangeHandler={onPageChange}
            totalRecords={totalRecords}
          />
        ) : (
          <CustomNoDataFound
            title='There are no active user records here!'
            subTitle='Your active user details will show up here!'
          />
        )}
      </div>
      {manageUserPayload.showModal && (
        <CreateUserModal
          handleCancel={() =>
            setManageUserPayload({
              ...manageUserPayload,
              showModal: false,
            })
          }
          handleCreateUser={handleCreateUser}
          handleUpdateUser={handleUpdateUser}
          manageUserPayload={manageUserPayload}
          validationErrors={validationErrors}
          allRoles={allRoles}
          isAdminUserManagementView={props.isAdminUserManagementView}
        />
      )}
      {showCreateRoleModal && (
        <CreateRoleModal
          handleCancel={() => setShowCreateRoleModal(false)}
          handleSubmitCreateRole={handleSubmitCreateRole}
          validationErrors={validationErrors}
          allPermissions={allPermissions}
          listOfRoleNames={listOfRoleNames}
        />
      )}
      {Boolean(deleteUserId) && (
        <ConfirmationModal
          title='Delete User'
          handleCancel={() => setDeleteUserId('')}
          handleSave={() => {
            props.deleteUserAction({
              user_id: deleteUserId,
              isAdmin: isAdmin,
              merchantId: merchantId,
            });
            setDeleteUserId('');
          }}
          content='Are you sure you want to delete this user? Their access will be revoked. This can not be undone.'
        />
      )}
    </>
  );
};

const mapStateToProps = ({
  settingsReducer,
  validationReducer,
  loginReducer,
}) => ({
  activeUsersListRecords:
    settingsReducer.activeUsersList.data?.user_details || [],
  totalRecords: settingsReducer.activeUsersList.data?.user_count || 0,
  allPermissions: settingsReducer.allPermissions.data || [],
  allRoles: settingsReducer.allRoles.data || [],
  createNewUserState: settingsReducer.createNewUserState,
  createNewRoleState: settingsReducer.createNewRoleState,
  deleteUserState: settingsReducer.deleteUserState,
  updateUserState: settingsReducer.updateUserState,
  resendInvitationState: settingsReducer.resendInvitationState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  loginState: loginReducer.loginState,
  activeUserCount: settingsReducer?.activeUsersList?.activeUserCount ?? 0,
  isAdminUserManagementView: Boolean(
    loginReducer.loginState.isAdmin && loginReducer.loginState.MerchantId === 0
  ),
});

export default connect(mapStateToProps, {
  getActiveUsersAction,
  getAllRolesAction,
  getAllPermissionsAction,
  createNewUserAction,
  createNewRoleAction,
  updateUserDetailsAction,
  deleteUserAction,
  clearDeleteUserAction,
  clearUpdateUserStateAction,
  clearCreateNewRoleStateAction,
  clearCreateNewUserStateAction,
  resendInvitationAction,
  clearResendInvitationAction,
})(UserManagement);
