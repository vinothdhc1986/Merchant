import React, { useState, useEffect, FC, useMemo } from 'react';
import { connect } from 'react-redux';
import ConfirmationModal from 'components/ConfirmationModal';
import Button from 'components/Button';
import ManagePriorityRoutingModal from '../../components/ManagePriorityRoutingModal';
import CustomTable from 'components/CustomTable';
import {
  getBinListAction,
  getCardListAction,
  getIssuerListAction,
  getCardBrandNamesAction,
  getIssuerNamesAction,
  createPreferenceScoreAction,
  clearCreatePreferenceScoreAction,
  deletePreferenceScoreAction,
  clearDeletePreferenceScoreAction,
  clearBinListAction,
  clearIssuerListAction,
  clearCardListAction,
} from 'redux/actions/smartRouting';
import { toPascal, getMerchantIdFromStore, checkPermissions } from 'lib/helper';
import { DEFAULT_API_ERROR, DEFAULT_API_SUCCESS } from 'lib/constants';
import notify from 'lib/notifiy';
import { PREFERENCE_SCORES_TABLE_CONSTANTS } from './constants';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props, { preferenceType } from './typing';

const PreferenceScores: FC<Props> = (props): JSX.Element => {
  const { validationMessages } = props;

  const merchantId = getMerchantIdFromStore();
  const [binClickedActionBtnId, setBinClickedActionBtnId] = useState<
    string | null
  >(null);
  const [issuerClickedActionBtnId, setIssuerClickedActionBtnId] = useState<
    string | null
  >(null);
  const [cardClickedActionBtnId, setCardClickedActionBtnId] = useState<
    string | null
  >(null);
  const [deletePreferenceRoutingPayload, setDeletePreferenceRoutingPayload] =
    useState<{
      type: string;
      title: string;
      gateway: string;
      preferenceScore: number | string;
    }>({
      type: '',
      title: '',
      gateway: '',
      preferenceScore: '',
    });

  const [managePreferenceRoutingPayload, setManagePreferenceRoutingPayload] =
    useState<{
      show: boolean;
      id: string;
      titleValue: string;
      gateway: string;
      preferenceScore: string;
      mode: 'add' | 'edit';
      type: preferenceType;
    }>({
      show: false,
      id: '',
      titleValue: '',
      gateway: '',
      preferenceScore: '',
      mode: 'add',
      type: 'bin',
    });

  useEffect(() => {
    props.getBinListAction(merchantId);
    props.getCardListAction(merchantId);
    props.getIssuerListAction(merchantId);
    props.getCardBrandNamesAction();
    props.getIssuerNamesAction();
    return () => {
      props.clearCreatePreferenceScoreAction();
      props.clearDeletePreferenceScoreAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, responseCode, extra } =
      props.createPreferenceScoreState;
    if (isSuccess) {
      switch (managePreferenceRoutingPayload.type) {
        case 'bin':
          if (managePreferenceRoutingPayload.mode === 'add') {
            if (!props.isAdmin)
              pushClevertapEvent({
                eventName:
                  clevertapEventConfigList
                    .SMART_ROUTING_PREFERENCE_SCORE_BIN_ROUTING_UPDATED
                    .eventName,
                eventPayload: {
                  gatewayChosen: extra.gateway,
                },
              });
            notify({
              message:
                validationMessages?.SMART_ROUTING_BIN_ROUTING_CREATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_BIN_ROUTING_CREATED_SUCCESS_DESCRIPTION ??
                '',
            });
          } else {
            notify({
              message:
                validationMessages?.SMART_ROUTING_BIN_ROUTING_UPDATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_BIN_ROUTING_UPDATED_SUCCESS_DESCRIPTION ??
                '',
            });
          }
          props.getBinListAction(merchantId);
          break;
        case 'card':
          if (managePreferenceRoutingPayload.mode === 'add') {
            if (!props.isAdmin)
              pushClevertapEvent({
                eventName:
                  clevertapEventConfigList
                    .SMART_ROUTING_PREFERENCE_SCORE_CARD_BRAND_ROUTING_UPDATED
                    .eventName,
                eventPayload: {
                  cardBrand: extra.titleValue,
                  gatewayChosen: extra.gateway,
                  preferenceScore: extra.preferenceScore,
                },
              });
            notify({
              message:
                validationMessages?.SMART_ROUTING_BRAND_ROUTING_CREATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_BRAND_ROUTING_CREATED_SUCCESS_DESCRIPTION ??
                '',
            });
          } else {
            notify({
              message:
                validationMessages?.SMART_ROUTING_BRAND_ROUTING_UPDATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_BRAND_ROUTING_UPDATED_SUCCESS_DESCRIPTION ??
                '',
            });
          }
          props.getCardListAction(merchantId);
          break;
        case 'issuer':
          if (managePreferenceRoutingPayload.mode === 'add') {
            if (!props.isAdmin)
              pushClevertapEvent({
                eventName:
                  clevertapEventConfigList
                    .SMART_ROUTING_PREFERENCE_SCORE_ISSUER_ROUTING_UPDATED
                    .eventName,
                eventPayload: {
                  issuerName: extra.titleValue,
                  gatewayChosen: extra.gateway,
                  preferenceScore: extra.preferenceScore,
                },
              });
            notify({
              message:
                validationMessages?.SMART_ROUTING_ISSUER_ROUTING_CREATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_ISSUER_ROUTING_CREATED_SUCCESS_DESCRIPTION ??
                '',
            });
          } else {
            notify({
              message:
                validationMessages?.SMART_ROUTING_ISSUER_ROUTING_UPDATED_SUCCESS ??
                DEFAULT_API_SUCCESS,
              type: 'success',
              description:
                validationMessages?.SMART_ROUTING_ISSUER_ROUTING_UPDATED_SUCCESS_DESCRIPTION ??
                '',
            });
          }
          props.getIssuerListAction(merchantId);
          break;
        default:
          break;
      }
      setManagePreferenceRoutingPayload({
        ...managePreferenceRoutingPayload,
        show: false,
        mode: 'add',
      });
    } else if (isFailure) {
      let errorDescription = validationMessages?.REQUEST_NOT_PROCESSED ?? '';
      if (responseCode === '3090') {
        // response code for mapping already exists
        errorDescription =
          validationMessages?.SMART_ROUTING_PREFERENCE_MAPPING_ALREADY_EXISTS ??
          '';
      }
      switch (managePreferenceRoutingPayload.type) {
        case 'bin':
          notify({
            message:
              validationMessages?.SMART_ROUTING_BIN_ROUTING_CREATED_FAILURE ??
              DEFAULT_API_ERROR,
            type: 'error',
            description: errorDescription,
          });
          props.getBinListAction(merchantId);
          break;
        case 'card':
          notify({
            message:
              validationMessages?.SMART_ROUTING_BRAND_ROUTING_CREATED_FAILURE ??
              DEFAULT_API_ERROR,
            type: 'error',
            description: errorDescription,
          });
          props.getCardListAction(merchantId);
          break;
        case 'issuer':
          notify({
            message:
              validationMessages?.SMART_ROUTING_ISSUER_ROUTING_CREATED_FAILURE ??
              DEFAULT_API_ERROR,
            type: 'error',
            description: errorDescription,
          });
          props.getIssuerListAction(merchantId);
          break;
        default:
          break;
      }
    }
  }, [props.createPreferenceScoreState]);

  useEffect(() => {
    const { isSuccess, isFailure, responseMessage } =
      props.deletePreferenceScoreState;
    if (isSuccess) {
      switch (deletePreferenceRoutingPayload.type) {
        case 'bin':
          notify({
            message:
              validationMessages?.SMART_ROUTING_BIN_ROUTE_DELETE ??
              DEFAULT_API_ERROR,
            type: 'success',
            description:
              validationMessages?.SMART_ROUTING_BIN_ROUTE_DELETE_DESCRIPTION ??
              '',
          });
          props.getBinListAction(merchantId);
          break;
        case 'card':
          notify({
            message:
              validationMessages?.SMART_ROUTING_BRAND_ROUTE_DELETE ??
              DEFAULT_API_ERROR,
            type: 'success',
            description:
              validationMessages?.SMART_ROUTING_BRAND_ROUTE_DELETE_DESCRIPTION ??
              '',
          });
          props.getCardListAction(merchantId);
          break;
        case 'issuer':
          notify({
            message:
              validationMessages?.SMART_ROUTING_ISSUER_ROUTE_DELETE ??
              DEFAULT_API_ERROR,
            type: 'success',
            description:
              validationMessages?.SMART_ROUTING_ISSUER_ROUTE_DELETE_DESCRIPTION ??
              '',
          });
          props.getIssuerListAction(merchantId);
          break;
        default:
          break;
      }
      setDeletePreferenceRoutingPayload({
        ...deletePreferenceRoutingPayload,
        gateway: '',
      });
    } else if (isFailure) {
      notify({
        message: 'Failed',
        type: 'error',
        description: responseMessage,
      });
    }
  }, [props.deletePreferenceScoreState]);

  const handleDeletePreferenceScore = (data: {
    title: string;
    type: preferenceType;
    gateway: string;
    preferenceScore: string;
  }) => {
    const { title, type, gateway, preferenceScore } = data;
    setDeletePreferenceRoutingPayload({
      title,
      type,
      gateway,
      preferenceScore,
    });
  };

  const handleAddNewRouting = (type: preferenceType) => {
    setManagePreferenceRoutingPayload({
      ...managePreferenceRoutingPayload,
      show: true,
      mode: 'add',
      type,
    });
  };

  const handleEditRouting = (
    rowData,
    titleValue: string,
    type: preferenceType
  ) => {
    setManagePreferenceRoutingPayload({
      ...managePreferenceRoutingPayload,
      show: true,
      mode: 'edit',
      id: rowData.id,
      gateway: rowData.GatewayName,
      preferenceScore: rowData.PreferenceScore,
      titleValue,
      type,
    });
  };

  const handleManagePrioritySave = (data) => {
    props.createPreferenceScoreAction({
      type: data.type,
      titleValue: data.titleValue,
      preferenceScore: data.preferenceScore,
      gateway: data.gateway,
      merchantId: merchantId,
      isUpdated: data?.isUpdated,
    });
  };

  useEffect(() => {
    const { isFailure } = props.binListState;
    if (isFailure) {
      notify({
        message: 'Fetching bin routing Failed',
        type: 'error',
        description: props.validationMessages.SOMETHING_WENT_WRONG,
      });
      props.clearBinListAction();
    }
  }, [props.binListState]);

  useEffect(() => {
    const { isFailure } = props.issuerListState;
    if (isFailure) {
      notify({
        message: 'Fetching issuer routing Failed',
        type: 'error',
        description: props.validationMessages.SOMETHING_WENT_WRONG,
      });
      props.clearIssuerListAction();
    }
  }, [props.issuerListState]);

  useEffect(() => {
    const { isFailure } = props.cardBrandListState;
    if (isFailure) {
      notify({
        message: 'Fetching card brand routing Failed',
        type: 'error',
        description: props.validationMessages.SOMETHING_WENT_WRONG,
      });
      props.clearCardListAction();
    }
  }, [props.cardBrandListState]);

  // Handle Sorting
  const handleBinSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    props.getBinListAction(merchantId, {
      orderBy: columnName,
      order: order,
    });
  };

  const handleIssuerSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    props.getIssuerListAction(merchantId, {
      orderBy: columnName,
      order: order,
    });
  };

  const handleCardBrandSorting = ({
    columnName,
    order,
  }: {
    columnName: string;
    order: string;
  }) => {
    props.getCardListAction(merchantId, {
      orderBy: columnName,
      order: order,
    });
  };

  const activeGatewayNames = useMemo(() => {
    if (props.gatewayListState && Array.isArray(props.gatewayListState.list)) {
      return props.gatewayListState.list
        .filter((item) => item.status === 2)
        .map((item) => ({
          label: item.gatewayName,
          value: item.gatewayName,
        }));
    }
    return [];
  }, [props.gatewayListState]);

  return (
    <div>
      <div className='tab-content-header'>
        By Bin
        {checkPermissions('CREATE_ROUTES') && (
          <Button
            btnStyleClass='secondry-button'
            onClick={() => handleAddNewRouting('bin')}
            label='Create Bin Routing'
            enable
          />
        )}
      </div>
      <div className='margin-bottom-24'>
        <CustomTable
          columns={PREFERENCE_SCORES_TABLE_CONSTANTS({
            clickedActionBtnId: binClickedActionBtnId,
            setClickedActionBtnId: setBinClickedActionBtnId,
            type: 'bin',
            handleDeletePreferenceScore: (rowData) =>
              handleDeletePreferenceScore({
                type: 'bin',
                gateway: rowData.GatewayName,
                preferenceScore: rowData.PreferenceScore,
                title: rowData['ISIN'],
              }),
            handleEditRouting,
          })}
          dataSource={
            props.binListState &&
            Array.isArray(props.binListState.list) &&
            props.binListState.list
          }
          handleSorting={handleBinSorting}
        />
      </div>
      <div className='tab-content-header '>
        By Issuer
        {checkPermissions('CREATE_ROUTES') && (
          <Button
            btnStyleClass='secondry-button'
            onClick={() => handleAddNewRouting('issuer')}
            label='Create Issuer Routing'
            enable
          />
        )}
      </div>
      <div className='margin-bottom-24'>
        <CustomTable
          columns={PREFERENCE_SCORES_TABLE_CONSTANTS({
            clickedActionBtnId: issuerClickedActionBtnId,
            setClickedActionBtnId: setIssuerClickedActionBtnId,
            type: 'issuer',
            handleDeletePreferenceScore: (rowData) =>
              handleDeletePreferenceScore({
                type: 'issuer',
                gateway: rowData.GatewayName,
                preferenceScore: rowData.PreferenceScore,
                title: rowData['IssuerName'],
              }),
            handleEditRouting,
          })}
          dataSource={
            props.issuerListState &&
            Array.isArray(props.issuerListState.list) &&
            props.issuerListState.list
          }
          handleSorting={handleIssuerSorting}
        />
      </div>
      <div className='tab-content-header '>
        By Card Brand
        {checkPermissions('CREATE_ROUTES') && (
          <Button
            btnStyleClass='secondry-button'
            onClick={() => handleAddNewRouting('card')}
            label='Create Card Brand Routing'
            enable
          />
        )}
      </div>
      <div className='margin-bottom-24'>
        <CustomTable
          columns={PREFERENCE_SCORES_TABLE_CONSTANTS({
            clickedActionBtnId: cardClickedActionBtnId,
            setClickedActionBtnId: setCardClickedActionBtnId,
            type: 'card',
            handleDeletePreferenceScore: (rowData) =>
              handleDeletePreferenceScore({
                type: 'card',
                gateway: rowData.GatewayName,
                preferenceScore: rowData.PreferenceScore,
                title: rowData['CardBrandName'],
              }),
            handleEditRouting,
          })}
          dataSource={
            props.cardBrandListState &&
            Array.isArray(props.cardBrandListState.list) &&
            props.cardBrandListState.list
          }
          handleSorting={handleCardBrandSorting}
        />
      </div>
      {/* <div className='tab-content-header '>
        By Transaction Type
        <Button
          btnStyleClass='secondry-button'
          onClick={() => handleAddNewRouting(PREFERENCE_SCORE_TYPE.transaction)}
          label='Create Transaction Type Routing'
          enable
        />
      </div>
      <div className='margin-bottom-24'>
        <Table
          cols={PREFERENCE_SCORES_TABLE_CONSTANTS({
            clickedActionBtnId: transactionClickedActionBtnId,
            setClickedActionBtnId: setTransactionClickedActionBtnId,
            type: 'transaction',
            handleDeletePreferenceScore: (rowData) =>
              handleDeletePreferenceScore({
                id: rowData.id,
                type: PREFERENCE_SCORE_TYPE.transaction,
                gateway: rowData.gateway,
                preferenceScore: rowData.preferenceScore,
                title: rowData.transaction,
              }),
            handleEditRouting,
          })}
          records={dummyData}
        />
      </div> */}
      {deletePreferenceRoutingPayload.gateway && (
        <ConfirmationModal
          title={`Delete ${toPascal(
            deletePreferenceRoutingPayload.type
          )} Routing`}
          content={`Are you sure you want to delete the ${toPascal(
            deletePreferenceRoutingPayload.type
          )} ${deletePreferenceRoutingPayload.title} Route mapped to Gateway ${
            deletePreferenceRoutingPayload.gateway
          } with preference score ${
            deletePreferenceRoutingPayload.preferenceScore
          }?`}
          handleCancel={() =>
            setDeletePreferenceRoutingPayload({
              ...deletePreferenceRoutingPayload,
              gateway: '',
            })
          }
          handleSave={() =>
            // setDeletePreferenceRoutingPayload({
            //   ...deletePreferenceRoutingPayload,
            //   gateway: '',
            // })
            props.deletePreferenceScoreAction({
              type: deletePreferenceRoutingPayload.type,
              titleValue: deletePreferenceRoutingPayload.title,
              gateway: deletePreferenceRoutingPayload.gateway,
              preferenceScore: deletePreferenceRoutingPayload.preferenceScore,
              merchantId: merchantId,
            })
          }
          confirmText='Delete'
        />
      )}
      {managePreferenceRoutingPayload.show && (
        <ManagePriorityRoutingModal
          handleCancel={() =>
            setManagePreferenceRoutingPayload({
              ...managePreferenceRoutingPayload,
              show: false,
              mode: 'add',
            })
          }
          payload={managePreferenceRoutingPayload}
          cardBrandNames={
            props.allCardBrandNameState &&
            Array.isArray(props.allCardBrandNameState.list) &&
            props.allCardBrandNameState.list
          }
          issuerNames={
            props.allIssuerNameState &&
            Array.isArray(props.allIssuerNameState.list) &&
            props.allIssuerNameState.list
          }
          gatewayNames={activeGatewayNames}
          handleSave={handleManagePrioritySave}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({
  smartRoutingReducer,
  validationReducer,
  loginReducer,
}) => ({
  binListState: smartRoutingReducer.binListState,
  issuerListState: smartRoutingReducer.issuerListState,
  cardBrandListState: smartRoutingReducer.cardBrandListState,
  allIssuerNameState: smartRoutingReducer.allIssuerNameState,
  allCardBrandNameState: smartRoutingReducer.allCardBrandNameState,
  gatewayListState: smartRoutingReducer.gatewayListState,
  createPreferenceScoreState: smartRoutingReducer.createPreferenceScoreState,
  deletePreferenceScoreState: smartRoutingReducer.deletePreferenceScoreState,
  validationMessages: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getBinListAction,
  getCardListAction,
  getIssuerListAction,
  getCardBrandNamesAction,
  getIssuerNamesAction,
  createPreferenceScoreAction,
  clearCreatePreferenceScoreAction,
  deletePreferenceScoreAction,
  clearDeletePreferenceScoreAction,
  clearBinListAction,
  clearIssuerListAction,
  clearCardListAction,
})(PreferenceScores);
