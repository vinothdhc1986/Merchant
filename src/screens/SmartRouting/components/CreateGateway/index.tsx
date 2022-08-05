import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AboutHeader from 'components/AboutHeader';
import Breadcrumb from 'components/Breadcrumb';
import GatewaySettings from './GatewaySettings';
import ConfigureGateway from './ConfigureGateway';
import PaymentConfiguration from './PaymentConfiguration';
import { clearGatewayConfigurationsAction } from 'redux/actions/smartRouting';
import { CREATE_NEW_GATEWAY_BREADCRUMB_CONFIG } from './constants';
import '../../styles.scss';

const CreateGateway: FC<{
  clearGatewayConfigurationsAction: CallableFunction;
}> = (props): JSX.Element => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [gatewaySettingPayload, setGatewaySettingPayload] = useState<{
    gateway: string | undefined;
    gatewayId: number | undefined;
  }>({
    gateway: undefined,
    gatewayId: undefined,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [configureGatewayPayload, setConfigureGatewayPayload] = useState<{
    mid: string;
    password: string;
    secretKey: string;
  }>({
    mid: '',
    password: '',
    secretKey: '',
  });

  useEffect(() => {
    return () => {
      props.clearGatewayConfigurationsAction();
    };
  }, []);

  const renderCreateGatewaySteps = (step: 1 | 2 | 3): JSX.Element => {
    switch (step) {
      case 1:
        return (
          <GatewaySettings
            setCurrentStep={setCurrentStep}
            payload={gatewaySettingPayload}
            setPayload={setGatewaySettingPayload}
          />
        );
      case 2:
        return (
          <ConfigureGateway
            payload={gatewaySettingPayload}
            setPayload={setConfigureGatewayPayload}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return (
          <PaymentConfiguration
            setCurrentStep={setCurrentStep}
            gatewaySettingPayload={gatewaySettingPayload}
          />
        );
      default:
        return (
          <GatewaySettings
            setCurrentStep={setCurrentStep}
            payload={gatewaySettingPayload}
            setPayload={setGatewaySettingPayload}
          />
        );
    }
  };
  return (
    <div className='smart-routing smart-routing-create-gateway'>
      <AboutHeader
        title='Smart Routing'
        content='Configure the routing logic of your integrated payment gateways based on data.'
      />
      <div className='screen-heading'>
        <Breadcrumb config={CREATE_NEW_GATEWAY_BREADCRUMB_CONFIG}
        showIcon={true}
        svgIcon='smartRouting-icon-white'
        svgDetail='Create Gateway'
        description={`Pine Labs' Plural Console is a system that facilitates the integration
        with a number of online payment gateways. It provides an umbrella-type
        relationship with payment gateways and promises you routing based on
        multiple parameters, thus improving your overall success rate during
        checkout.`} />
      </div>
      <div className='white-box-content'>
        {renderCreateGatewaySteps(currentStep)}
      </div>
    </div>
  );
};

export default connect(null, {
  clearGatewayConfigurationsAction,
})(CreateGateway);
