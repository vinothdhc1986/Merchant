import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import imgURL from '../../lib/imgURL';
import Props from './typing';
import './styles.scss';

const renderBreadcrumbElement = (breadcrumbItem, showArrow) => {
  if (showArrow) {
    return (
      <React.Fragment key={breadcrumbItem.label}>
        <Link to={breadcrumbItem.path} className='link-element'>
          {breadcrumbItem.label}
        </Link>{' '}
        {`> `}
      </React.Fragment>
    );
  }
  return <span key={breadcrumbItem.label}>{breadcrumbItem.label}</span>;
};

const Breadcrumb: FC<Props> = (props): JSX.Element => {
  const { showIcon, svgIcon, svgDetail, description } = props;
  return (
    <div className='screen-heading breadcrumb'>
      <div className='breadcrumb-icon'>
        {showIcon && (
          <span>
            <img
              src={imgURL[svgIcon || 'payments-icon-white']}
              alt={svgDetail}
            />
          </span>
        )}
      </div>
      <div className='breadcrumb-title'>
        <h2>
          {Array.isArray(props.config) &&
            props.config.map((breadcrumbItem, index) =>
              renderBreadcrumbElement(
                breadcrumbItem,
                index !== props.config.length - 1
              )
            )}
        </h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Breadcrumb;
