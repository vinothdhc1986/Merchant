import React, { FC, useState } from 'react';
import { paymentLinkDetailConfig } from './constants';
import CustomRow from '../../../../components/CustomRow';
import Props from './typing';
import './style.scss';
import { copyToClipboard } from 'lib/helper';

const RefundSideModalBody: FC<Props> = (props): JSX.Element => {
  const { paymentLinkDetails } = props;
  const [isCopiedToggle, setIsCopiedToggle] = useState(false);
  const handleCopy = (str: string): void => {
    setIsCopiedToggle(true);
    copyToClipboard(str);
    setTimeout(() => {
      setIsCopiedToggle(false);
    }, 2000);
  };
  return (
    <React.Fragment>
      <table className='view-payment-link'>
        <tbody>
          {paymentLinkDetailConfig(handleCopy, isCopiedToggle).map(
            (item, i) => (
              <React.Fragment key={`${item.label}-${i}`}>
                <CustomRow
                  label={item.label}
                  value={item.render(paymentLinkDetails)}
                />
              </React.Fragment>
            )
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default RefundSideModalBody;
