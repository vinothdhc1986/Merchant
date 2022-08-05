import React, { FC } from 'react';
import imgURL from '../../../../lib/imgURL';
import config from '../../../../config';
import Props from './typing';

const TransactionDetailsChartLegend: FC<Props> = (props) => {
  const { labelList, filtersInBase64 } = props;
  return (
    <div className="transionDetails">
      <ul>
        {labelList.map((item, i) => (
          <li key={`${item.label}-${i}`}>
            <img src={item.imgSrc} alt="" /> {item.label}
          </li>
        ))}
        <li>
          <a
            href={`${config.API.API_BASE_URL}/api/v1/dashboard/transaction/transaction/GetAllTransactionDataForCharting?download=true&token=${filtersInBase64}`}
          >
            Download Report <img src={imgURL['download-icon']} alt="" />{' '}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default TransactionDetailsChartLegend;
