import React from 'react';
import Popper from '../../components/Popper';
import imgURL from '../../lib/imgURL';

/* eslint-disable react/display-name */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SUBSCRIPTION_TABLE_CONSTANTS = (handlers: {
  clickedActionBtnId: string | null;
  setClickedActionBtnId: CallableFunction;
  handleShowConfirmationModal: (config: {
    message: string;
    title: string;
    handleConfirm: CallableFunction;
    confirmLabel: string;
    cancelLabel: string;
  }) => void;
  handleConfirm: (config: { message: string; description: string }) => void;
  setViewDetailPayload: CallableFunction;
}) => {
  return [
    {
      title: 'Subscription ID',
      id: 'full-name',
      isColumnVisible: true,
      render: (rowData) => {
        return <label onClick={() => handlers.setViewDetailPayload({
          show: true,
          data: rowData,
        })}>{rowData.subscriptionId}</label>;
      },
    },
    {
      title: 'Email',
      id: 'email',
      isColumnVisible: true,
      render: (rowData) => {
        return <label>{rowData.planId}</label>;
      },
    },
    {
      title: 'Subscription Link',
      id: 'role',
      isColumnVisible: true,
      render: (rowData) => {
        return <span>{rowData.link}</span>;
      },
    },
    {
      title: 'Payment Gateway',
      id: 'role',
      isColumnVisible: true,
      render: (rowData) => {
        return <span>{rowData.gateway}</span>;
      },
    },
    {
      title: 'Payment Mode',
      id: 'role',
      isColumnVisible: true,
      render: (rowData) => {
        return <span>{rowData.mode}</span>;
      },
    },
    {
      title: 'Created On',
      isColumnVisible: true,
      render: (rowData) => {
        return <span>{rowData.createdOn}</span>;
      },
    },
    {
      title: 'Next Due On',
      isColumnVisible: true,
      render: (rowData) => {
        return <span>{rowData.nextDue}</span>;
      },
    },
    {
      title: 'Status',
      isColumnVisible: true,
      render: (rowData) => {
        return (
          <div className={`status ${rowData.status.toLowerCase()}`}>
            {rowData.status}
          </div>
        );
      },
    },
    {
      title: 'Action',
      isColumnVisible: true,
      render: (rowData) => {
        return (
          <div className="action-bt">
            <div className="dropdown">
              <Popper
                visible={handlers.clickedActionBtnId === rowData.subscriptionId}
                placement="bottomRight"
                onVisibleChange={(visible: boolean) => {
                  handlers.setClickedActionBtnId(
                    visible ? rowData.subscriptionId : null
                  );
                }}
                content={
                  <>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleShowConfirmationModal({
                          title: 'Activate Subscription',
                          message: `Are you sure you want to activate Subscription ID ${rowData.subscriptionId}?`,
                          handleConfirm: () =>
                            handlers.handleConfirm({
                              message: 'Subscription Activated Sucessfully',
                              description: `Subscription ID ${rowData.subscriptionId} has been activated successfully`,
                            }),
                          cancelLabel: 'Cancel',
                          confirmLabel: 'Confirm',
                        });
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Activate
                    </a>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleShowConfirmationModal({
                          title: 'Pause Subscription',
                          message: `Are you sure you want to pause Subscription ID ${rowData.subscriptionId}?`,
                          handleConfirm: () =>
                            handlers.handleConfirm({
                              message: 'Subscription Paused Sucessfully',
                              description: `Subscription ID ${rowData.subscriptionId} has been paused successfully`,
                            }),
                          cancelLabel: 'Cancel',
                          confirmLabel: 'Confirm',
                        });
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Pause
                    </a>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleShowConfirmationModal({
                          title: 'Revoke Subscription',
                          message: `Are you sure you want to revoke Subscription ID ${rowData.subscriptionId}?`,
                          handleConfirm: () =>
                            handlers.handleConfirm({
                              message: 'Subscription Revoked Sucessfully',
                              description: `Subscription ID ${rowData.subscriptionId} has been revoked successfully`,
                            }),
                          cancelLabel: 'Cancel',
                          confirmLabel: 'Confirm',
                        });
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Revoke
                    </a>
                    <a
                      className="dropdown-item"
                      style={{ cursor: 'pointer' }}
                      // onClick={() => {
                      //   handlers.setDeleteUserId(rowData.id);
                      //   handlers.setClickedActionBtnId('');
                      // }}
                    >
                      Update Plan
                    </a>
                  </>
                }
              >
                <button className="dropdown-toggle">
                  <img src={handlers.clickedActionBtnId === rowData.subscriptionId ? imgURL['active-dotted-menu'] : imgURL['dotted-menu']} alt="menu" />
                </button>
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};

export const dummyData = [
  {
    subscriptionId: '121212122',
    planId: '212121212',
    link: 'domain1.com',
    status: 'Active',
    createdOn: '21 Feb 2021, 5:34 AM',
    nextDue: '21 Feb 2021, 5:34 AM',
    gateway: 'Edge',
    mode: 'Credit Card',
  },
  {
    subscriptionId: '121212121',
    planId: '212121212',
    link: 'domain2.com',
    status: 'Active',
    createdOn: '21 Feb 2021, 5:34 AM',
    nextDue: '21 Feb 2021, 5:34 AM',
    gateway: 'Edge',
    mode: 'Credit Card',
  },
  {
    subscriptionId: '121221212',
    planId: '212121212',
    link: 'domain3.com',
    status: 'Active',
    createdOn: '21 Feb 2021, 5:34 AM',
    nextDue: '21 Feb 2021, 5:34 AM',
    gateway: 'Edge',
    mode: 'Credit Card',
  },
  {
    subscriptionId: '121251212',
    planId: '212121212',
    link: 'domain4.com',
    status: 'Active',
    createdOn: '21 Feb 2021, 5:34 AM',
    nextDue: '21 Feb 2021, 5:34 AM',
    gateway: 'Edge',
    mode: 'Credit Card',
  },
  {
    subscriptionId: '121212612',
    planId: '212121212',
    link: 'domain5.com',
    status: 'Active',
    createdOn: '21 Feb 2021, 5:34 AM',
    nextDue: '21 Feb 2021, 5:34 AM',
    gateway: 'Edge',
    mode: 'Credit Card',
  },
];

export const cardsData: Array<{
  icon: string;
  title: number | string;
  content: string;
  className: string;
}> = [
  {
    icon: imgURL['active-subscription-icon'],
    title: 100,
    content: 'Live Subscriptions',
    className: 'live active',
  },
  {
    icon: imgURL['pause-icon'],
    title: 100,
    content: 'Paused Subscriptionss',
    className: 'paushed',
  },
  {
    icon: imgURL['calendar-icon'],
    title: 100,
    content: 'Subscriptions expiring in next 7 days',
    className: 'expire',
  },
  {
    icon: imgURL['credit-card'],
    title: 100,
    content: 'Cards expiring with active subscriptions in next 7 days',
    className: 'credit',
  },
];

export const statusOptions = [
  {
    id: 'active',
    label: 'Active',
  },
  {
    id: 'inProcess',
    label: 'In Process',
  },
  {
    id: 'inactive',
    label: 'Inactive',
  },
  {
    id: 'paused',
    label: 'Paused',
  },
  {
    id: 'revoked',
    label: 'Revoked',
  },
];

export const paymentGatewayOptions = [
  {
    id: 'edge',
    label: 'Edge',
  },
  {
    id: 'razorpay',
    label: 'Razorpay',
  },
  {
    id: 'billDesk',
    label: 'Bill Desk',
  },
  {
    id: 'ccAvenue',
    label: 'CC Avenue',
  },
  {
    id: 'payU',
    label: 'PayU',
  },
];

export const paymentMethodOptions = [
  {
    id: 'creditCard',
    label: 'Credit Card',
  },
  {
    id: 'debitCard',
    label: 'Debit Card',
  },
  {
    id: 'upi',
    label: 'UPI',
  },
  {
    id: 'netBanking',
    label: 'Net Banking',
  },
];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterFields = (filterPayload, filterHandler) => {
  return [
    {
      type: 'inputField',
      name: 'amountPerUnit',
      label: 'Amount Per Unit',
      onChange: (name: string, value: string) => filterHandler(name, value),
      value: filterPayload.amountPerUnit,
    },
    {
      type: 'billingCycle',
      name: 'billingCycle',
      label: 'Billing Cycle',
      onChange: (name: string, value: string) => {
        const payload = {
          freq: filterPayload.billingCycle.freq,
          tenureType: filterPayload.billingCycle.tenureType,
        };
        payload[name] = value;
        filterHandler('billingCycle', payload);
      },
      value: filterPayload.billingCycle,
    },
    {
      type: 'checkboxGroup',
      name: 'status',
      label: 'Status',
      options: statusOptions,
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.status,
    },
    {
      type: 'checkboxGroup',
      name: 'paymentGateway',
      label: 'Payment Gateway',
      options: paymentGatewayOptions,
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.paymentGateway,
    },
    {
      type: 'checkboxGroup',
      name: 'paymentMethod',
      label: 'Payment Method',
      options: paymentMethodOptions,
      onChange: (name, value) => filterHandler(name, value),
      value: filterPayload.paymentMethod,
    },
  ];
};

export const plansOptions = [
  {
    label: 'Select Plan',
    value: 'Select Plan',
  },
  {
    label: '₹12345.00 per unit Every 2 Weeks',
    value: '₹12345.00 per unit Every 2 Weeks',
  },
  {
    label: '₹12345.00 per unit Every 1 Month',
    value: '₹12345.00 per unit Every 1 Month',
  },
  {
    label: '₹12345.00 per unit Every 3 Weeks',
    value: '₹12345.00 per unit Every 3 Weeks',
  },
  {
    label: '₹12345.00 per unit Every 2 Month',
    value: '₹12345.00 per unit Every 2 Month',
  },
  {
    label: '  ₹12345.00 per unit Every 1 Week',
    value: '  ₹12345.00 per unit Every 1 Week',
  },
];
