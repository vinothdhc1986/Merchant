import React, { FC } from "react";
import Props from "./typing";
import "./styles.scss";

const ViewSubscriptionDetailsModalBody: FC<Props> = (props): JSX.Element => {
  return (
    <div className="view-subscription-detail-modal">
      <h3>PLAN DETAILS</h3>
      <table>
        <tbody>
          <tr>
            <td>Plan ID</td>
            <td>{props.data.subscriptionId}</td>
          </tr>
          <tr>
            <td>Charges</td>
            <td>₹123.00 x 1</td>
          </tr>
          <tr>
            <td>Total Counts</td>
            <td>12</td>
          </tr>
          <tr>
            <td>Start Date</td>
            <td>{props.data.createdOn}</td>
          </tr>
          <tr>
            <td>Link Expiry</td>
            <td>{props.data.nextDue}</td>
          </tr>
          <tr>
            <td>Subscription Link</td>
            <td className="subscription-link">
              {props.data.link}
              <button className="copy-button">Copy</button>
            </td>
          </tr>
          <tr>
            <td>Created On</td>
            <td>{props.data.createdOn}</td>
          </tr>
          <tr>
            <td>Next Due on</td>
            <td>{props.data.nextDue}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewSubscriptionDetailsModalBody;
