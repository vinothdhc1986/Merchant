interface Props {
  handleCancel: CallableFunction;
  handleSubmitCreateRole: CallableFunction;
  validationErrors;
  allPermissions;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listOfRoleNames: Array<{role_id: number;
  role_name: string;
  role_description: string;
  mapped_permission: Array<{
    permission_id: number;
    permission_description: string;
    permission_name: string;
  }>
  }>;
}

export default Props;
