import React, { FC, useState, useEffect } from 'react';
import Props from './typing';
import AboutHeader from '../../components/AboutHeader';
import ConfirmationModal from '../../components/ConfirmationModal';
import CustomTable from '../../components/CustomTable';
import notify from '../../lib/notifiy';
import {
  SUBSCRIPTION_TABLE_CONSTANTS,
  dummyData,
  cardsData,
  filterFields,
} from './constants';
import Button from '../../components/Button';
import imgURL from '../../lib/imgURL';
import Card from './components/Card';
import Filter from '../../components/Filter';
import AppliedFiltersComponent from '../../components/AppliedFilters';
import SideModal from '../../components/SideModal';
import CreateSubscriptionBody from './components/CreateSubscriptionBody';
import ViewSubscriptionDetailsModalBody from './components/ViewSubscriptionDetailsModalBody';

import './style.scss';

const Subscriptions: FC<Props> = (): JSX.Element => {
  const initFilterPayload = {
    amountPerUnit: '',
    billingCycle: {
      freq: '',
      tenureType: '',
    },
    paymentGateway: [],
    paymentMethod: [],
    status: [],
  };
  const [isFilter, setIsFilter] = useState<boolean>(false);
  const [filterPayload, setFilterPayload] = useState(initFilterPayload);
  const [appliedFilter, setAppliedFilter] = useState(initFilterPayload);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [appliedFiltersList, setAppliedFiltersList] = useState<any[]>([]);
  const [viewDetailPayload, setViewDetailPayload] = useState<{
    show: boolean;
    data;
  }>({
    show: false,
    data: {},
  });
  const [clickedActionBtnId, setClickedActionBtnId] = useState('');
  const [confirmationModalPayload, setConfirmationModalPayload] = useState<{
    show: boolean;
    message: string;
    title: string;
    handleConfirm: CallableFunction;
    confirmLabel: string;
    cancelLabel: string;
  }>({
    show: false,
    message: '',
    title: '',
    handleConfirm: () => {},
    confirmLabel: '',
    cancelLabel: '',
  });

  const [isCreateSubscriptionModal, setIsCreateSubscriptionModal] = useState(
    false
  );

  /**
   * @ Update applied filter list, if there is any update in filters
   */
  useEffect(() => {
    const allFilters: { keyName: string; value: string }[] = [];
    if (appliedFilter.amountPerUnit) {
      allFilters.push({
        keyName: 'Amount Per Unit',
        value: appliedFilter.amountPerUnit,
      });
    }
    if (
      appliedFilter.billingCycle.freq &&
      appliedFilter.billingCycle.tenureType
    ) {
      allFilters.push({
        keyName: 'Frequency',
        value: `${appliedFilter.billingCycle.freq} ${appliedFilter.billingCycle.tenureType}`,
      });
    }
    if (appliedFilter.paymentGateway.length > 0) {
      appliedFilter.paymentGateway.map((item) => {
        allFilters.push({
          keyName: 'Payment Gateway',
          value: `${item}`,
        });
      });
    }
    if (appliedFilter.paymentMethod.length > 0) {
      appliedFilter.paymentMethod.map((item) => {
        allFilters.push({
          keyName: 'Payment Method',
          value: `${item}`,
        });
      });
    }
    if (appliedFilter.status.length > 0) {
      appliedFilter.status.map((item) => {
        allFilters.push({
          keyName: 'Status',
          value: `${item}`,
        });
      });
    }
    setAppliedFiltersList(allFilters);
  }, [appliedFilter]);

  /**
   * Removed any specific filter Handler
   */
  const removeFilterHandler = ({ keyName, value }) => {
    const appliedFilterCopy = { ...appliedFilter };
    switch (keyName) {
      case 'Amount Per Unit':
        appliedFilterCopy.amountPerUnit = '';
        break;
      case 'Frequency':
        appliedFilterCopy.billingCycle = {
          freq: '',
          tenureType: '',
        };
        break;
      case 'Payment Gateway':
        appliedFilterCopy.paymentGateway = appliedFilterCopy.paymentGateway.filter(
          (item) => item !== value
        );
        break;
      case 'Payment Method':
        appliedFilterCopy.paymentMethod = appliedFilterCopy.paymentMethod.filter(
          (item) => item !== value
        );
        break;
      case 'Status':
        appliedFilterCopy.status = appliedFilterCopy.status.filter(
          (item) => item !== value
        );
        break;
      default:
        break;
    }
    setAppliedFilter(appliedFilterCopy);
    setFilterPayload(appliedFilterCopy);
  };

  const filterHandler = (fieldName, value) => {
    const filterPayloadCopy = { ...filterPayload };

    switch (fieldName) {
      case 'amountPerUnit':
      case 'billingCycle':
        filterPayloadCopy[fieldName] = value;
        break;
      case 'status':
      case 'paymentMethod':
      case 'paymentGateway':
        if (filterPayloadCopy[fieldName].includes(value)) {
          const newData = filterPayloadCopy[fieldName].filter(
            (item) => item !== value
          );
          filterPayloadCopy[fieldName] = newData;
        } else {
          const newData = [...filterPayloadCopy[fieldName]];
          newData.push(value);
          filterPayloadCopy[fieldName] = newData;
        }
        break;
      default:
        break;
    }
    setFilterPayload(filterPayloadCopy);
  };

  const handleSubmitFilter = () => {
    const filterPayloadCopy = { ...filterPayload };
    setAppliedFilter(filterPayloadCopy);
    setIsFilter(false);
    /**
     * Todo: API Call
     * Set Page to - 1
     */
  };

  const handleShowConfirmationModal = (config: {
    message: string;
    title: string;
    handleConfirm: CallableFunction;
    confirmLabel: string;
    cancelLabel: string;
  }) => {
    setConfirmationModalPayload({
      message: config.message,
      title: config.title,
      show: true,
      handleConfirm: config.handleConfirm,
      confirmLabel: config.confirmLabel,
      cancelLabel: config.cancelLabel,
    });
  };

  // TODO: To be removed #temporary
  const handleConfirm = (config: { message: string; description: string }) => {
    notify({
      message: config.message,
      description: config.description,
      type: 'success',
    });
    setConfirmationModalPayload({
      ...confirmationModalPayload,
      show: false,
    });
  };

  return (
    <>
      <div className="subscriptions">
        <AboutHeader
          title="Subscriptions"
          content="Manage all individual subscriptions based on your customized recurring payment plans."
        />
        <div className="screen-heading">
          <div className="heading-detail">
            <h2>Subscriptions</h2>
            <p>Create subscriptions and track subscription payments</p>
          </div>
          <Button
            btnStyleClass="secondry-button"
            label="Create New Subscription"
            onClick={() => {
              setIsCreateSubscriptionModal(true);
            }}
            enable={true}
          />
        </div>
        <div className="filter-box">
          {cardsData.map((card, i) => (
            <React.Fragment key={i}>
              <Card
                icon={card.icon}
                title={card.title}
                content={card.content}
                className={card.className}
              />
            </React.Fragment>
          ))}
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
        {appliedFiltersList.length > 0 && (
          <AppliedFiltersComponent
            appliedFiltersList={appliedFiltersList}
            removeFilterHandler={removeFilterHandler}
            clearAllHandler={() => {
              /**
               * @ Filters Clear Handler
               */
              setAppliedFilter(initFilterPayload);
              setFilterPayload(initFilterPayload);
            }}
          />
        )}
        <CustomTable
          columns={SUBSCRIPTION_TABLE_CONSTANTS({
            clickedActionBtnId,
            setClickedActionBtnId,
            handleShowConfirmationModal,
            handleConfirm,
            setViewDetailPayload,
          })}
          dataSource={dummyData}
        />
      </div>
      {confirmationModalPayload.show && (
        <ConfirmationModal
          title={confirmationModalPayload.title}
          content={confirmationModalPayload.message}
          handleSave={confirmationModalPayload.handleConfirm}
          handleCancel={() => {
            setConfirmationModalPayload({
              ...confirmationModalPayload,
              show: false,
            });
          }}
          confirmText={confirmationModalPayload.confirmLabel}
          cancelText={confirmationModalPayload.cancelLabel}
          iconType={'warning'}
        />
      )}
      {isFilter && (
        <Filter
          closeFilter={() => {
            setIsFilter(false);
            setFilterPayload(appliedFilter);
          }}
          applyFilter={handleSubmitFilter}
          resetFilter={() => {
            setFilterPayload({ ...initFilterPayload });
          }}
          columns={filterFields(filterPayload, filterHandler)}
        />
      )}
      {isCreateSubscriptionModal && (
        <SideModal
          closeModal={() => setIsCreateSubscriptionModal(false)}
          title={'Create Subscription'}
          ModalBody={CreateSubscriptionBody}
          modalBodyProps={{
            rowData: {},
          }}
        />
      )}
      {viewDetailPayload.show && (
        <SideModal
          closeModal={() => setViewDetailPayload({ data: {}, show: false })}
          title="View Subscription"
          ModalBody={ViewSubscriptionDetailsModalBody}
          modalBodyProps={{ data: viewDetailPayload.data }}
        />
      )}
    </>
  );
};

export default Subscriptions;
