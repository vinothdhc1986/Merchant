import React, { FC } from 'react';
import { refundSummaryList } from '../../refund.constants';
import CustomRow from '../../../../components/CustomRow';
import Props from './typing';

const RefundSideModalBody: FC<Props> = (props): JSX.Element => {
  const { orderTransactionDetails } = props;
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default RefundSideModalBody;
