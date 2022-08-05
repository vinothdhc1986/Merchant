/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useState, useEffect } from 'react';
import imgURL from '../../lib/imgURL';
import Button from '../../components/Button';
import CustomTable from '../../components/CustomTable';
import {
  tableConstants,
  plansRecords,
  INIT_VISIBLE_COLUMNS_IDS,
} from './plans.constants';

import Props from './typing';
import './style.scss';
// import Filter from '../../components/Filter';
import SideModal from '../../components/SideModal';
import BulkUploadModal from '../../components/CustomDropzone';
import PlanFormBody from './components/PlanFormBody';
import ConfirmationModal from '../../components/ConfirmationModal';
import PlanDetailsSideModalBody from './components/PlanDetailsSideModalBody';
import FilterModalBody from './components/FilterModalBody';
import FilterModal from '../../components/Modal';
import Pagination from '../../components/Pagination';

const Plans: FC<Props> = (): JSX.Element => {
  const styles = {
    bgStrip: {
      background: `url(${imgURL['colour-bg']}) 0 0 no-repeat`,
    },
  };

  const INIT_PLAN_FORM_DATA = {
    planName: '',
    planDescription: '',
    amountPerUnit: '',
    billEvery: '',
    additionalNotes: '',
    tenureType: 'Days',
  };

  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [visibleColumns, setVisibleColumns] = useState<any>(
    INIT_VISIBLE_COLUMNS_IDS
  );
  const [clickedActionBtnId, setClickedActionBtnId] =
    useState<string | null>(null);

  const [isDeleteConfirmModal, setIsDeleteConfirmModal] =
    useState<boolean>(false);
  const [isDiscardChangesConfirmModal, setIsDiscardChangesConfirmModal] =
    useState<boolean>(false);
  const [selectedPlanToUpdate, setSelectedPlanToUpdate] = useState<any>(null);
  const [selectedPlanToDelete, setSelectedPlanToDelete] = useState<any>(null);

  const [isCreatePlan, setIsCreatePlan] = useState(false);
  const [isUpdatePlan, setIsUpdatePlan] = useState(false);

  const [isPlanDetailsSideModal, setIsPlanDetailsSideModal] = useState(false);
  const [selectedRowForPlanDetails, setSelectedRowForPlanDetails] =
    useState(null);

  const [isBulkUpload, setIsBulkUpload] = useState<boolean>(false);

  const [planFormData, setPlanFormData] =
    useState<{
      planName: string;
      planDescription: string;
      amountPerUnit: string;
      billEvery: string;
      additionalNotes: string;
      tenureType: string;
    }>(INIT_PLAN_FORM_DATA);

  const [planFormError, setPlanFormError] = useState<{
    planName: string;
    planDescription: string;
    amountPerUnit: string;
    billEvery: string;
    additionalNotes: string;
  }>({
    planName: '',
    planDescription: '',
    amountPerUnit: '',
    billEvery: '',
    additionalNotes: '',
  });

  /**
   * tigger changes in the update plan form data
   */
  useEffect(() => {
    // TODO: To be fixed
    // if (isUpdatePlan) {
    //   console.log('changed something in the update form');
    // }
  }, [planFormData]);

  const updatePlanClickHandler = (rowData) => {
    setIsUpdatePlan(true);
    setSelectedPlanToUpdate(rowData);
    setPlanFormData({
      ...planFormData,
      planName: rowData.planName,
      amountPerUnit: rowData.amount,
      billEvery: rowData.billingCycle,
    });
    setClickedActionBtnId(null);
  };

  const deletePlanClickHandler = (rowData) => {
    setIsDeleteConfirmModal(true);
    setSelectedPlanToDelete(rowData);
    setClickedActionBtnId(null);
  };

  const planFormHandleChange = (name, value) => {
    setPlanFormData({
      ...planFormData,
      [name]: value,
    });
    //Todo: In create plan check for plan name if plan name already exist or not
  };

  const planIdHandler = (rowData) => {
    setIsPlanDetailsSideModal(true);
    setSelectedRowForPlanDetails(rowData);
  };

  const handleCreatePlanSubmit = () => {
    // Todo: API Call to crate new plan
    setPlanFormData(INIT_PLAN_FORM_DATA);
    setIsCreatePlan(false);
  };

  const handleUpdatePlanSubmit = () => {};

  const handleUpdatePlanCancel = () => {
    setIsDiscardChangesConfirmModal(true);
  };

  const handleDeletePlanConfirm = () => {
    // Todo: API Call to delete the plan
    setSelectedPlanToDelete(null);
    setIsDeleteConfirmModal(false);
  };

  return (
    <React.Fragment>
      <div className="plans-container">
        <div className="about-payment-strp">
          <div className="bg-strp" style={styles.bgStrip}>
            <img src={imgURL['info-icon']} alt="info-icon" /> About Payments
          </div>
          <p>
            Manage all customized recurring payment plans made for your
            business.
          </p>
          <button className="close-strp">
            <img src={imgURL['close-icon']} alt="close" />
          </button>
        </div>
        <div className="heading-title">
          <div className="heading-detail">
            <h2>Plans</h2>
            <p>
              Create your custom plan with for your business’s recurring
              payments
            </p>
          </div>
          <div className="herder-button">
            <Button
              btnStyleClass="secondry-button border-0"
              label="View Bulk Upload History"
              onClick={() => {}}
              enable={true}
            />
            <Button
              btnStyleClass="secondry-button border-0"
              label="Bulk Upload Plans"
              onClick={() => setIsBulkUpload(true)}
              enable={true}
            />
            <Button
              btnStyleClass="secondry-button"
              label="Create New Plan"
              onClick={() => setIsCreatePlan(true)}
              enable={true}
            />
          </div>
        </div>
        <div className="filtering-row">
          <div className="plan-search-field">
            <input
              type="text"
              value=""
              placeholder="Search for a Plan Name/Plan ID"
            />
            <button className="search-bt">
              <img src={imgURL['search-icon']} alt="search" />
            </button>
          </div>
          <div className="filter-by">
            <button onClick={() => setIsFilter(true)}>
              <img src={imgURL['filter-icon']} alt="Filter By" /> Filter By
            </button>
          </div>

          <button>
            <img src={imgURL['download-icon']} alt="Download" /> Download
          </button>
        </div>
        <CustomTable
          columns={tableConstants(
            visibleColumns,
            planIdHandler,
            clickedActionBtnId,
            setClickedActionBtnId,
            updatePlanClickHandler,
            deletePlanClickHandler
          )}
          dataSource={plansRecords}
        />
        {/* <Pagination /> */}

        {isCreatePlan && (
          <SideModal
            closeModal={() => {
              setIsCreatePlan(false);
              setPlanFormData(INIT_PLAN_FORM_DATA);
            }}
            title={'Create a new Plan'}
            ModalBody={PlanFormBody}
            modalBodyProps={{
              planFormData,
              planFormError,
              handleChange: planFormHandleChange,
              isCreate: true,
              handleCreatePlanSubmit,
            }}
          />
        )}
        {isUpdatePlan && (
          <SideModal
            closeModal={() => {
              setIsUpdatePlan(false);
              setPlanFormData(INIT_PLAN_FORM_DATA);
            }}
            title={'Update Plan'}
            description={
              'The updates will be applicable to future subscriptions.'
            }
            ModalBody={PlanFormBody}
            modalBodyProps={{
              planFormData,
              planFormError,
              handleChange: planFormHandleChange,
              isCreate: false,
              handleUpdatePlanSubmit,
              handleUpdatePlanCancel,
            }}
          />
        )}
        {isDeleteConfirmModal && (
          <ConfirmationModal
            title={'Delete Plan Name'}
            content={
              '5 active subscriptions will be cancelled. Are you sure you want to delete this plan? This can not be undone.'
            }
            cancelText={'Yes, Delete Plan'}
            confirmText={'No, Cancel'}
            handleSave={() => {
              setIsDeleteConfirmModal(false);
              setSelectedPlanToDelete(null);
            }}
            handleCancel={handleDeletePlanConfirm}
          />
        )}
        {isDiscardChangesConfirmModal && (
          <ConfirmationModal
            title={'Are you sure?'}
            content={
              'This information you have entered will be lost. Are you sure you want to cancel?'
            }
            cancelText={'Yes, Cancel'}
            confirmText={'No, Stay on Page'}
            handleCancel={() => {
              setIsUpdatePlan(false);
              setIsDiscardChangesConfirmModal(false);
            }}
            handleSave={() => {
              setIsDiscardChangesConfirmModal(false);
            }}
          />
        )}
        {isPlanDetailsSideModal && (
          <SideModal
            closeModal={() => setIsPlanDetailsSideModal(false)}
            title={'Plan Details'}
            ModalBody={PlanDetailsSideModalBody}
            modalBodyProps={{
              rowData: selectedRowForPlanDetails,
            }}
          />
        )}
        {isFilter && (
          <FilterModal
            modalWrapperClass="filter-model plan-filter"
            ModalBody={FilterModalBody}
            modalBodyProps={{
              cancelHandler: () => setIsFilter(false),
              // selectedRowForRefund,
              // refundModalSaveHandler,
            }}
            onBackdropClick={() => setIsFilter(false)}
          />
        )}
        {/* {isBulkUpload && (
          <BulkUploadModal
            closeModal={() => setIsBulkUpload(false)}
            title={'Bulk Upload Plans'}
          />
        )} */}
      </div>
    </React.Fragment>
  );
};

export default Plans;
