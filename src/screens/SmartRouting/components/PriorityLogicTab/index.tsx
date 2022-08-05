import React, { useState, useCallback, FC, useEffect } from 'react';
import { connect } from 'react-redux';
import Editor from '@monaco-editor/react';
import Button from 'components/Button';
import CustomSwitch from 'components/CustomSwitch';
import ConfirmationModal from 'components/ConfirmationModal';
import GatewayStatusChangeModal from '../GatewayStatusChangeModal';
import CustomTable from 'components/CustomTable';
import Modal from '../../../Login/components/Modal';
import UpdatePreferencesModal from '../UpdatePreferencesModal';
import CustomPriorityLogicPopup from 'screens/AdminCustomRouting/components/CustomPriorityLogicPopup';
import CustomModal from 'components/Modal';
import {
  getActiveSimpleRoutingLogicAction,
  clearGetActiveSimpleRoutingLogicAction,
  saveCustomLogicAction,
  clearSaveCustomLogicAction,
  getActivePriorityLogicAction,
  clearActivePriorityLogicAction,
  getPriorityLogicListAction,
  clearGetPriorityLogicListAction,
  deletePriorityLogicAction,
  clearDeletePriorityLogicAction,
} from 'redux/actions/smartRouting';
import { checkPermissions, getMerchantIdFromStore } from 'lib/helper';
import { DEFAULT_API_ERROR, DEFAULT_API_SUCCESS } from 'lib/constants';
import notify from 'lib/notifiy';
import {
  ENUM_DATA,
  PRIORITY_LOGIC_EXAMPLE,
  PRIORITY_LOGICS_TABLE_CONSTANTS,
} from './constants';
import Props from './typing';
import './style.scss';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';

