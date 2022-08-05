import { reduxStateType } from 'lib/typing';

export interface ManageUserPayload {
  mode: 'add' | 'edit';
  userId?: string | number;
  name: string;
  email: string;
  role: string;
  showModal: boolean;
  trmEnabled: boolean;
}

interface Props {
  activeUsersListRecords;
  getActiveUsersAction: CallableFunction;
  getAllRolesAction: CallableFunction;
  getAllPermissionsAction: CallableFunction;
  createNewUserAction: CallableFunction;
  createNewRoleAction: CallableFunction;
  allPermissions;
  validationErrors;
  totalRecords: number;
  allRoles;
  updateUserDetailsAction: CallableFunction;
  deleteUserAction: CallableFunction;
  clearDeleteUserAction: CallableFunction;
  clearUpdateUserStateAction: CallableFunction;
  clearCreateNewRoleStateAction: CallableFunction;
  clearCreateNewUserStateAction: CallableFunction;
  resendInvitationAction: CallableFunction;
  clearResendInvitationAction: CallableFunction;
  loginState;
  createNewUserState: reduxStateType & { assignedRoleId: string | number };
  createNewRoleState: reduxStateType;
  deleteUserState: reduxStateType;
  updateUserState: reduxStateType;
  resendInvitationState: reduxStateType;
  activeUserCount: number;
  isAdminUserManagementView: boolean;
}

export default Props;
