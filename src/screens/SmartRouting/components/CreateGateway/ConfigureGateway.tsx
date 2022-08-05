/* eslint-disable react/jsx-key */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import {
  getGatewayConfigurationsAction,
  clearGatewayConfigurationsAction,
  setGatewayParams,
} from 'redux/actions/smartRouting';
import { getMerchantIdFromStore } from 'lib/helper';
import { ConfirgureGatewayProps } from './typing';

const inputTypes = {
  string: 'text',
};

const ConfigureGateway: FC<ConfirgureGatewayProps> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setCurrentStep, setPayload, payload } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [params, setParams] = useState<any>([]);

  const shouldEnableButton = useMemo(() => {
    let filledFieldsCount = 0;
    if (params.length) {
      params.forEach((item) => {
        if (item.Value || !item.Mandatory) {
          filledFieldsCount++;
        }
      });
      return filledFieldsCount === params.length;
    }
    return false;
  }, [params]);

  const handleChange = (e, index) => {
    const newParams = [...params];
    newParams[index].Value = e.target.value;
    setParams([...newParams]);
  };
  const handleProceed = () => {
    props.setGatewayParams({ params });
    setCurrentStep(3);
  };
  const handleGoBack = () => {
    setCurrentStep(1);
  };
  useEffect(() => {
    props.getGatewayConfigurationsAction(payload.gateway, merchantId, true);
  }, []);

  useEffect(() => {
    if (props?.gatewayConfigurations?.data?.Params?.length > 0) {
      setParams(props?.gatewayConfigurations?.data?.Params);
    }
  }, [props?.gatewayConfigurations?.data?.Params]);

  const renderInputFields = () => {
    const fields =
      props?.gatewayConfigurations?.data &&
      props.gatewayConfigurations.data.Params?.length > 0 &&
      props.gatewayConfigurations.data.Params.map((field, index) => {
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

  return (
    <>
      <h5>Configure Gateway</h5>
      {/* <p className='subtitle'>Some information here</p> */}
      {renderInputFields()}
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
          enable={shouldEnableButton}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ smartRoutingReducer }) => ({
  gatewayConfigurations: smartRoutingReducer.gatewayConfigurationsState,
});

export default connect(mapStateToProps, {
  getGatewayConfigurationsAction,
  clearGatewayConfigurationsAction,
  setGatewayParams,
})(ConfigureGateway);
