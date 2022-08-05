import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomNoDataFound from 'components/CustomNoDataFound';
import CustomTable from 'components/CustomTable';
import GatewayStatusChangeModal from '../../components/GatewayStatusChangeModal';
import {
  getGatewayListAction,
  clearGatewayListAction,
  changeGatewayStatusAction,
  clearChangeGatewayStatusAction,
} from 'redux/actions/smartRouting';
import { getMerchantIdFromStore, checkPermissions } from 'lib/helper';
import notify from 'lib/notifiy';
import { GATEWAY_TABLE_CONSTANTS } from './constants';
import Props from './typing';

const GateWays: FC<Props> = (props): JSX.Element => {
  const { validationMessages } = props;
  const merchantId = getMerchantIdFromStore();
  const [clickedActionBtnId, setClickedActionBtnId] = useState<string | null>(
    null
  );
  const [statusChangeGatewayID, setStatusChangeGatewayID] =
    useState<string>('');
  const [gatewayCurrentStatus, setGatewayCurrentStatus] =
    useState<boolean>(true);

  useEffect(() => {
    props.getGatewayListAction(merchantId);
  }, []);

  useEffect(() => {
    const { isFailure } = props.gatewayListState;
    if (isFailure) {
      notify({
        message: validationMessages.FETCHING_GATEWAYS_FAILED,
        type: 'error',
        description: validationMessages.REQUEST_NOT_PROCESSED,
      });
    }
  }, [props.gatewayListState]);

  useEffect(() => {
    const { isSuccess, isFailure } = props.changeGatewayStatusState;

    if (isSuccess) {
      notify({
        type: 'success',
        message: validationMessages.STATUS_UPDATED_SUCCESSFULLY,
        description: validationMessages.STATUS_UPDATED_SUCCESSFULLY_DESCRIPTION,
      });
      setStatusChangeGatewayID('');
      props.clearChangeGatewayStatusAction();
      props.getGatewayListAction(merchantId);
    } else if (isFailure) {
      notify({
        type: 'error',
        message: 'Status',
        description: validationMessages.REQUEST_NOT_PROCESSED,
      });
      setStatusChangeGatewayID('');
      props.clearChangeGatewayStatusAction();
    }
  }, [props.changeGatewayStatusState]);

  const handleStatusUpdate = (isActive: boolean) => {
    const payload = {
      MerchantId: merchantId,
      GatewayId: parseInt(statusChangeGatewayID),
      Status: isActive,
    };
    props.changeGatewayStatusAction(payload);
  };

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    props.getGatewayListAction(merchantId, {
      orderBy: columnName,
      order: order,
    });
  };

  return (
    <div>
      <div className='tab-content-header'>
        Gateways
        {checkPermissions('CREATE_GATEWAY') && (
          <Link
            className='secondry-button create-gateway-link'
            to={'/smart-routing/gateway/create'}
          >
            Configure Gateways
          </Link>
        )}
      </div>
      <div className='margin-bottom-24'>
        {props.gatewayListState &&
        Array.isArray(props.gatewayListState.list) &&
        props.gatewayListState.list &&
        props.gatewayListState.list.length > 0 ? (
          <CustomTable
            columns={GATEWAY_TABLE_CONSTANTS({
              clickedActionBtnId,
              setClickedActionBtnId,
              setStatusChangeGatewayID,
              setGatewayCurrentStatus,
            })}
            dataSource={
              (props.gatewayListState &&
                Array.isArray(props.gatewayListState.list) &&
                props.gatewayListState.list) ||
              []
            }
            handleSorting={handleSorting}
          />
        ) : (
          <CustomNoDataFound
            title='There are no gateways here!'
            subTitle='Your gateways will show up here!'
          />
        )}
      </div>
      {Boolean(statusChangeGatewayID) && (
        <GatewayStatusChangeModal
          handleCancel={() => setStatusChangeGatewayID('')}
          currentStatus={gatewayCurrentStatus}
          handleSave={handleStatusUpdate}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ smartRoutingReducer, validationReducer }) => ({
  gatewayListState: smartRoutingReducer.gatewayListState,
  changeGatewayStatusState: smartRoutingReducer.changeGatewayStatusState,
  validationMessages: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, {
  getGatewayListAction,
  clearGatewayListAction,
  changeGatewayStatusAction,
  clearChangeGatewayStatusAction,
})(GateWays);
