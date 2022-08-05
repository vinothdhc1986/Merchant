import React, { FC } from 'react';
import { format } from 'date-fns';
import CustomRow from '../../../../components/CustomRow';
import './style.scss';
import Props from './typing';
import { toCapitalize } from 'lib/helper';

const IndividualPayoutsSideModalBody: FC<Props> = (props): JSX.Element => {
  const { rowData, failedTransactionDtls } = props;

  return (
    <React.Fragment>
      <table>
        <tbody>
          <CustomRow label={'Payout ID'} value={rowData.payoutId} />
          <CustomRow
            label={'Amount'}
            value={`₹${Number(rowData.amount).toFixed(2)}`}
          />
          <CustomRow label={'Transfer Type'} value={rowData.paymentType} />
          <CustomRow
            label={'Beneficiary ID'}
            value={<span className='beneCode'>{rowData.beneficiaryCode}</span>}
          />
          <CustomRow label={'Beneficiary Name'} value={rowData.beneName} />
          <CustomRow
            label={'Beneficiary Account number or VPA'}
            value={rowData.accountOrUpi}
          />
          <CustomRow label={'Remarks'} value={rowData.remarks} />
          <CustomRow
            label={'Scheduled Date'}
            value={rowData.payLaterDateAndTime ?? '-'}
          />
          <CustomRow
            label={'Created On'}
            value={
              rowData.createdDateTime
                ? format(
                    new Date(rowData.createdDateTime),
                    'd MMM yyyy, hh:mm aa'
                  )
                : '-'
            }
          />
          <CustomRow
            label={'Status'}
            value={
              <div
                className={`status ${
                  rowData.status ? rowData.status.toLowerCase() : ''
                }`}
                style={{ margin: 'inherit' }}
              >
                {rowData.status && toCapitalize(rowData.status)}
              </div>
            }
          />
          {rowData.status.toLowerCase() === 'rejected' && (
            <CustomRow
              label={'Rejection Reason'}
              value={rowData.rejectionReason}
            />
          )}
          {failedTransactionDtls.instructionIdentification?.length > 0 && (
            <>
              <CustomRow
                label={'Failed Reason'}
                value={failedTransactionDtls.errorMsg}
              />
              <CustomRow
                label={'Transaction ID'}
                value={failedTransactionDtls.instructionIdentification}
              />
            </>
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default IndividualPayoutsSideModalBody;
