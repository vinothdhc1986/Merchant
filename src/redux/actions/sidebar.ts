/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';

export const updateSidebarView = () => {
  return {
    type: ActionConstants.UPDATE_SIDEBAR_VIEW,
  };
};
