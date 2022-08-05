import React, { FC } from 'react';
import './style.scss';
import Props from './typing';

const PlanDetailsSideModalBody: FC<Props> = (props): JSX.Element => {
  const { rowData } = props;
  return (
    <React.Fragment>
      <table>
        <tr>
          <td>Plan ID</td>
          <td>{rowData.planId}</td>
        </tr>
        <tr>
          <td>Plan Name</td>
          <td>{rowData.planName}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{rowData.description || 'NA'}</td>
        </tr>
        <tr>
          <td>Amount/Unit</td>
          <td>{rowData.amount}</td>
        </tr>
        <tr>
          <td>Billing Cycle</td>
          <td>{rowData.billingCycle}</td>
        </tr>
        <tr>
          <td>Additional Notes</td>
          <td>{rowData.additionalNotes || 'NA'}</td>
        </tr>
        <tr>
          <td>Created On</td>
          <td>{rowData.createdOn}</td>
        </tr>
      </table>
    </React.Fragment>
  );
};

export default PlanDetailsSideModalBody;
