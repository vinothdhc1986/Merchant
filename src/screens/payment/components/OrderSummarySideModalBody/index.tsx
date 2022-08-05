import React, { FC } from 'react';
import Collapse from 'antd/lib/collapse';
import {
  paymentOrderSummaryList,
  paymentCustomerDetailsList,
  paymentAdditionalFieldsList,
  paymentTransactionDetailsList,
  paymentPgResponseList,
} from '../../payment.constants';
import CustomRow from '../../../../components/CustomRow';
import Props from './typing';
import './style.scss';

const { Panel } = Collapse;

const RefundSideModalBody: FC<Props> = (props): JSX.Element => {
  const { orderTransactionDetails } = props;

  return (
    <React.Fragment>
      <table>
        {paymentOrderSummaryList.map((item, i) => (
          <React.Fragment key={`${item.label}-${i}`}>
            <CustomRow
              label={item.label}
              value={item.render(orderTransactionDetails)}
            />
          </React.Fragment>
        ))}
      </table>
      <div className="accordian-container">
        <Collapse accordion expandIconPosition="right" className="ant-collapse">
          <Panel
            header="Customer Details"
            key="Customer Details"
            className="ant-collapse"
          >
            <table>
              {paymentCustomerDetailsList.map((item, i) => (
                <React.Fragment key={`${item.label}-${i}`}>
                  <CustomRow
                    label={item.label}
                    value={item.render(orderTransactionDetails)}
                  />
                </React.Fragment>
              ))}
            </table>
          </Panel>
        </Collapse>
      </div>
      <div className="accordian-container">
        <Collapse accordion expandIconPosition="right">
          <Panel header="Additional Fields" key="Additional Fields">
            <table>
              {paymentAdditionalFieldsList.map((item, i) => (
                <React.Fragment key={`${item.label}-${i}`}>
                  <CustomRow
                    label={item.label}
                    value={item.render(orderTransactionDetails)}
                  />
                </React.Fragment>
              ))}
            </table>
          </Panel>
        </Collapse>
      </div>

      <div className="accordian-container">
        <Collapse accordion expandIconPosition="right">
          <Panel header="TRANSACTION DETAILS" key="TRANSACTION DETAILS">
            <table>
              {paymentTransactionDetailsList.map((item, i) => (
                <React.Fragment key={`${item.label}-${i}`}>
                  <CustomRow
                    label={item.label}
                    value={item.render(orderTransactionDetails)}
                  />
                </React.Fragment>
              ))}
            </table>
          </Panel>
        </Collapse>
      </div>

      <div className="accordian-container">
        <Collapse accordion expandIconPosition="right">
          <Panel header="PG RESPONSE" key="PG RESPONSE">
            <table>
              {paymentPgResponseList.map((item, i) => (
                <React.Fragment key={`${item.label}-${i}`}>
                  <CustomRow
                    label={item.label}
                    value={item.render(orderTransactionDetails)}
                  />
                </React.Fragment>
              ))}
            </table>
          </Panel>
        </Collapse>
      </div>
    </React.Fragment>
  );
};

export default RefundSideModalBody;
