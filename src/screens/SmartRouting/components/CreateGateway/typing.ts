export interface GatewaySettingProps {
  setCurrentStep: CallableFunction;
  payload: { gateway: string | undefined };
  setPayload: CallableFunction;
  unmappedGatewayListState;
  getUnmappedGatewayListAction: CallableFunction;
  clearUnmappedGatewayListAction: CallableFunction;
}

export interface ConfirgureGatewayProps {
  setCurrentStep: CallableFunction;
  payload: { gateway: string | undefined };
  setPayload: CallableFunction;
  gatewayConfigurations;
  getGatewayConfigurationsAction: CallableFunction;
  clearGatewayConfigurationsAction: CallableFunction;
  setGatewayParams: CallableFunction;
}

export interface PaymentConfigurationProps {
  setCurrentStep: CallableFunction;
  gatewayConfigurations;
  saveGatewayState;
  saveGatewayAction: CallableFunction;
  clearSaveGatewayAction: CallableFunction;
  gatewaySettingPayload: {
    gateway: string | undefined;
    gatewayId: number | undefined;
  }
  validationMessages;
  isAdmin: boolean;
}
