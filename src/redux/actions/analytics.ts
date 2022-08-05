/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from "../constants";
import { analyticsApi } from "../../api/analytics";

export const analyticsAction = (data) => {
  const payload = {
    serviceMethod: analyticsApi.bind(null, data),
    actionTypeSuccess: ActionConstants.POST_ANALYTICS_SUCCESS,
    actionTypeFailure: ActionConstants.POST_ANALYTICS_FAILURE,
    actionTypeRequest: ActionConstants.POST_ANALYTICS_REQUEST,
  };
  return { type: ActionConstants.POST_ANALYTICS_ACTION, payload };
};

export const clearAnalyticsAction = () => {
  return { type: ActionConstants.POST_ANALYTICS_CLEAR };
};
