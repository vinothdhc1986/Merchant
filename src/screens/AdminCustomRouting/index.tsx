import React, { FC, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import SubHeader from '../../components/SubHeader';
import CustomTable from '../../components/CustomTable';
import CustomSearchInput from '../../components/CustomSearchInput';
import Modal from '../../components/Modal';
import notify from '../../lib/notifiy';
import CustomPriorityLogicPopup from './components/CustomPriorityLogicPopup';
import { getBase64Data } from '../../lib/helper';
import {
  getAdminCustomRoutingListAction,
  getAdminPriorityLogicAction,
  approveOrRejectLogicAction,
  clearApproveOrRejectLogicState,
  updateAdminPriorityLogicAction,
  clearUpdateAdminPriorityLogicState,
  getAutoSuggestSearchListAction,
  clearAutoSuggestSearchListAction,
} from '../../redux/actions/adminCustomRouting';
import { PER_PAGE_LIMIT } from '../../lib/constants';
import { tableConstants, STATUS_IDS_MAPPING } from './constants';
import Props, { SortingParamsType } from './typing';
import './style.scss';

const AdminCustomRouting: FC<Props> = (props): JSX.Element => {
  const {
    totalRecords,
    autoSuggestListState,
    customRoutingListRecords,
    adminPriorityLogicState,
    approveOrRejectLogicState,
    updateAdminPriorityLogicState,
  } = props;

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const [customRoutingLogic, setCustomRoutingLogic] = useState('');
  const [selectedRowId, setSelectedRowId] = useState<null | number>(null);
  const [currentConfigId, setCurrentConfigId] = useState<number | null>(null);
  const [customPriorityLogicModalType, setcustomPriorityLogicModalType] =
    useState<'review' | 'update' | ''>('');
  const [selectedRowStatus, setSelectedRowStatus] = useState('');

  const fetchAdminCustomRoutingListing = ({
    pageNo,
    sortBy,
    orderBy,
    search,
  }: {
    pageNo: number;
    sortBy?: string;
    orderBy?: string;
    search?: string;
  }) => {
    const requestPayload = {
      pageNo: pageNo || 1,
      limit: PER_PAGE_LIMIT,
      base64data: getBase64Data({
        sortBy: sortBy || 'merchantName',
        orderBy: orderBy || 'ASC',
      }),
    };
    if (search) {
      requestPayload.base64data = getBase64Data({
        sortBy: sortBy || 'merchantName',
        orderBy: orderBy || 'ASC',
        merchantName: searchText,
      });
    }
    props.getAdminCustomRoutingListAction(requestPayload);
  };

  useEffect(() => {
    return () => {
      props.clearApproveOrRejectLogicState();
      props.clearUpdateAdminPriorityLogicState();
    };
  }, []);

  useEffect(() => {
    if (selectedRowId) {
      setCurrentConfigId(selectedRowId);
    }
  }, [selectedRowId]);

  useEffect(() => {
    fetchAdminCustomRoutingListing({
      pageNo: page,
      sortBy,
      orderBy,
      search: searchText,
    });
  }, [page, sortBy, orderBy, searchText]);

  useEffect(() => {
    if (approveOrRejectLogicState.isSuccess) {
      notify({
        type: 'success',
        message: 'Status Updated Successfully',
        description: ``,
      });
      setcustomPriorityLogicModalType('');
    } else if (approveOrRejectLogicState.isFailure) {
      notify({
        type: 'error',
        message: 'Status Update Failed',
        description: ``,
      });
      setcustomPriorityLogicModalType('');
    }
    props.getAdminCustomRoutingListAction({
      pageNo: page,
    });
  }, [approveOrRejectLogicState]);

  useEffect(() => {
    if (adminPriorityLogicState) {
      setCustomRoutingLogic(adminPriorityLogicState);
    }
  }, [adminPriorityLogicState]);

  useEffect(() => {
    if (updateAdminPriorityLogicState.isSuccess) {
      const merchantDetails = customRoutingListRecords
        .filter((item) => Number(item.configId) === Number(currentConfigId))
        .pop();
      notify({
        type: 'success',
        message: 'Request Updated Successfully',
        description: `Custom Routing request for ${merchantDetails.merchantName} was updated successfully.`,
      });
      setcustomPriorityLogicModalType('');
    } else if (updateAdminPriorityLogicState.isFailure) {
      notify({
        type: 'error',
        message: 'Request Update Failed',
        description: `Your request could not be processed. Please try later.`,
      });
      setcustomPriorityLogicModalType('');
    }
  }, [updateAdminPriorityLogicState]);

  const onPageChange = (pageNo: number) => setPage(pageNo);

  const handleSorting = ({ columnName, order }: SortingParamsType) => {
    setSortBy(columnName);
    setOrderBy(order);
  };

  const reviewClickHandler = (rowData) => {
    setSelectedRowStatus(String(rowData.approvedStatusMsg).toLocaleLowerCase());
    props.getAdminPriorityLogicAction({
      configId: rowData.configId,
    });
    setcustomPriorityLogicModalType('review');
    setSelectedRowId(null);
  };

  const updateClickHandler = (rowData) => {
    props.getAdminPriorityLogicAction({
      configId: rowData.configId,
    });
    setcustomPriorityLogicModalType('update');
    setSelectedRowId(null);
  };

  const handleApprove = () => {
    props.approveOrRejectLogicAction({
      configId: Number(currentConfigId),
      approvedStatusId: STATUS_IDS_MAPPING.approved,
    });
  };

  const handleReject = () => {
    props.approveOrRejectLogicAction({
      configId: Number(currentConfigId),
      approvedStatusId: STATUS_IDS_MAPPING.reject,
    });
  };

  const handleUpdate = () => {
    props.updateAdminPriorityLogicAction({
      configId: Number(currentConfigId),
      customRoutingLogicBase64: window.btoa(customRoutingLogic),
    });
  };

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue);
    setPage(1);
  };

  const searchRecordsHandler = (value: string) => {
    if (value) {
      props.getAutoSuggestSearchListAction({ searchPattern: value });
    } else {
      props.clearAutoSuggestSearchListAction();
    }
  };

  return (
    <div className="admin-custom-routing-container">
      <SubHeader
        title="Custom Routing"
        showIcon={false}
        // description="Placeholder text here"
      />
      <div className="filtering-row">
        <CustomSearchInput
          placeholder="Search for a Merchant Name"
          list={autoSuggestListState || []}
          handleSearch={(searchValue) => handleSearch(searchValue)}
          searchRecordsHandler={(value) => searchRecordsHandler(value)}
        />
      </div>
      <CustomTable
        columns={tableConstants({
          selectedRowId,
          setSelectedRowId,
          reviewClickHandler,
          updateClickHandler,
        })}
        dataSource={customRoutingListRecords}
        handleSorting={handleSorting}
        showPagination={Boolean(totalRecords > 0)}
        currentPage={page}
        onPageChangeHandler={onPageChange}
        totalRecords={totalRecords}
      />

      {!!customPriorityLogicModalType && (
        <Modal
          ModalBody={CustomPriorityLogicPopup}
          modalBodyProps={{
            closeModal: () => {
              setcustomPriorityLogicModalType('');
              setSelectedRowStatus('');
            },
            modalType: customPriorityLogicModalType,
            customRoutingLogic,
            setCustomRoutingLogic,
            selectedRowStatus,
            handleApprove,
            handleReject,
            handleUpdate,
          }}
          modalWrapperClass="admin-custom-route-popup"
          onBackdropClick={() => setcustomPriorityLogicModalType('')}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ adminCustomRouting }) => ({
  customRoutingListRecords:
    adminCustomRouting.customRoutingList.data?.merchantInfoModelList ?? [],
  totalRecords: adminCustomRouting.customRoutingList.data?.totalRows ?? 0,
  adminPriorityLogicState: adminCustomRouting.adminPriorityLogicState.data,
  approveOrRejectLogicState: adminCustomRouting.approveOrRejectLogicState,
  updateAdminPriorityLogicState:
    adminCustomRouting.updateAdminPriorityLogicState,
  autoSuggestListState: adminCustomRouting.autoSuggestListState.data || [],
});

export default connect(mapStateToProps, {
  getAdminCustomRoutingListAction,
  getAdminPriorityLogicAction,
  approveOrRejectLogicAction,
  clearApproveOrRejectLogicState,
  updateAdminPriorityLogicAction,
  clearUpdateAdminPriorityLogicState,
  getAutoSuggestSearchListAction,
  clearAutoSuggestSearchListAction,
})(AdminCustomRouting);
