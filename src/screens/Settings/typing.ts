export interface GeneralSettingDataType {
  paymentReturnURL: string;
  companyLogoCDNURL: string;
  isSaveCardsBeforeAuthentication: boolean;
}

export interface CredentialSettingDataType {
  mid: number;
  accessCode: string;
  secretKey: string;
}

export interface WebhookDataType {
  webhookEventsParameters: Array<{
    iEventId: number;
    strEventName: string;
    strEventDisplayName: string;
    bIsEnabled: boolean;
  }>;
  webhooksSettingsRequest: {
    webhookURL: string;
  };
}

interface Props {
  getActiveWebhookEventsAction: CallableFunction;
  clearActiveWebhookEvents: CallableFunction;
  getMerchentSettingsAction: CallableFunction;
  clearMerchentSettingsAction: CallableFunction;
  generalSettingData: GeneralSettingDataType;
  credentialSettingData: CredentialSettingDataType;
  webHookData: WebhookDataType;
  updateMerchentGeneralSettingsAction: CallableFunction;
  updateMerchentWebhookAction: CallableFunction;
  getCheckoutThemeAction: CallableFunction;
  updateCheckoutThemeAction: CallableFunction;
  clearUpdateCheckoutThemeAction: CallableFunction;
  getCheckoutThemeState;
  updateCheckoutThemeState;
  isAdmin: boolean;
}

export type Setting_Tab_Values =
  | 'general'
  | 'checkoutTheme'
  | 'credentials'
  | 'webhook'
  | 'userManagement'
  | 'customization';

export default Props;
