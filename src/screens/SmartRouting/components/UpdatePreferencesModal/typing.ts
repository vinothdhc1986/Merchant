interface Props {
  closeModal: () => void;
  gateways: string;
  preferenceGateway;
  updatePreferenceScoreState;
  getPreferenceGatewayAction?: CallableFunction;
  updatePreferenceScoreAction?: CallableFunction;
  clearUpdatePreferenceAction?: CallableFunction;
  isAdmin: boolean;
}

export default Props;
