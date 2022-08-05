import React, { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import AboutHeader from 'components/AboutHeader';
import Breadcrumb from 'components/Breadcrumb';
import Button from 'components/Button';
import CustomSwitch from 'components/CustomSwitch';
import TextInput from 'components/TextInput';
import {
  getGatewayConfigurationsAction,
  clearGatewayConfigurationsAction,
  saveGatewayAction,
  clearSaveGatewayAction,
} from 'redux/actions/smartRouting';
import useRedirect from 'hooks/useRedirect';
import { checkPermissions, getMerchantIdFromStore } from 'lib/helper';
import notify from 'lib/notifiy';
import { DEFAULT_API_SUCCESS, UiRoutes } from 'lib/constants';
import { VIEW_GATEWAY_BREADCRUMB_CONFIG } from './constants';
import { Props } from './typing';
import '../../styles.scss';

const inputTypes = {
  string: 'text',
};

const UpdateGateway: FC<Props> = (props): JSX.Element => {
  const { validationMessages } = props;

  const merchantId = getMerchantIdFromStore();

  const { params } = useRedirect();
  const [param, setParam] = useState<any>([]);
  const [paymentModes, setPaymentModes] = useState<any>([]);
  const { push, location } = useRedirect();

  const gatewayId = useMemo(() => {
    return location.state.gatewayId;
  }, [location]);

  const shouldEnableButton = useMemo(() => {
    let filledFieldsCount = 0;
    if (param.length && typeof paymentModes === 'object') {
      param.forEach((item) => {
        if (item.Value || !item.Mandatory) {
          filledFieldsCount++;
        }
      });
      return (
        filledFieldsCount === param.length &&
        Object.values(paymentModes)
          .flat(1)
          .some((item: any) => item.Status)
      );
    }
    return false;
  }, [param, paymentModes]);

  useEffect(() => {
    props.getGatewayConfigurationsAction(params.gateway, merchantId, false);
    return () => {
      props.clearGatewayConfigurationsAction();
    };
  }, []);

  useEffect(() => {
    if (props?.gatewayConfigurations?.data?.Params?.length > 0) {
      setParam([...props?.gatewayConfigurations?.data?.Params]);
    }
  }, [props?.gatewayConfigurations?.data?.Params]);

  useEffect(() => {
    if (props?.gatewayConfigurations?.data?.PaymentModes) {
      Object.keys(props?.gatewayConfigurations?.data?.PaymentModes).forEach(
        (key) => {
          if (props?.gatewayConfigurations?.data?.PaymentModes[key].length) {
            props.gatewayConfigurations.data.PaymentModes[key] =
              props?.gatewayConfigurations?.data?.PaymentModes[key].map(
                (mode) => {
                  return {
                    ...mode,
                    Status: mode.PrevStatus,
                  };
                }
              );
          } else {
            return [];
          }
        }
      );
      setPaymentModes(props?.gatewayConfigurations?.data?.PaymentModes);
    }
  }, [props?.gatewayConfigurations?.data?.PaymentModes]);

  useEffect(() => {
    const { isSuccess, isFailure, errorMessage } = props.saveGatewayState;
    if (
      isSuccess &&
      props.saveGatewayState.data?.response_message.toLowerCase() === 'success'
    ) {
      notify({
        message:
          validationMessages?.GATEWAY_UPDATED_SUCCESSFULLY ??
          DEFAULT_API_SUCCESS,
        type: 'success',
        description:
          validationMessages?.GATEWAY_UPDATED_SUCCESSFULLY_DESCRIPTION?.replace(
            '${gatewayId}',
            gatewayId
          ) ?? '',
      });
      props.clearSaveGatewayAction();
      push(UiRoutes.SMART_ROUTING);
    } else if (isFailure) {
      notify({
        message: validationMessages.GATEWAY_UPDATE_FAILED,
        type: 'error',
        description: errorMessage,
      });
      props.clearSaveGatewayAction();
      push(UiRoutes.SMART_ROUTING);
    }
  }, [props.saveGatewayState]);

  const handleChange = (e, index) => {
    param[index].Value = e.target.value;
    setParam([...param]);
  };

  const handleToggle = (e, key, index) => {
    paymentModes[key][index].Status = e;
    setPaymentModes({ ...paymentModes });
  };

  const renderInputFields = () => {
    const fields =
      param &&
      param.length &&
      param.map((field, index) => {
        if (field.ShowHide) {
          return (
            <TextInput
              style={{ width: '70%' }}
              label={field.LabelName}
              type={inputTypes[field.InputType]}
              value={field.Value}
              maxlength={field.Length}
              className={'form-control'}
              handleChange={(e) => {
                handleChange(e, index);
              }}
              name='mid'
              isRequired={field.Mandatory}
            />
          );
        }
      });
    return (fields || []).filter((item) => {
      if (item) {
        return item;
      }
    });
  };

  const renderPaymentMethods = () => {
    const modes = Object.keys(paymentModes).map((key) => {
      if (paymentModes[key].length) {
        return (
          <>
            <h4>{key}</h4>
            {paymentModes[key].map((mode, index) => {
              return (
                <CustomSwitch
                  label={
                    key.toLowerCase() === 'wallet'
                      ? mode.AggregatorWalletName
                      : mode.Name
                  }
                  onChange={(e) => {
                    handleToggle(e, key, index);
                  }}
                  key={index}
                  checked={mode.Status}
                />
              );
            })}
          </>
        );
      } else {
        return null;
      }
    });
    return modes;
  };

  const handleSaveChanges = () => {
    const payload = {
      ...props.gatewayConfigurations?.data,
      PaymentModes: paymentModes,
      Params: param,
      isCreateGatewaySpecified: false,
      isCreateGateway: false,
    };
    props.saveGatewayAction(payload);
  };

  return (
    <div className='smart-routing smart-routing-gateway'>
      <AboutHeader
        title='Smart Routing'
        content='Configure the routing logic of your integrated payment gateways based on data.'
      />
      <div className='screen-heading'>
        <Breadcrumb
          config={VIEW_GATEWAY_BREADCRUMB_CONFIG(params.gateway)}
          showIcon={true}
          svgIcon='smartRouting-icon-white'
          svgDetail='View Gateway'
        />
      </div>
      <div className='white-box-content'>
        <h5>Configuration Details</h5>
        {/* <p className='subtitle'>Some information here</p> */}
        {renderInputFields()}
        <div className='devide'></div>
        <h5>Payment Configuration Details</h5>
        {/* <p className='subtitle'>Some information here</p> */}
        <div className='setting-button'>
          <div className='setting-colunm'>{renderPaymentMethods()}</div>
        </div>
        {checkPermissions('UPDATE_GATEWAY_CONFIG') && (
          <Button
            onClick={handleSaveChanges}
            btnStyleClass='primary-button margin-top-24'
            label='Save Changes'
            enable={shouldEnableButton}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ smartRoutingReducer, validationReducer }) => ({
  gatewayConfigurations: smartRoutingReducer.gatewayConfigurationsState,
  saveGatewayState: smartRoutingReducer.saveGatewayState,
  validationMessages: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, {
  getGatewayConfigurationsAction,
  clearGatewayConfigurationsAction,
  saveGatewayAction,
  clearSaveGatewayAction,
})(UpdateGateway);
