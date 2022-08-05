interface Props {
  getBinListAction: CallableFunction;
  getCardListAction: CallableFunction;
  getIssuerListAction: CallableFunction;
  getCardBrandNamesAction: CallableFunction;
  getIssuerNamesAction: CallableFunction;
  createPreferenceScoreAction: CallableFunction,
  clearCreatePreferenceScoreAction: CallableFunction,
  deletePreferenceScoreAction: CallableFunction,
  clearDeletePreferenceScoreAction: CallableFunction,
  clearBinListAction: CallableFunction,
  clearIssuerListAction: CallableFunction,
  clearCardListAction: CallableFunction,
  issuerListState;
  cardBrandListState;
  binListState;
  allIssuerNameState;
  allCardBrandNameState;
  gatewayListState;
  createPreferenceScoreState;
  deletePreferenceScoreState;
  validationMessages;
  isAdmin: boolean;
}

export type preferenceType = 'bin' | 'issuer' | 'card' | 'transaction';

export default Props;
