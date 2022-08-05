/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import ActionConstants from '../constants';
import {
  getTodayTransactionsDataApi,
  getOverviewDataApi,
} from '../../api/overview';

export const getTodayTransactionsDataAction = (data) => {
  const payload = {
    serviceMethod: getTodayTransactionsDataApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_TODAY_TRANSACTIONS_DATA_SUCCESS,
    actionTypeFailure: ActionConstants.GET_TODAY_TRANSACTIONS_DATA_FAILURE,
    actionTypeRequest: ActionConstants.GET_TODAY_TRANSACTIONS_DATA_REQUEST,
  };
  return { type: ActionConstants.GET_TODAY_TRANSACTIONS_DATA, payload };
};

export const getOverviewDataAction = (data) => {
  const payload = {
    serviceMethod: getOverviewDataApi.bind(null, data),
    actionTypeSuccess: ActionConstants.GET_OVERVIEW_DATA_SUCCESS,
    actionTypeFailure: ActionConstants.GET_OVERVIEW_DATA_FAILURE,
    actionTypeRequest: ActionConstants.GET_OVERVIEW_DATA_REQUEST,
  };
  return { type: ActionConstants.GET_OVERVIEW_DATA, payload };
};

export const clearOverviewStateAction = () => {
  return { type: ActionConstants.GET_OVERVIEW_DATA_CLEAR };
};
