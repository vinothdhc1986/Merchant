import React, { FC } from 'react';
import Collapse from 'antd/lib/collapse';
import {
  // refundSummaryList,
  refundTransactionsSummaryList,
} from '../../refund.constants';
import {
  paymentTransactionDetailsList,
  paymentPgResponseList,
} from '../../../payment/payment.constants';
import CustomRow from '../../../../components/CustomRow';
import Props from './typing';
import './style.scss';

const { Panel } = Collapse;

const TransactionSideModalBody: FC<Props> = (props): JSX.Element => {
  const { orderTransactionDetails } = props;
  return (
    <React.Fragment>
      <table>
        {refundTransactionsSummaryList.map((item, i) => (
          <React.Fragment key={`${item.label}-${i}`}>
            <CustomRow
              label={item.label}
              value={item.render(orderTransactionDetails)}
            />
          </React.Fragment>
        ))}
      </table>
      <div className='accordian-container'>
        <Collapse accordion expandIconPosition='right' className='ant-collapse'>
          <Panel
            header='TRANSACTION DETAILS'
            key='TRANSACTION DETAILS'
            className='ant-collapse'
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

      <div className='accordian-container'>
        <Collapse accordion expandIconPosition='right'>
          <Panel header='PG RESPONSE' key='PG RESPONSE'>
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

      {/* <div className="accordian-container">
        <Collapse accordion expandIconPosition="right">
          <Panel header="REFUND DETAILS" key="REFUND DETAILS">
            <table>
              {refundSummaryList.map((item, i) => (
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
      </div> */}
    </React.Fragment>
  );
};

export default TransactionSideModalBody;
