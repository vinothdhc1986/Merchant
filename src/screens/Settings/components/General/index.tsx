import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextInput from '../../../../components/TextInput';
// import CustomSwitch from '../../../../components/CustomSwitch';
import Button from '../../../../components/Button';
import { clearUpdateGeneralSettingsAction } from '../../../../redux/actions/settings';
import {
  checkPermissions,
  getMerchantIdFromStore,
  validateMultipleURL,
} from '../../../../lib/helper';
import notify from '../../../../lib/notifiy';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';

const General: FC<Props> = (props): JSX.Element => {
  const { generalSettingData, updateMerchentGeneralSettingsAction } = props;
  const [paymentReturnURL, setPaymentReturnURL] = useState<string>('');
  // const [saveCards, setSaveCards] = useState<boolean>(false);
  const [saveButtonEnable, setSaveButtonEnable] = useState<boolean>(false);
  const handlePaymentReturnURLChange = (e) => {
    setPaymentReturnURL(e.target.value);
    if (generalSettingData?.paymentReturnURL === e.target.value) {
      setSaveButtonEnable(false);
    } else {
      setSaveButtonEnable(true);
    }
  };

  useEffect(() => {
    if (generalSettingData) {
      if (generalSettingData.paymentReturnURL) {
        setPaymentReturnURL(generalSettingData.paymentReturnURL);
      }
      // setSaveCards(!!generalSettingData.isSaveCardsBeforeAuthentication);
    }
  }, [generalSettingData]);

  useEffect(() => {
    const { isSuccess } = props.generalSettingState;
    if (isSuccess) {
      if (!props.isAdmin)
        pushClevertapEvent(
          clevertapEventConfigList.GENERAL_SETTINGS_URL_CHANGED
        );
      notify({
        description: 'General settings updated sucessfully',
        duration: 1,
        type: 'success',
        message: 'Success',
      });
      props.getMerchantSettingsAction({ merchantId: getMerchantIdFromStore() });
      props.clearUpdateGeneralSettingsAction();
    }
  }, [props.generalSettingState]);


  const handleUpdate = () => {
    //Todo: Confirm, if need to validate for valid URL or not
    /**
     * Removed Saved Card functionality, discussed with Vishal Sir
     */
    const merchantId = getMerchantIdFromStore();
    updateMerchentGeneralSettingsAction({
      paymentReturnURL: paymentReturnURL,
      // isSaveCardsBeforeAuthentication: false,
      companyLogoCDNURL: '',
      merchantId: merchantId,
    });
  };

  return (
    <div className='white-box-content general-settings'>
      <h5>Payment Return URL</h5>
      <p className='subtitle'>
        Once the transaction is done, the user will be redirected to the
        mentioned URLs. You can add multiple URLs using comma separation.
      </p>

      <TextInput
        type='text'
        value={paymentReturnURL}
        className='form-control'
        handleChange={handlePaymentReturnURLChange}
        error={Boolean(
          !validateMultipleURL(paymentReturnURL) && paymentReturnURL
        )}
        errorMessage='Invalid merchant return URL'
      />

      <div className='devide'></div>

      {/* * Removed Saved Card functionality, discussed with Vishal Sir */}

      {/* <h5>Save Cards</h5>
      <p className='subtitle'>
        Saved cards can be used for the future transaction by the customers.
        Switch on the toggle below for saving the cards before authentication.{' '}
      </p>
      <CustomSwitch
        label={`Save Cards: ${saveCards ? 'On' : 'Off'}`}
        onChange={(value: boolean) => setSaveCards(value)}
        checked={saveCards}
      /> */}
      {checkPermissions('UPDATE_GENERAL_SETTINGS_DATA') && (
        <div className='action-button'>
          <Button
            btnStyleClass='primary-button '
            label='Save Changes'
            onClick={handleUpdate}
            enable={
              !!paymentReturnURL &&
              saveButtonEnable &&
              validateMultipleURL(paymentReturnURL)
            }
          />
        </div>
      )}
      <br />
    </div>
  );
};

const mapStateToProps = ({
  settingsReducer,
  loginReducer,
}) => ({
  generalSettingState: settingsReducer.updateGeneralSettings,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  clearUpdateGeneralSettingsAction,
})(General);
