interface CreateUserProps {
  handleCancel: CallableFunction;
  handleCreateUser: CallableFunction;
  handleUpdateUser: CallableFunction;
  manageUserPayload: {
    userId?: string | number;
    mode: 'add' | 'edit';
    name: string;
    email: string;
    role: string;
    showModal: boolean;
    trmEnabled: boolean;
  };
  validationErrors;
  allRoles;
  isAdminUserManagementView: boolean;
}

export default CreateUserProps;
