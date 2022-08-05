import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AboutHeader from '../../components/AboutHeader';
import Tabs from '../../components/Tabs';
import General from './components/General';
import Credentials from './components/Credentials';
import WebhookSettings from './components/WebhookSettings';
import CheckoutThemeSettings from './components/CheckoutThemeSettings';
import UserManagement from './components/UserManagement';
import Customization from './components/Customization';
import useRedirect from '../../hooks/useRedirect';
import MerchantDetails from './components/MerchantDetails';
import {
  getActiveWebhookEventsAction,
  clearActiveWebhookEvents,
  getMerchentSettingsAction,
  clearMerchentSettingsAction,
  updateMerchentGeneralSettingsAction,
  updateMerchentWebhookAction,
  getCheckoutThemeAction,
  updateCheckoutThemeAction,
  clearUpdateCheckoutThemeAction,
} from '../../redux/actions/settings';
import { getMerchantIdFromStore } from '../../lib/helper';
import { SETTINGS_TAB_CONSTANTS } from 'lib/constants';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from 'lib/analyticsUtil';
import SubHeader from 'components/SubHeader';

import Props, { Setting_Tab_Values } from './typing';
import './styles.scss';

const Settings: FC<Props> = (props): JSX.Element => {
  const {
    webHookData,
    clearActiveWebhookEvents,
    clearMerchentSettingsAction,
    generalSettingData,
    credentialSettingData,
    updateMerchentGeneralSettingsAction,
    updateMerchentWebhookAction,
    getCheckoutThemeState,
    updateCheckoutThemeState,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { location }: any = useRedirect();

  const [currentTab, setCurrentTab] = useState<Setting_Tab_Values>('general');

  useEffect(() => {
    const merchantId = getMerchantIdFromStore();
    props.getMerchentSettingsAction({
      merchantId: merchantId,
    });

    return () => {
      clearMerchentSettingsAction();
      clearActiveWebhookEvents();
    };
  }, []);

  useEffect(() => {
    if (
      location?.state?.tab === SETTINGS_TAB_CONSTANTS.customization.value ||
      location?.state?.tab === SETTINGS_TAB_CONSTANTS.userManagement.value
    ) {
      setCurrentTab(location?.state?.tab);
    }
  }, [location]);

  const renderSettingBody = (tab: Setting_Tab_Values): JSX.Element => {
    switch (tab) {
      case SETTINGS_TAB_CONSTANTS.credentials.value:
        return (
          <Credentials
            credentialSettingData={credentialSettingData}
            isAdmin={props.isAdmin}
          />
        );
      case SETTINGS_TAB_CONSTANTS.webhook.value:
        return (
          <WebhookSettings
            webHookData={webHookData}
            getActiveWebhookEventsAction={props.getActiveWebhookEventsAction}
            updateMerchentWebhookAction={updateMerchentWebhookAction}
          />
        );
      case SETTINGS_TAB_CONSTANTS.checkoutTheme.value:
        return (
          <CheckoutThemeSettings
            getCheckoutThemeAction={props.getCheckoutThemeAction}
            getCheckoutThemeState={getCheckoutThemeState}
            updateCheckoutThemeAction={props.updateCheckoutThemeAction}
            updateCheckoutThemeState={updateCheckoutThemeState}
            clearUpdateCheckoutThemeAction={
              props.clearUpdateCheckoutThemeAction
            }
            isAdmin={props.isAdmin}
          />
        );
      case SETTINGS_TAB_CONSTANTS.userManagement.value:
        return <UserManagement />;
      case SETTINGS_TAB_CONSTANTS.customization.value:
        return <Customization />;
      case SETTINGS_TAB_CONSTANTS.merchantDetails.value:
        return <MerchantDetails />;
      default:
        return (
          <General
            generalSettingData={generalSettingData}
            updateMerchentGeneralSettingsAction={
              updateMerchentGeneralSettingsAction
            }
            getMerchantSettingsAction={props.getMerchentSettingsAction}
          />
        );
    }
  };

  return (
    <div className='settings'>
      <AboutHeader
        title='Settings'
        content='Configure settings for all your payment needs.'
      />
      <SubHeader
        title='Settings'
        description='Configure your settings'
        showIcon={true}
        svgIcon='settings-icon-white'
        svgDetail='Settings'
      />
      <Tabs
        options={[
          ...Object.values(SETTINGS_TAB_CONSTANTS).filter((tab) =>
            props.isAdmin
              ? true
              : tab.value !== SETTINGS_TAB_CONSTANTS.customization.value &&
                tab.value !== SETTINGS_TAB_CONSTANTS.merchantDetails.value
          ),
        ]}
        value={currentTab}
        onChange={(value) => {
          if (
            !props.isAdmin &&
            value === SETTINGS_TAB_CONSTANTS.userManagement.value
          ) {
            pushClevertapEvent(
              clevertapEventConfigList.USER_MANAGEMENT_CLICKED_SETTINGS
            );
          }
          setCurrentTab(value);
        }}
      />
      {renderSettingBody(currentTab)}
    </div>
  );
};

const mapStateToProps = ({ settingsReducer, loginReducer }) => ({
  webHookData: settingsReducer.activeWebhookEvents.data,
  generalSettingData: settingsReducer.merchentSettings.data?.generalSettingData,
  credentialSettingData:
    settingsReducer.merchentSettings.data?.credentialSettingData,
  getCheckoutThemeState: settingsReducer.getCheckoutThemeState,
  updateCheckoutThemeState: settingsReducer.updateCheckoutThemeState,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getActiveWebhookEventsAction,
  clearActiveWebhookEvents,
  getMerchentSettingsAction,
  clearMerchentSettingsAction,
  updateMerchentGeneralSettingsAction,
  updateMerchentWebhookAction,
  getCheckoutThemeAction,
  updateCheckoutThemeAction,
  clearUpdateCheckoutThemeAction,
})(Settings);
