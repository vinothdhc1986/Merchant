import React, { FC } from 'react';
import Collapse from 'antd/lib/collapse';
import {
  paymentTransactionsSummaryList,
  paymentTransactionDetailsList,
  paymentPgResponseList,
} from '../../payment.constants';
import CustomRow from '../../../../components/CustomRow';
import './style.scss';
import Props from './typing';

const { Panel } = Collapse;

const RefundSideModalBody: FC<Props> = (props): JSX.Element => {
  const { orderTransactionDetails } = props;
  return (
    <React.Fragment>
      <table>
        {paymentTransactionsSummaryList.map((item, i) => (
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
            header="TRANSACTION DETAILS"
            key="TRANSACTION DETAILS"
            className="ant-collapse"
          >
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
