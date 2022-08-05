interface Props {
  gatewayListState;
  changeGatewayStatusState;
  getGatewayListAction: CallableFunction;
  clearGatewayListAction: CallableFunction;
  changeGatewayStatusAction: CallableFunction;
  clearChangeGatewayStatusAction: CallableFunction;
  validationMessages;
}

export default Props;
