import React from "react";
import { toStatusClass } from "../../lib/helper";

/* eslint-disable react/display-name */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const SETTLEMENT_TABLE_CONSTANTS = (handlers: {
  handleViewSettlementDetails: CallableFunction
}) => {
    return [
      {
        title: "Settlement ID",
        id: "settlement-id",
        isColumnVisible: true,
        render: (rowData) => {
          return (
            <label
              onClick={() => handlers.handleViewSettlementDetails(rowData)}
            >
              {rowData.settlementId}
            </label>
          );
        },
      },
      {
        title: "Gross Amount",
        id: "gross-amount",
        isColumnVisible: true,
        render: (rowData) => {
          return <span>{rowData.grossAmount}</span>;
        },
      },
      {
        title: "Charges",
        id: "charges",
        isColumnVisible: true,
        render: (rowData) => {
          return <span>{rowData.charges}</span>;
        },
      },
      {
        title: "Amount Payable",
        id: "amount-payable",
        isColumnVisible: true,
        render: (rowData) => {
          return <span>{rowData.amountPayable}</span>;
        },
      },
      {
        title: "Created On",
        isColumnVisible: true,
        render: (rowData) => {
          return <span>{rowData.createdOn}</span>;
        },
      },
      {
        title: "Payment Gateway",
        isColumnVisible: true,
        render: (rowData) => {
          return <span>{rowData.gateway}</span>;
        },
      },
      {
        title: 'Status',
        isColumnVisible: true,
        render: (rowData) => {
          return (
            <div className={`status ${toStatusClass(rowData.status)}`}>
              {rowData.status}
            </div>
          );
        },
      },
    ];
  };

  export const dummyData = [
    {
      settlementId: "12121221",
      grossAmount: "120.0",
      charges: "12",
      amountPayable: "100",
      createdOn: "21 Feb 2021, 5:34 AM",
      gateway: "Edge",
      status: "Processed",
    },
    {
      settlementId: "121261221",
      grossAmount: "120.0",
      charges: "12",
      amountPayable: "100",
      createdOn: "21 Feb 2021, 5:34 AM",
      gateway: "Edge",
      status: "In Progress",
    },
    {
      settlementId: "121211221",
      grossAmount: "120.0",
      charges: "12",
      amountPayable: "100",
      createdOn: "21 Feb 2021, 5:34 AM",
      gateway: "Edge",
      status: "Processed",
    }
  ];
