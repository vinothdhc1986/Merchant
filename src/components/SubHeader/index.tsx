import React, { FC } from 'react';
import imgURL from 'lib/imgURL';
import Props from './typing';
import './style.scss';

const SubHeader: FC<Props> = (props): JSX.Element => {
  const { title, description, showIcon, svgIcon, svgDetail, extraButtons } =
    props;
  return (
    <React.Fragment>
      <div className='sub-header'>
        <div className='subHeader-content'>
          {showIcon && (
            <span>
              <img
                src={imgURL[svgIcon || 'payments-icon-white']}
                alt={svgDetail}
              />
            </span>
          )}
          <div className='heading-title'>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
        <div className='subHeader-buttons'>{extraButtons}</div>
      </div>
    </React.Fragment>
  );
};

export default SubHeader;
