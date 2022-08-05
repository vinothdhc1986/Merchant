import React, { FC } from 'react';
import { format } from 'date-fns';
import imgURL from '../../../../lib/imgURL';
import Props from './typing';
import './style.scss';

const CustomizeTooltip: FC<Props> = (props): JSX.Element => {
  const dataObj = props.dataset
    .filter((item) => item.key === props.label)
    .pop();

  return (
    <div className="hover-box">
      {dataObj && dataObj.dateString && (
        <div className="date-time-row">
          {format(new Date(dataObj.dateString), 'dd MMM yyyy')}{' '}
        </div>
      )}

      <div className="details-section">
        {props.type === 'totalTransactions' ? (
          <ul>
            <li>
              <span>
                <img src={imgURL.bullet1} alt="" /> Transaction Volume
              </span>
              <span>
                {`₹
              ${
                dataObj?.totalTransactionAmount
                  ? Number(dataObj.totalTransactionAmount).toFixed(2)
                  : 0
              }K`}
              </span>
            </li>
            <li>
              <span>
                <img src={imgURL.bullet2} alt="" /> Transaction Count
              </span>
              <span>{dataObj?.totalTransactionCount || 0}</span>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <span>
                <img src={imgURL['success-transactions-bullet']} alt="" />{' '}
                Success Volume
              </span>
              <span>
                {`₹
                ${
                  dataObj?.successAmount
                    ? Number(dataObj.successAmount).toFixed(2)
                    : 0
                }K`}
              </span>
            </li>
            <li>
              <span>
                <img src={imgURL['failed-transactions-bullet']} alt="" />{' '}
                Failure volume
              </span>
              <span>
                {`₹
                ${
                  dataObj?.failureAmount
                    ? Number(dataObj.failureAmount).toFixed(2)
                    : 0
                }K`}
              </span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomizeTooltip;
