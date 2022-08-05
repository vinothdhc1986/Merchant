import React, { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { tableConstants } from './remitter.constants';
import CustomTable from '../../../../../../../components/CustomTable';
import {
  remitterAccountsListAction,
  clearRemitterAccountsListAction,
  clearAddRemitterAccountAction,
  clearUpdateRemitterAccountAction,
  updateRemitterAccountAction,
} from '../../../../../../../redux/actions/payouts';
import notify from '../../../../../../../lib/notifiy';
import ConfirmationModal from 'components/ConfirmationModal';
import Button from '../../../../../../../components/Button';
import Modal from '../../../../../../../components/Modal';
import { getMerchantIdFromStore } from '../../../../../../../lib/helper';
import CustomNoDataFound from '../../../../../../../components/CustomNoDataFound';
import AddRemitterModal from './AddRemitterModal';
import Props, {
  SelectedRowType,
  RemitterAccountsListRecordType,
} from './typing';

const RemitterAccountsList: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { remitterAccountsList, totalRecords } = props;
  const [selectedRow, setSelectedRow] = useState<SelectedRowType>(null);
  const [isAddRemitterModal, setIsAddRemitterModal] = useState(false);
  const [isDeactivateConfirmationModal, setIsDeactivateConfirmationModla] =
    useState(false);
  const [accountIdToDeactivate, setAccountIdToDeactivate] = useState<
    number | null
  >(null);

  const fetchRemitterAccountsList = () => {
    props.remitterAccountsListAction({
      merchantId,
    });
  };

  useEffect(() => {
    fetchRemitterAccountsList();
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.addRemitterAccountState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage || 'Account has been addedd successfully.',
      });
      props.clearAddRemitterAccountAction();
      setIsAddRemitterModal(false);
      fetchRemitterAccountsList();
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description:
          errorMessage || props.validationErrors.SOMETHING_WENT_WRONG,
      });
    }
  }, [props.addRemitterAccountState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.updateRemitterAccountState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description: successMessage || 'Account has been updated successfully.',
      });
      props.clearUpdateRemitterAccountAction();
      setIsAddRemitterModal(false);
      fetchRemitterAccountsList();
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description:
          errorMessage || props.validationErrors.SOMETHING_WENT_WRONG,
      });
    }
  }, [props.updateRemitterAccountState]);

  const handleUpdateActionBtn = (rowData: RemitterAccountsListRecordType) => {
    if (rowData.status === 'INACTIVE') {
      props.updateRemitterAccountAction({
        id: rowData.id,
        merchantId,
        status: 'ACTIVE',
      });
    } else {
      setIsDeactivateConfirmationModla(true);
      setAccountIdToDeactivate(rowData.id);
    }
    setSelectedRow(null);
  };

  return (
    <>
      {isAddRemitterModal && (
        <Modal
          modalWrapperClass='refund-model'
          ModalBody={AddRemitterModal}
          modalBodyProps={{
            cancelHandler: () => setIsAddRemitterModal(false),
            validationErrors: props.validationErrors,
          }}
          onBackdropClick={() => setIsAddRemitterModal(false)}
        />
      )}
      <div className='payout-controls'>
        <div>
          <h5>Remitter Accounts</h5>
          <span>
            {' '}
            <b>Note:</b> You can only have upto 3 active remitter accounts at
            one time.
          </span>
        </div>

        <Button
          btnStyleClass={`secondry-button ${
            isAddRemitterModal && 'focus-button'
          }`}
          onClick={() => setIsAddRemitterModal(true)}
          label={'Add Account'}
          enable
        />
      </div>
      <div className='remitter-list-container'>
        {totalRecords > 0 ? (
          <CustomTable
            dataSource={remitterAccountsList}
            totalRecords={totalRecords}
            columns={tableConstants({
              selectedRow,
              setSelectedRow,
              handleUpdateActionBtn,
            })}
          />
        ) : (
          <CustomNoDataFound
            title='There are no Remitter Accounts here!'
            subTitle='Your Remitter Accounts list will show up here!'
          />
        )}
      </div>

      {isDeactivateConfirmationModal && (
        <ConfirmationModal
          title='Deactivate Account'
          confirmText='Confirm'
          iconType='warning'
          handleCancel={() => {
            setIsDeactivateConfirmationModla(false);
            setAccountIdToDeactivate(null);
          }}
          handleSave={() => {
            if (accountIdToDeactivate) {
              props.updateRemitterAccountAction({
                id: accountIdToDeactivate,
                merchantId,
                status: 'INACTIVE',
              });
              setIsDeactivateConfirmationModla(false);
              setAccountIdToDeactivate(null);
            }
          }}
          content='Are you sure you want to deactivate?'
        />
      )}
    </>
  );
};

const mapStateToProps = ({ payoutsReducer, validationReducer }) => ({
  validationErrors: validationReducer.validationErrorState.validationErrors,
  remitterAccountsList:
    payoutsReducer.remitterAccountsListState?.body?.data ?? [],
  totalRecords:
    payoutsReducer.remitterAccountsListState?.body?.data?.length ?? 0,
  addRemitterAccountState: payoutsReducer.addRemitterAccountState,
  updateRemitterAccountState: payoutsReducer.updateRemitterAccountState,
});

export default connect(mapStateToProps, {
  remitterAccountsListAction,
  clearRemitterAccountsListAction,
  clearAddRemitterAccountAction,
  clearUpdateRemitterAccountAction,
  updateRemitterAccountAction,
})(RemitterAccountsList);
