import actionConstants from '../constants/';

const initialState = {
  isCollapsed: false,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case actionConstants.UPDATE_SIDEBAR_VIEW:
      return {
        isCollapsed: !state.isCollapsed,
      };

    default:
      return state;
  }
}