const PriorityLogic: FC<Props> = (props): JSX.Element => {
  const { validationMessages } = props;
  const merchantId = getMerchantIdFromStore();
  const [isCustomRoutingEnabled, setCustomRoutingEnabled] =
    useState<boolean>(false);
  const [customRoutingLogic, setCustomRoutingLogic] = useState<string>('');
  const [isUpdatePreferencesModal, setIsPreferencesModal] = useState<
    true | false
  >(false);
  const [isEnumsDataModal, setIsEnumsDataModal] = useState<true | false>(false);
  const [isExampleModal, setIsExaampleModal] = useState<true | false>(false);
  const [clickedActionBtnId, setClickedActionBtnId] = useState<string | null>(
    null
  );
  const [statusChangePriorityLogicID, setStatusChangePriorityLogicID] =
    useState<string>('');
  const [priorityLogicCurrentStatus, setPriorityLogicCurrentStatus] =
    useState<boolean>(true);
  const [deletePriorityLogicPayload, setDeletePriorityLogicPayload] = useState<{
    configId: number | string;
  }>({
    configId: '',
  });
  const [viewCustomRoutingLogicPayload, setViewCustomRoutingLogicPayload] =
    useState({
      showModal: false,
      customLogic: '',
    });

  useEffect(() => {
    props.getActiveSimpleRoutingLogicAction(merchantId);
    props.getPriorityLogicListAction(merchantId);
  }, []);

  useEffect(() => {
    if (isCustomRoutingEnabled) {
      props.getActivePriorityLogicAction(merchantId);
    }
  }, [isCustomRoutingEnabled]);

  useEffect(() => {
    const { isFailure } = props.gatewayListState;
    if (isFailure) {
      notify({
        message:
          validationMessages?.FETCHING_GATEWAYS_FAILED ?? DEFAULT_API_ERROR,
        type: 'error',
        description: validationMessages?.REQUEST_NOT_PROCESSED ?? '',
      });
    }
  }, [props.gatewayListState]);

  useEffect(() => {
    const { isSuccess, isFailure, errorMessage } = props.saveCustomLogicState;
    if (isFailure && errorMessage) {
      props.clearSaveCustomLogicAction();
      notify({ type: 'error', message: 'Failed', description: errorMessage });
    } else if (isSuccess) {
      props.clearSaveCustomLogicAction();
      notify({
        type: 'success',
        message:
          validationMessages?.SMART_ROUTING_PRIORITY_LOGIC_UPDATE_SUCCESS ??
          DEFAULT_API_SUCCESS,
        description:
          validationMessages?.SMART_ROUTING_PRIORITY_LOGIC_UPDATE_SUCCESS_DESCRIPTION ??
          '',
      });
      props.getPriorityLogicListAction(merchantId);
    }
  }, [props.saveCustomLogicState]);

  useEffect(() => {
    const { logic, isFailure, responseMessage } = props.activePriorityLogic;
    if (logic) {
      setCustomRoutingLogic(logic);
    } else {
      setCustomRoutingLogic('');
    }
    if (isFailure) {
      notify({
        message:
          validationMessages?.SMART_ROUTING_FETCHING_ACTIVE_PRIORITY_LOGIC_FAILED ??
          DEFAULT_API_ERROR,
        type: 'error',
        description: responseMessage,
      });
    }
  }, [props.activePriorityLogic]);

  const handleUpdateClick = () => {
    if (isCustomRoutingEnabled) {
      const customLogicPayload = {
        strLogicEncoded: window.btoa(customRoutingLogic),
        preferenceScore: 3,
        merchantId: merchantId,
        isAdmin: false,
        email: props.loggedInUserEmail,
      };
      props.saveCustomLogicAction(customLogicPayload);
    } else {
      // eslint-disable-next-line no-console
      // console.log('Simple Logic Handling');
    }
  };

  useEffect(() => {
    const { isSuccess, isFailure } = props.deletePriorityLogicState;
    if (isSuccess) {
      setDeletePriorityLogicPayload({
        ...deletePriorityLogicPayload,
        configId: '',
      });
      notify({
        message:
          validationMessages?.SMART_ROUTING_PRIORITY_LOGIC_DELETE_SUCCESS ??
          DEFAULT_API_SUCCESS,
        type: 'success',
        description:
          validationMessages?.SMART_ROUTING_PRIORITY_LOGIC_DELETE_SUCCESS_DESCRIPTION ??
          '',
      });
      props.clearDeletePriorityLogicAction();
      props.getPriorityLogicListAction(merchantId);
      setCustomRoutingEnabled(false);
    } else if (isFailure) {
      setDeletePriorityLogicPayload({
        ...deletePriorityLogicPayload,
        configId: '',
      });
      notify({
        message:
          validationMessages?.SMART_ROUTING_PRIORITY_LOGIC_DELETE_FAILED ??
          DEFAULT_API_ERROR,
        type: 'error',
        description: validationMessages?.REQUEST_NOT_PROCESSED ?? '',
      });
      props.clearDeletePriorityLogicAction();
      props.getPriorityLogicListAction();
    }
  }, [props.deletePriorityLogicState]);

  const handleDeletePriorityLogic = (data: { configId: string | number }) => {
    const { configId } = data;
    setDeletePriorityLogicPayload({
      configId,
    });
  };

  const handleViewCustomLogicClick = (data: { Logic: string }) => {
    setViewCustomRoutingLogicPayload({
      showModal: true,
      customLogic: window.atob(data.Logic),
    });
  };

  const handleCloseViewCustomLogicModal = () =>
    setViewCustomRoutingLogicPayload({
      showModal: false,
      customLogic: '',
    });

  const getGatewayList = useCallback<() => string>(() => {
    let gatewayNames = '';
    const gatewayList = (props.gatewayListState.list || []).filter(
      (gateway) => gateway.status === 2
    );
    gatewayList.map((gateway, index) => {
      if (index === gatewayList.length - 1) {
        gatewayNames = gatewayNames + `${gateway.gatewayName}`;
      } else {
        gatewayNames = gatewayNames + `${gateway.gatewayName}, `;
      }
    });
    return gatewayNames;
  }, [props.gatewayListState.list]);

  // Handle Sorting
  const handleSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    props.getPriorityLogicListAction(merchantId, {
      orderBy: columnName,
      order: order,
    });
  };

  return (
    <div>
      <div className='white-box-content available-gateways'>
        <div className='available-gateways-header'>
          <h5>Available Gateways</h5>
          {checkPermissions('UPDATE_PREFERENCE_PRIORITY_LOGIC') && (
            <button
              onClick={() => {
                setIsPreferencesModal(true);
              }}
            >
              Update Priority Logic
            </button>
          )}
        </div>
        <p>{getGatewayList()}</p>
      </div>
      <div className='white-box-content'>
        <h5>Custom Routing Logic</h5>
        <div className='enable-custom-routing-switch'>
          <CustomSwitch
            label='Go to Custom Routing Logic'
            checked={isCustomRoutingEnabled}
            onChange={(value) => {
              if (!props.isAdmin)
                pushClevertapEvent(
                  value
                    ? clevertapEventConfigList.SMART_ROUTING_CUSTOM_ROUTING_LOGIC_TURNED_ON
                    : clevertapEventConfigList.SMART_ROUTING_CUSTOM_ROUTING_LOGIC_TURNED_OFF
                );
              setCustomRoutingEnabled(Boolean(value));
            }}
          />
        </div>
        {/* <p className='subtitle'>
          Please specify the routing preference of gateways in a comma-separated
          manner in the input box below. i.e. [Payment Gateway 1, Payment
          Gateway 2] (Payment Gateway 1 will have the highest priority, Payment
          Gateway 2 will have second highest priority)
        </p> */}
        <div className='form-group'>
          {isCustomRoutingEnabled ? (
            <>
              <label>Routing Logic</label>
              <Editor
                height='400px'
                width={'80%'}
                defaultLanguage='javascript'
                value={customRoutingLogic}
                onChange={(e) => setCustomRoutingLogic(e || '')}
              />
              <div className='custom-routing-buttons'>
                <button
                  onClick={() => {
                    setIsEnumsDataModal(true);
                  }}
                >
                  View All Enums Data
                </button>
                <button
                  onClick={() => {
                    setIsExaampleModal(true);
                  }}
                >
                  View Example
                </button>
              </div>
            </>
          ) : (
            // <input
            //   type='text'
            //   value={props.simpleRoutingState.logic}
            //   className='form-control'
            //   style={{ width: '70%' }}
            // />
            <></>
          )}
        </div>
        {isCustomRoutingEnabled &&
          checkPermissions('UPDATE_DELETE_CUSTOM_ROUTING_LOGIC') && (
            <div className='action-button'>
              <Button
                btnStyleClass={'primary-button'}
                onClick={handleUpdateClick}
                enable={!!customRoutingLogic}
                label={'Update'}
              />
            </div>
          )}
      </div>
      <div className='tab-content-header'>Custom Routing Logic Status</div>
      <div className='margin-bottom-24 custom-routing-logic-status-table'>
        <CustomTable
          columns={PRIORITY_LOGICS_TABLE_CONSTANTS({
            clickedActionBtnId,
            setClickedActionBtnId,
            setStatusChangePriorityLogicID,
            setPriorityLogicCurrentStatus,
            handleDeletePriorityLogic: (rowData) =>
              handleDeletePriorityLogic({
                configId: rowData.ConfigID,
              }),
            handleViewCustomLogicClick,
          })}
          dataSource={
            props.priorityLogicListState &&
            Array.isArray(props.priorityLogicListState.list) &&
            props.priorityLogicListState.list
          }
          handleSorting={handleSorting}
        />
      </div>
      {Boolean(statusChangePriorityLogicID) && (
        <GatewayStatusChangeModal
          handleCancel={() => setStatusChangePriorityLogicID('')}
          currentStatus={priorityLogicCurrentStatus}
          handleSave={() => {}}
        />
      )}
      {isUpdatePreferencesModal && (
        <UpdatePreferencesModal
          gateways={getGatewayList()}
          closeModal={() => {
            setIsPreferencesModal(false);
          }}
        />
      )}

      {(isEnumsDataModal || isExampleModal) && (
        <Modal
          backButtonEnable={true}
          onBackButtonClick={() => {
            setIsEnumsDataModal(false);
            setIsExaampleModal(false);
          }}
          className={'enum-data-modal'}
          onBackdropClick={() => {
            setIsEnumsDataModal(false);
            setIsExaampleModal(false);
          }}
        >
          <pre>
            <code>
              {isEnumsDataModal
                ? JSON.stringify(ENUM_DATA, undefined, 4)
                : PRIORITY_LOGIC_EXAMPLE}
            </code>
          </pre>
          <p>
            {isEnumsDataModal
              ? '*You can use only mapped enums in your logic'
              : '*You can write your logic in Javascript as shown in example'}
          </p>
        </Modal>
      )}

      {deletePriorityLogicPayload.configId && (
        <ConfirmationModal
          title={`Delete Priority Logic`}
          content={`Are you sure you want to delete this priority logic? Any custom routing configuration will be lost.`}
          handleCancel={() =>
            setDeletePriorityLogicPayload({
              ...deletePriorityLogicPayload,
              configId: '',
            })
          }
          handleSave={() =>
            props.deletePriorityLogicAction(
              deletePriorityLogicPayload.configId,
              merchantId
            )
          }
          confirmText='Delete'
        />
      )}

      {viewCustomRoutingLogicPayload.showModal && (
        <CustomModal
          ModalBody={CustomPriorityLogicPopup}
          onBackdropClick={handleCloseViewCustomLogicModal}
          modalBodyProps={{
            closeModal: handleCloseViewCustomLogicModal,
            customRoutingLogic: viewCustomRoutingLogicPayload.customLogic,
            modalType: 'review',
          }}
          modalWrapperClass='admin-custom-route-popup'
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  smartRoutingReducer,
  loginReducer,
  validationReducer,
}) => ({
  gatewayListState: smartRoutingReducer.gatewayListState,
  simpleRoutingState: smartRoutingReducer.simpleRoutingLogicState,
  saveCustomLogicState: smartRoutingReducer.saveCustomLogicState,
  activePriorityLogic: smartRoutingReducer.activePriorityLogicState,
  priorityLogicListState: smartRoutingReducer.priorityLogicListState,
  deletePriorityLogicState: smartRoutingReducer.deletePriorityLogicState,
  loggedInUserEmail: loginReducer?.loginState?.UserEmail ?? '',
  validationMessages: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getActiveSimpleRoutingLogicAction,
  clearGetActiveSimpleRoutingLogicAction,
  saveCustomLogicAction,
  clearSaveCustomLogicAction,
  getActivePriorityLogicAction,
  clearActivePriorityLogicAction,
  getPriorityLogicListAction,
  clearGetPriorityLogicListAction,
  deletePriorityLogicAction,
  clearDeletePriorityLogicAction,
})(PriorityLogic);
