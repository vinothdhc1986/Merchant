import React, { FC, useState } from 'react';
import Button from '../../../../components/Button';
import imgURL from '../../../../lib/imgURL';
import InputField from '../../../../components/TextInput';
import { getMerchantIdFromStore } from '../../../../lib/helper';
import { twoDigitAfterDecimalValidationRegex } from "lib/constants";
import Props from './typing';
import './style.scss';

const CreateRefundPopup: FC<Props> = (props) => {
  const { cancelHandler, selectedRowForRefund, refundModalSaveHandler } = props;
  const [refundAmount, setRefundAmount] = useState('');
  const [isRefundError, setIsRefundError] = useState(false);

  const merchantId = getMerchantIdFromStore();

  const handleChange = (e) => {
    if (twoDigitAfterDecimalValidationRegex.test(e.target.value)) {
      setRefundAmount(e.target.value);
      if (
        (Number(selectedRowForRefund.Amount) -
          (Number(selectedRowForRefund.RefundAmount) || 0) || 0) <
        Number(e.target.value)
      ) {
        setIsRefundError(true);
      } else {
        setIsRefundError(false);
      }
    }
  };

  return (
    <React.Fragment>
      <h3>Create a Refund</h3>
      <p>
        Please enter refund amount to initiate a refund. You may initiate a full
        or partial refund.
      </p>
      <div className="refund-warning">
        <img src={imgURL['warning-icon']} alt="warning" /> Be careful before
        initiating the refund. It cannot be undone once initiated.
      </div>
      <div className="modal-body">
        <table className="refund-table">
          <tr>
            <td>Order ID</td>
            <td>{selectedRowForRefund.OrderId}</td>
          </tr>
          <tr>
            <td>Customer ID</td>
            <td>{selectedRowForRefund.CustomerId || 'NA'}</td>
          </tr>
          <tr>
            <td>Customer Email</td>
            <td>{selectedRowForRefund.CustomerEmail}</td>
          </tr>
          <tr>
            <td>Order Amount</td>
            <td>{`₹${selectedRowForRefund.Amount}`}</td>
          </tr>
          <tr>
            <td>Refund Amount (INR)</td>
            <td className={`${isRefundError ? 'error-field' : ''}`}>
              <InputField
                type="number"
                value={refundAmount}
                placeholder="Enter Value"
                className={'refund-amount'}
                handleChange={handleChange}
                error={isRefundError}
                errorMessage={`You can only input amount equal to or less than ${
                  Number(selectedRowForRefund.Amount) -
                    (Number(selectedRowForRefund.RefundAmount) || 0) || 0
                }`}
              />
            </td>
          </tr>
        </table>
        <div className="action-button text-right">
          <Button
            btnStyleClass="secondry-button"
            label="Cancel"
            onClick={cancelHandler}
            enable={true}
          />
          <Button
            btnStyleClass="primary-button"
            label="Create Refund"
            onClick={() => {
              refundModalSaveHandler({
                merchant_id: merchantId,
                transaction_id: parseInt(selectedRowForRefund.TransactionId),
                amount: Number(refundAmount),
              });
            }}
            enable={Number(refundAmount) > 0 && Boolean(refundAmount && !isRefundError) || undefined}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateRefundPopup;
