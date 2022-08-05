import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import CustomSwitch from '../../../../components/CustomSwitch';
import notify from '../../../../lib/notifiy';
import { clearUpdateMerchentWebhookAction } from '../../../../redux/actions/settings';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import {
  checkPermissions,
  getMerchantIdFromStore,
  validateURL,
} from '../../../../lib/helper';
import { ClevertapPropertyValue, Props, WebHookPayloadType } from './typing';

//Todo: need update in API keyName -> 'strEventName'
const eventsKeyMapping = {
  'order.success': 'orderSuccess',
  'order.failed': 'orderFailed',
  'refund.success': 'refundSuccess',
  'refund.failed': 'refundFailed',
};

const WebhookSettings: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const {
    webHookData,
    updateMerchentWebhookAction,
    getActiveWebhookEventsAction,
  } = props;

  const initPayload = {
    orderSuccess: false,
    orderFailed: false,
    refundSuccess: false,
    refundFailed: false,
  };

  const [webhookURL, setWebhookURL] = useState<string>('');
  const [saveButtonEnable, setSaveButtonEnable] = useState(false);
  const [paymentWebhookPayload, setPaymentWebhookPayload] =
    useState<WebHookPayloadType>({ ...initPayload });

  useEffect(() => {
    getActiveWebhookEventsAction({
      merchantId: merchantId,
    });
  }, []);

  useEffect(() => {
    if (webHookData?.webhookEventsParameters) {
      const eventObj = { ...initPayload };
      webHookData.webhookEventsParameters.forEach((event) => {
        eventObj[eventsKeyMapping[event.strEventName]] = event.bIsEnabled;
      });
      setPaymentWebhookPayload(eventObj);
    }
    if (webHookData?.webhooksSettingsRequest) {
      setWebhookURL(webHookData.webhooksSettingsRequest.webhookURL);
    }
  }, [webHookData]);

  useEffect(() => {
    const { isSuccess } = props.updateMerchentWebhook;
    if (isSuccess) {
      if (!props.isAdmin) {
        let orderStatusPropertyValue: ClevertapPropertyValue;
        let refundStatusPropertValue: ClevertapPropertyValue;

        if (
          paymentWebhookPayload.orderSuccess &&
          paymentWebhookPayload.orderFailed
        ) {
          orderStatusPropertyValue = 'Success & Failed';
        } else if (paymentWebhookPayload.orderFailed) {
          orderStatusPropertyValue = 'Failed';
        } else if (paymentWebhookPayload.orderSuccess) {
          orderStatusPropertyValue = 'Success';
        } else {
          orderStatusPropertyValue = 'None';
        }

        if (
          paymentWebhookPayload.refundSuccess &&
          paymentWebhookPayload.refundFailed
        ) {
          refundStatusPropertValue = 'Success & Failed';
        } else if (paymentWebhookPayload.refundFailed) {
          refundStatusPropertValue = 'Failed';
        } else if (paymentWebhookPayload.refundSuccess) {
          refundStatusPropertValue = 'Success';
        } else {
          refundStatusPropertValue = 'None';
        }

        pushClevertapEvent({
          eventName:
            clevertapEventConfigList.SETTINGS_WEBHOOK_URL_CHANGED.eventName,
          eventPayload: {
            orderStatus: orderStatusPropertyValue,
            refundStatus: refundStatusPropertValue,
          },
        });
      }
      notify({
        description: 'Webhook Data updated sucessfully',
        duration: 1,
        type: 'success',
        message: 'Notification',
      });
      props.clearUpdateMerchentWebhookAction();
    }
  }, [props.updateMerchentWebhook]);

  const handleWebhookChange = (e) => {
    setWebhookURL(e.target.value);
    if (webHookData?.webhooksSettingsRequest.webhookURL === e.target.value) {
      setSaveButtonEnable(false);
    } else {
      setSaveButtonEnable(true);
    }
  };

  const handleUpdate = () => {
    const webhookEventsPayloadCopy = [...webHookData.webhookEventsParameters];
    Object.values(paymentWebhookPayload).forEach((value, index) => {
      webhookEventsPayloadCopy[index]['bIsEnabled'] = value;
    });

    updateMerchentWebhookAction({
      webhookEventsParameters: webhookEventsPayloadCopy,
      webhooksSettingsRequest: {
        webhookURL: webhookURL,
        merchantId: merchantId,
      },
    });
  };

  const validateWebhookURL = (url: string): boolean => {
    if (url?.includes(',')) {
      return false;
    }
    return validateURL(webhookURL);
  };

  return (
    <div className='white-box-content webhook-settings'>
      <h5>Webhook URL</h5>
      <p className='subtitle'>
        Please provide your webhook URL. Transaction status and other
        information will be shared on the URL.
      </p>
      <TextInput
        type='text'
        value={webhookURL}
        className='form-control'
        handleChange={handleWebhookChange}
        placeholder='Enter Webhook URL'
        error={Boolean(!validateWebhookURL(webhookURL) && webhookURL)}
        errorMessage='Please enter a valid URL'
      />

      <div className='devide'></div>

      <h5>Webhook Events</h5>
      {/* <p className='subtitle'>
        Saved cards can be used for the future transaction by the customers.
        Switch on the toggle below for saving the cards before authentication.{' '}
      </p> */}

      <CustomSwitch
        label={`Order Success: ${
          paymentWebhookPayload.orderSuccess ? 'On' : 'Off'
        }`}
        onChange={(value: boolean) => {
          setPaymentWebhookPayload({
            ...paymentWebhookPayload,
            orderSuccess: value,
          });
          setSaveButtonEnable(true);
        }}
        checked={paymentWebhookPayload.orderSuccess}
      />
      <CustomSwitch
        label={`Order Failed: ${
          paymentWebhookPayload.orderFailed ? 'On' : 'Off'
        }`}
        onChange={(value: boolean) => {
          setPaymentWebhookPayload({
            ...paymentWebhookPayload,
            orderFailed: value,
          });
          setSaveButtonEnable(true);
        }}
        checked={paymentWebhookPayload.orderFailed}
      />
      <CustomSwitch
        label={`Refund Success: ${
          paymentWebhookPayload.refundSuccess ? 'On' : 'Off'
        }`}
        onChange={(value: boolean) => {
          setPaymentWebhookPayload({
            ...paymentWebhookPayload,
            refundSuccess: value,
          });
          setSaveButtonEnable(true);
        }}
        checked={paymentWebhookPayload.refundSuccess}
      />
      <CustomSwitch
        label={`Refund Failed: ${
          paymentWebhookPayload.refundFailed ? 'On' : 'Off'
        }`}
        onChange={(value: boolean) => {
          setPaymentWebhookPayload({
            ...paymentWebhookPayload,
            refundFailed: value,
          });
          setSaveButtonEnable(true);
        }}
        checked={paymentWebhookPayload.refundFailed}
      />
      {checkPermissions('UPDATE_WEBHOOK_SETTINGS_DATA') && (
        <div className='action-button'>
          <Button
            btnStyleClass='primary-button '
            onClick={handleUpdate}
            // enable only if we're getting data successfully
            enable={
              !!webHookData?.webhookEventsParameters &&
              saveButtonEnable &&
              validateURL(webhookURL)
            }
            label='Save Changes'
          />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ settingsReducer, loginReducer }) => ({
  updateMerchentWebhook: settingsReducer.updateMerchentWebhook,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, { clearUpdateMerchentWebhookAction })(
  WebhookSettings
);
