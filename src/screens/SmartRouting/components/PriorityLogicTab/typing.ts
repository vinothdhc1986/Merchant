interface Props {
  gatewayListState;
  getActiveSimpleRoutingLogicAction: CallableFunction;
  clearGetActiveSimpleRoutingLogicAction: CallableFunction;
  simpleRoutingState;
  saveCustomLogicState;
  saveCustomLogicAction: CallableFunction;
  clearSaveCustomLogicAction: CallableFunction;
  activePriorityLogic;
  getActivePriorityLogicAction: CallableFunction;
  clearActivePriorityLogicAction: CallableFunction;
  getPriorityLogicListAction: CallableFunction;
  clearGetPriorityLogicListAction: CallableFunction;
  priorityLogicListState;
  deletePriorityLogicState;
  deletePriorityLogicAction: CallableFunction;
  clearDeletePriorityLogicAction: CallableFunction;
  loggedInUserEmail: string;
  validationMessages;
  isAdmin: boolean;
}

export default Props;
