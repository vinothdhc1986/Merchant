import React, { FC, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import CustomSwitch from 'components/CustomSwitch';
import useRedirect from 'hooks/useRedirect';
import notify from 'lib/notifiy';
import {
  saveGatewayAction,
  clearSaveGatewayAction,
} from 'redux/actions/smartRouting';
import { DEFAULT_API_SUCCESS, UiRoutes } from 'lib/constants';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import { PaymentConfigurationProps } from './typing';

const PaymentConfiguration: FC<PaymentConfigurationProps> = (
  props
): JSX.Element => {
  const { setCurrentStep, validationMessages } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [paymentModes, setPaymentModes] = useState<any>([]);
  const { push } = useRedirect();

  const handleProceed = () => {
    const payload = {
      ...props.gatewayConfigurations?.data,
      PaymentModes: paymentModes,
      isCreateGatewaySpecified: true,
      isCreateGateway: true,
    };
    props.saveGatewayAction(payload);
  };

  const handleGoBack = () => {
    setCurrentStep(2);
  };

  const enableProceed = useMemo((): boolean => {
    if (paymentModes && typeof paymentModes === 'object') {
      return (
        Object.values(paymentModes)
          .flat(1)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .some((item: any) => item.Status)
      );
    }
    return false;
  }, [paymentModes]);

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
      if (!props.isAdmin && props.gatewayConfigurations?.data?.GatewayName)
        pushClevertapEvent({
          eventName:
            clevertapEventConfigList.SMART_ROUTING_GATEWAY_CREATED.eventName,
          eventPayload: {
            gatewayName: props.gatewayConfigurations.data.GatewayName,
          },
        });
      notify({
        message:
          validationMessages?.GATEWAY_CREATED_SUCCESSFULLY ??
          DEFAULT_API_SUCCESS,
        type: 'success',
        description:
          validationMessages?.GATEWAY_CREATED_SUCCESSFULLY_DESCRIPTION?.replace(
            '${gatewayId}',
            props.gatewaySettingPayload?.gatewayId
          ),
      });
      props.clearSaveGatewayAction();
      push(UiRoutes.SMART_ROUTING);
    } else if (isFailure) {
      notify({
        message: validationMessages.GATEWAY_CREATION_FAILED,
        type: 'error',
        description: errorMessage,
      });
      props.clearSaveGatewayAction();
      push(UiRoutes.SMART_ROUTING);
    }
  }, [props.saveGatewayState]);

  const handleToggle = (e, key, index) => {
    paymentModes[key][index].Status = e;
    setPaymentModes({ ...paymentModes });
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

  return (
    <>
      <h5>Payment Configuration Details</h5>
      {/* TODO: To be fixed */}
      {/* <p className='subtitle'>Some information here</p> */}
      <div className='setting-colunm'>{renderPaymentMethods()}</div>
      <div className='action-button'>
        <Button
          btnStyleClass='secondry-button'
          onClick={handleGoBack}
          label='Go Back'
          enable
        />
        <Button
          btnStyleClass='primary-button'
          onClick={handleProceed}
          label='Proceed'
          enable={enableProceed}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({
  smartRoutingReducer,
  validationReducer,
  loginReducer,
}) => ({
  gatewayConfigurations: smartRoutingReducer.gatewayConfigurationsState,
  saveGatewayState: smartRoutingReducer.saveGatewayState,
  validationMessages: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  saveGatewayAction,
  clearSaveGatewayAction,
})(PaymentConfiguration);
