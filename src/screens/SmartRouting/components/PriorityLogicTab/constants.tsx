/* eslint-disable react/display-name */
import React from 'react';
import { format } from 'date-fns';
import Popper from 'components/Popper';
import imgURL from 'lib/imgURL';
import { checkPermissions, toPascal } from 'lib/helper';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PRIORITY_LOGICS_TABLE_CONSTANTS = (handlers: {
  clickedActionBtnId: string | null;
  setClickedActionBtnId: CallableFunction;
  setStatusChangePriorityLogicID: CallableFunction;
  setPriorityLogicCurrentStatus: CallableFunction;
  handleDeletePriorityLogic: CallableFunction;
  handleViewCustomLogicClick: CallableFunction;
}) => {
  return [
    {
      key: 'CREATED_ON',
      dataIndex: 'CREATED_ON',
      sorter: true,
      title: 'Created On',
      isColumnVisible: true,
      align: 'left',
      render: (text, rowData) => {
        return (
          <span>
            {rowData.DateCreated
              ? format(new Date(rowData.DateCreated), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'LAST_UPDATED',
      dataIndex: 'LAST_UPDATED',
      sorter: true,
      title: 'Last Updated',
      isColumnVisible: true,
      align: 'left',
      render: (text, rowData) => {
        return (
          <span>
            {rowData.LastUpdated
              ? format(new Date(rowData.LastUpdated), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'STATUS',
      dataIndex: 'STATUS',
      sorter: true,
      title: 'Status',
      isColumnVisible: true,
      align: 'left',
      render: (text, rowData) => {
        return (
          <span
            className={`status ${
              rowData?.IsApprovedMessage.toLowerCase() ?? ''
            }`}
          >
            {toPascal(rowData.IsApprovedMessage) || 'NA'}
          </span>
        );
      },
    },
    {
      title: 'Action',
      isColumnVisible: true,
      align: 'left',
      render: (text, rowData) => {
        return (
          <div className='action-bt align-center'>
            <div className='dropdown'>
              <Popper
                visible={handlers.clickedActionBtnId === rowData.ConfigID}
                onVisibleChange={(visible: boolean) => {
                  handlers.setClickedActionBtnId(
                    visible ? rowData.ConfigID : null
                  );
                }}
                placement='bottomRight'
                content={
                  <>
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleViewCustomLogicClick(rowData);
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      View
                    </a>
                    {checkPermissions('UPDATE_DELETE_CUSTOM_ROUTING_LOGIC') && (
                      <>
                        {!rowData.IsActive && (
                          <a
                            className='dropdown-item'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              handlers.handleDeletePriorityLogic(rowData);
                              handlers.setClickedActionBtnId('');
                            }}
                          >
                            Activate
                          </a>
                        )}
                        <a
                          className='dropdown-item'
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            handlers.handleDeletePriorityLogic(rowData);
                            handlers.setClickedActionBtnId('');
                          }}
                        >
                          Delete
                        </a>
                      </>
                    )}
                  </>
                }
              >
                <button className='dropdown-toggle'>
                  <img
                    src={
                      handlers.clickedActionBtnId === rowData.ConfigID
                        ? imgURL['active-dotted-menu']
                        : imgURL['dotted-menu']
                    }
                    alt='menu'
                  />
                </button>
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};

export const ENUM_DATA = {
  gateways: [
    "NONE",
    "AMEX",
    "AMEX_ENHANCED",
    "AXIS",
    "AXISB24",
    "BANKTEK",
    "BFL",
    "BHARATQR_HDFC",
    "BILLDESK",
    "BOB",
    "CCAVENUE",
    "CITI",
    "CITRUS_NET_BANKING",
    "CORP",
    "DEBIT_PIN_FSS",
    "EBS_NETBANKING",
    "EDGE",
    "FEDERAL",
    "FSS_NETBANKING",
    "HDFC",
    "HDFC_DEBIT_EMI",
    "HDFC_PRIZM",
    "HSBC",
    "ICICI",
    "ICICI_SHAKTI",
    "IDBI",
    "LVB",
    "MASHREQ",
    "OPUS",
    "PayU",
    "RAZOR_PAY",
    "SBI",
    "SBI87",
    "SI_HDFC",
    "SI_PAYNIMO",
    "UBI",
    "UPI_AXIS",
    "UPI_HDFC",
    "UPI_ICICI",
    "WALLET_PAYZAPP",
    "WALLET_PHONEPE",
    "YES",
    "ZEST_MONEY",
  ],

  issuers: [
    "NONE",
    "ICICI",
    "AXIS",
    "HDFC",
    "AMEX",
    "ICICI_SHAKTI",
    "OPUS",
    "HSBC",
    "SBI",
    "CITI",
    "CORP",
    "HDFC_PRIZM",
    "BANKTEK",
    "AXISB24",
    "IDBI",
    "LVB",
    "MASHREQ",
    "YES",
    "FEDERAL",
    "SBI87",
    "BOB",
    "UBI",
    "AXIS_DEBIT",
    "HDFC_DEBIT",
    "ICICI_Debit",
    "BFL",
  ],

  paymentModes: [
    "NONE",
    "CREDIT_DEBIT",
    "NETBANKING",
    "REWARDS",
    "EZECLICK",
    "THIRD_PARTY_EMI",
    "SI",
    "E_MANDATE",
    "UPI",
    "WALLET",
    "BHARAT_QR_CODE",
    "DEBIT_PLUS_PIN",
    "DEBIT_EMI",
  ],

  currency: ["NONE", "INR"],

  cardBrands: [
    "NONE",
    "VISA",
    "MASTERCARD",
    "AMEX",
    "MAESTRO",
    "RUPAY",
    "RPD",
    "DCI",
    "RPS",
    "MDS",
    "CIRRUS",
  ],

  cardTypes: ["NONE", "DEBIT", "CREDIT", "PREPAID", "CIRRUS"],
};

export const PRIORITY_LOGIC_EXAMPLE = `// you can use these data in your logic
  const timestamp=1424144;
  const order = {
     order_id: 123,
     amount_in_paise: 550000,
     currency: "INR",
     preferred_gateway: "HDFC",
     udf1: "",
     udf2: "",
     udf3: "",
     udf4: "",
     udf5: "",
     udf6: "",
     udf7: "",
     udf8: "",
     udf9: "",
     udf10: ""
  };
  const txn = {
     txn_id: "123456",
     payment_mode: "CREDIT_DEBIT"
  };
  const payment = {
     card_issuer: "HDFC",
     card_bin: "401200",
     card_type: "CREDIT",
     card_brand: "VISA",
     payment_method: "VISA",
     payment_method_type: "VISA"
  };
  
  //logics
  
  //1
  var priorties = ["HDFC","ICICI"];
  if (order.preferred_gateway === "HDFC") 
  {
     priorties = ["HDFC"]
  }
  else if (payment.card_bin === "401200") 
  {
     priorties=["PayU"]
  }
  else 
  {
     if (timestamp%10 < 5) 
     {
    priorties=["AXIS","AMEX"]
     }
     else 
     {
    priorties=["RAZOR_PAY","BILLDESK"];
     }
  }
  
  //2
  var priorties=["HDFC","ICICI"];
  if(order.preferred_gateway === "YES")
  {
     priorties=["YES"]
  }
  else
  {
     if(timestamp%10<5)
     {
    priorties=["AXIS","AMEX"]
     }
     else
     {
    priorties=["RAZOR_PAY"]
     }
  }
  
  //3
  var priorties=["HDFC","ICICI"];
  if(txn.payment_mode === "CREDIT_DEBIT")
  {
     priorties=["YES"]
  }
  else
  {
     if(timestamp%10<5)
     {
    priorties=["AXIS","AMEX"]
     }
     else
     {
    priorties=["RAZOR_PAY"]
     }
  }`;
