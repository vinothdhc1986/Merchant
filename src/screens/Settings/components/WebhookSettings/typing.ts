import { WebhookDataType } from '../../typing';

export interface WebHookPayloadType {
  orderSuccess?: boolean;
  orderFailed?: boolean;
  refundSuccess?: boolean;
  refundFailed?: boolean;
}

export type ClevertapPropertyValue = 'Success' | 'Failed' | 'Success & Failed' | 'None';

export interface Props {
  webHookData: WebhookDataType;
  getActiveWebhookEventsAction: CallableFunction;
  updateMerchentWebhookAction: CallableFunction;
  clearUpdateMerchentWebhookAction: CallableFunction;
  updateMerchentWebhook;
  isAdmin: boolean;
}
