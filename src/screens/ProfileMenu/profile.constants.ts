import imgURL from '../../lib/imgURL';

export const listConstants = ({
  handleClickChangePassword,
  handleClickLogOut,
  handleClickUserManagement,
}: {
  handleClickChangePassword: CallableFunction;
  handleClickLogOut: CallableFunction;
  handleClickUserManagement: CallableFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): any => {
  return [
    {
      label: 'User Management',
      src: imgURL['users-icon'],
      onClick: handleClickUserManagement,
      alt: 'user',
    },
    {
      label: 'Change Password',
      src: imgURL['locked-icon'],
      onClick: handleClickChangePassword,
      alt: 'change-password',
    },
    {
      label: 'Log Out',
      src: imgURL['logout-icon'],
      onClick: handleClickLogOut,
      alt: 'logout',
    },
  ];
};
