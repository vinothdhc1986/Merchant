// eslint-disable-next-line @typescript-eslint/no-empty-interface

export interface SortingParamsType {
  columnName: string;
  order: string;
}
interface Props {
  getAdminCustomRoutingListAction: CallableFunction;
  totalRecords: number;
  customRoutingListRecords;
  getAdminPriorityLogicAction: CallableFunction;
  adminPriorityLogicState: string;
  approveOrRejectLogicAction: CallableFunction;
  approveOrRejectLogicState;
  clearApproveOrRejectLogicState: CallableFunction;
  updateAdminPriorityLogicAction: CallableFunction;
  updateAdminPriorityLogicState;
  clearUpdateAdminPriorityLogicState: CallableFunction;
  getAutoSuggestSearchListAction: CallableFunction;
  autoSuggestListState;
  clearAutoSuggestSearchListAction: CallableFunction;
}

export default Props;
