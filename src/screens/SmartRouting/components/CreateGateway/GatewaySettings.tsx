import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import Select from 'components/Select';
import {
  getUnmappedGatewayListAction,
  clearUnmappedGatewayListAction,
} from 'redux/actions/smartRouting';
import { getMerchantIdFromStore } from 'lib/helper';
import notify from 'lib/notifiy';
import { GatewaySettingProps } from './typing';

const GatewaySettings: FC<GatewaySettingProps> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();

  const { setCurrentStep, setPayload, payload } = props;
  const handleGatewayChange = (value: string) => {
    const id = props.unmappedGatewayListState?.list?.reduce(
      (matchingGatewayId, item: { GatewayName: string; GatewayId: number }) => {
        if (item.GatewayName === value) {
          return item.GatewayId;
        }
        return matchingGatewayId;
      },
      undefined
    );
    setPayload({
      gateway: value,
      gatewayId: id,
    });
  };

  const handleProceed = () => {
    setCurrentStep(2);
  };

  useEffect(() => {
    props.getUnmappedGatewayListAction(merchantId);
  }, []);

  useEffect(() => {
    const { isFailure } = props.unmappedGatewayListState;
    if (isFailure) {
      notify({
        message: "Fetching Gateways Failed",
        type: "error",
        description: `Your request could not be processed. Please try later.`,
      });
    }
  }, [props.unmappedGatewayListState]);

  return (
    <>
      <h5>Gateway Settings</h5>
      {/* <p className='subtitle'>Some information here</p> */}
      <div className='form-group'>
        <label>Gateway</label>
        <Select
          optionList={
            (props.unmappedGatewayListState &&
              Array.isArray(props.unmappedGatewayListState.list) &&
              props.unmappedGatewayListState.list.map(
                (gateway: { GatewayName: string; GatewayId: number }) => {
                  return {
                    label: gateway.GatewayName,
                    value: gateway.GatewayName,
                  };
                }
              )) ||
            []
          }
          placeholder='Select'
          onChange={handleGatewayChange}
          defaultValue={payload.gateway}
          wrapperClass='gateway-list-dropdown'
        />
      </div>
      <div className='action-button'>
        <Button
          btnStyleClass='primary-button'
          onClick={handleProceed}
          label='Proceed'
          enable={Boolean(payload.gateway)}
        />
      </div>
    </>
  );
};

const mapStateToProps = ({ smartRoutingReducer }) => ({
  unmappedGatewayListState: smartRoutingReducer.unmappedGatewayListState,
});

export default connect(mapStateToProps, {
  getUnmappedGatewayListAction,
  clearUnmappedGatewayListAction,
})(GatewaySettings);
