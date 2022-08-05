import actionConstants from '../constants/';

const loaderState = {
  actionsLoading: [],
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function loaderReducer(state = loaderState, action) {
  let tempActionsLoading = [];
  switch (action.type) {
    case actionConstants.START_LOADER:
      return {
        actionsLoading: [...state.actionsLoading, action.payload.actionType],
      };
    case actionConstants.STOP_LOADER:
      tempActionsLoading = [...state.actionsLoading];
      tempActionsLoading = tempActionsLoading.filter(
        (a) => a !== action.payload.actionType
      );
      return {
        actionsLoading: [...tempActionsLoading],
      };
    default:
      return state;
  }
}
