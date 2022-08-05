import React from 'react';
import imgURL from '../../lib/imgURL';
import { TABLE_CONSTANT_RETURN_TYPE } from '../../lib/typing';
import Popper from '../../components/Popper';

export const columnsList = [
  {
    id: 'planId',
    isCustomizable: false,
    label: 'Plan ID',
  },
  {
    id: 'planName',
    isCustomizable: true,
    label: 'Plan Name',
  },
  {
    id: 'amount',
    isCustomizable: true,
    label: 'Amount/Unit',
  },
  {
    id: 'billingCycle',
    isCustomizable: true,
    label: 'Billing Cycle',
  },
  {
    id: 'createdOn',
    isCustomizable: true,
    label: 'Created On',
  },
  {
    id: 'activeSubscriptions',
    isCustomizable: true,
    label: 'Active Subscriptions',
  },
];

const columnNames = {
  planId: 'Plan ID',
  planName: 'Plan Name',
  amount: 'Amount/Unit',
  billingCycle: 'Billing Cycle',
  createdOn: 'Created On',
  activeSubscriptions: 'Active Subscriptions',
  action: 'Action',
};

export const INIT_VISIBLE_COLUMNS_IDS = Object.keys(columnNames);

export const plansRecords = [
  {
    id: 1,
    planId: 1234567890,
    planName: 'Some Plan Name',
    amount: '12345.00',
    billingCycle: 'Every 2 Weeks',
    createdOn: '21 Feb 2021, 5:34 AM',
    activeSubscriptions: '10',
  },
  {
    id: 2,
    planId: 1234567890,
    planName: 'Some Plan Name',
    amount: '12345.00',
    billingCycle: 'Every 2 Weeks',
    createdOn: '21 Feb 2021, 5:34 AM',
    activeSubscriptions: '10',
  },
  {
    id: 3,
    planId: 1234567890,
    planName: 'Some Plan Name',
    amount: '12345.00',
    billingCycle: 'Every 2 Weeks',
    createdOn: '21 Feb 2021, 5:34 AM',
    activeSubscriptions: '10',
  },
  {
    id: 4,
    planId: 1234567890,
    planName: 'Some Plan Name',
    amount: '12345.00',
    billingCycle: 'Every 2 Weeks',
    createdOn: '21 Feb 2021, 5:34 AM',
    activeSubscriptions: '10',
  },
  {
    id: 5,
    planId: 1234567890,
    planName: 'Some Plan Name',
    amount: '12345.00',
    billingCycle: 'Every 2 Weeks',
    createdOn: '21 Feb 2021, 5:34 AM',
    activeSubscriptions: '10',
  },
];

export const tableConstants = (
  visibleColumns: Array<string>,
  planIdHandler: CallableFunction,
  clickedActionBtnId: string | null,
  setClickedActionBtnId: CallableFunction,
  updatePlanClickHandler: CallableFunction,
  deletePlanClickHandler: CallableFunction
): Array<TABLE_CONSTANT_RETURN_TYPE> => {
  return [
    {
      id: 'planId',
      isColumnVisible: visibleColumns && visibleColumns.includes('planId'),
      title: columnNames.planId,
      render: function render(rowData) {
        return (
          <label
            onClick={() => {
              planIdHandler(rowData);
            }}
          >
            {rowData.planId}
          </label>
        );
      },
    },
    {
      id: 'planName',
      isColumnVisible: visibleColumns && visibleColumns.includes('planName'),
      title: columnNames.planName,
      render: function render(rowData) {
        return <span>{rowData.planName}</span>;
      },
    },
    {
      id: 'amount',
      isColumnVisible: visibleColumns && visibleColumns.includes('amount'),
      title: columnNames.amount,
      render: function render(rowData) {
        return <span>{rowData.amount}</span>;
      },
    },
    {
      id: 'billingCycle',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('billingCycle'),
      title: columnNames.billingCycle,
      render: function render(rowData) {
        return <span>{rowData.billingCycle}</span>;
      },
    },
    {
      id: 'createdOn',
      isColumnVisible: visibleColumns && visibleColumns.includes('createdOn'),
      title: columnNames.createdOn,
      render: function render(rowData) {
        return <span>{rowData.createdOn}</span>;
      },
    },
    {
      id: 'activeSubscriptions',
      isColumnVisible:
        visibleColumns && visibleColumns.includes('activeSubscriptions'),
      title: columnNames.activeSubscriptions,
      render: function render(rowData) {
        return <div>{rowData.activeSubscriptions}</div>;
      },
    },
    {
      title: columnNames.action,
      isColumnVisible: true,
      render: function render(rowData) {
        return (
          <div className="action-bt">
            <div className="dropdown">
              <Popper
                visible={clickedActionBtnId === rowData.id}
                placement="bottomRight"
                onVisibleChange={() => {
                  if (clickedActionBtnId && clickedActionBtnId === rowData.id) {
                    setClickedActionBtnId(null);
                  } else {
                    setClickedActionBtnId(rowData.id);
                  }
                }}
                content={
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a
                      className="dropdown-item"
                      onClick={() => updatePlanClickHandler(rowData)}
                    >
                      Update
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => deletePlanClickHandler(rowData)}
                    >
                      Delete
                    </a>
                  </div>
                }
              >
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img src={clickedActionBtnId === rowData.id ? imgURL['active-dotted-menu'] : imgURL['dotted-menu']} alt="menu" />
                </button>
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};
