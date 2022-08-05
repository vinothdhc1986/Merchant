import React, { FC } from 'react';
import imgURL from '../../../../lib/imgURL';
import Props from './typing';

const PlatformDetails: FC<Props> = (props) => {
  const { platformData } = props;
  return (
    <div className="palteformDetails">
      <ul>
        <li>
          <div className="border">&nbsp;</div>
          <h6>
            <img src={imgURL['mobile-icon']} alt="" /> Mobile
          </h6>
          <h3>
            {platformData.transactionPercentMobile ? (
              <>
                {platformData.transactionPercentMobile}
                <span>%</span>
              </>
            ) : (
              '0%'
            )}
          </h3>
          <label>
            {' '}
            {platformData.transactionMobileCount
              ? platformData.transactionMobileCount
              : '0'}
          </label>
        </li>
        <li>
          <div className="border">&nbsp;</div>
          <h6 style={{ whiteSpace: 'nowrap' }}>
            Desktop <img src={imgURL['desktop-icon']} alt="" />
          </h6>
          <h3>
            {platformData.transactionPercentDesktop ? (
              <>
                {platformData.transactionPercentDesktop}
                <span>%</span>
              </>
            ) : (
              '0%'
            )}
          </h3>
          <label>
            {' '}
            {platformData.transactionDesktopCount
              ? platformData.transactionDesktopCount
              : '0'}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PlatformDetails;
