import React, { FC } from "react";
import SideModal from "../../../../components/SideModal";
import Props from "./typing";
import "./styles.scss";
const ViewSettlementDetailsModal: FC<Props> = (props): JSX.Element => {
  const renderModalBody = (): JSX.Element => {
    return (
      <div className="view-settlement-detail-modal">
        <table>
          <tr>
            <td>Settlement ID</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Created On</td>
            <td>21 Feb 2021, 5:34 AM</td>
          </tr>
          <tr>
            <td>Payment Gateway</td>
            <td>Edge</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>
              <div className="staus refunded">Refunded</div>
            </td>
          </tr>
          <tr>
            <td>Brand Name</td>
            <td>Name</td>
          </tr>
          <tr>
            <td>Merchant Name</td>
            <td>Firstname Lastname</td>
          </tr>
          <tr>
            <td>MID</td>
            <td>Name</td>
          </tr>
          <tr>
            <td>Merchant Txn ID</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Sub-Merchant A/C No.</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Nodal A/C No.</td>
            <td>1234567890</td>
          </tr>
          <tr>
            <td>Aggregator Name</td>
            <td>Name</td>
          </tr>
          <tr>
            <td>Transaction Type</td>
            <td>Sale</td>
          </tr>
          <tr>
            <td>Transaction Date</td>
            <td>21 Feb 2021, 5:34 AM</td>
          </tr>
          <tr>
            <td>Beneficiary Bank Name</td>
            <td>HDFC</td>
          </tr>
          <tr>
            <td>Beneficiary Ifsc Code</td>
            <td>IFSC0000001</td>
          </tr>
          <tr>
            <td>Bank for Receiving Fund</td>
            <td>HDFC</td>
          </tr>
          <tr>
            <td>Gross Transaction Amount</td>
            <td>₹123.00</td>
          </tr>
          <tr>
            <td>Total Charges</td>
            <td>₹123.00</td>
          </tr>
          <tr>
            <td>Net Amount Payable</td>
            <td>₹12345.00</td>
          </tr>
          <tr>
            <td>Settlement Date</td>
            <td>21 Feb 2021</td>
          </tr>
          <tr>
            <td>TID</td>
            <td>1110001</td>
          </tr>
          <tr>
            <td>Customer ID</td>
            <td>00000001</td>
          </tr>
          <tr>
            <td>Card Type</td>
            <td>Visa</td>
          </tr>
        </table>
      </div>
    );
  };
  return (
    <SideModal
      title="Settlement Details"
      ModalBody={renderModalBody}
      closeModal={() => props.handleClose()}
    />
  );
};

export default ViewSettlementDetailsModal;
