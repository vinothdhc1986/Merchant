import { GeneralSettingDataType } from '../../typing';

interface Props {
  generalSettingData: GeneralSettingDataType;
  updateMerchentGeneralSettingsAction: CallableFunction;
  clearUpdateGeneralSettingsAction: CallableFunction;
  getMerchantSettingsAction: CallableFunction;
  generalSettingState;
  isAdmin: boolean;
}

export default Props;
