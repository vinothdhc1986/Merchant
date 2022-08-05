import React, { FC } from 'react';
import { format } from 'date-fns';
import CustomRow from '../../../../components/CustomRow';
import './style.scss';
import Props from './typing';
import { toCapitalize } from 'lib/helper';

const BeneficiariesSideModalBody: FC<Props> = (props): JSX.Element => {
  const { rowData } = props;

  return (
    <React.Fragment>
      <div className='sidemodal-container'>
        <table>
          <tbody>
            <CustomRow
              label={'Beneficiary ID'}
              value={
                <span className='beneCode'>{rowData.beneficiaryCode}</span>
              }
            />
            <CustomRow label={'Beneficiary Name'} value={rowData.name} />
            <CustomRow label={'Email ID'} value={rowData.emailId} />
            <CustomRow label={'Mobile No'} value={rowData.mobileNo} />
            <CustomRow label={'Bank Name'} value={rowData.bankName ?? '-'} />
            <CustomRow label={'Account No'} value={rowData.accountNo ?? '-'} />
            <CustomRow label={'IFSC Code'} value={rowData.ifscCode ?? '-'} />
            <CustomRow label={'VPA'} value={rowData.upiHandle ?? '-'} />
            <CustomRow
              label={'Created On'}
              value={
                rowData.createdDateTime
                  ? format(
                      new Date(rowData.createdDateTime),
                      'd MMM yyyy, hh:mm aa'
                    )
                  : 'NA'
              }
            />

            <CustomRow
              label={'Status'}
              value={
                <div
                  className={`status ${
                    rowData.status ? rowData.status.toLowerCase() : ''
                  }`}
                >
                  {rowData.status ? toCapitalize(rowData.status) : 'NA'}
                </div>
              }
            />
            {rowData.rejectionReason && (
              <CustomRow
                label={'Rejection Reason'}
                value={rowData.rejectionReason}
              />
            )}

            {rowData.bankErrorMsg && (
              <CustomRow
                label={'Failed Reason'}
                value={rowData?.bankErrorMsg}
                valueStyleClass={'bankErrorMessage'}
              />
            )}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default BeneficiariesSideModalBody;
