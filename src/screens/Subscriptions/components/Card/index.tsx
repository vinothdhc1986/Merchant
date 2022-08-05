import React, { FC } from 'react';
import Props from './typing';
import './style.scss';

const Index: FC<Props> = (props): JSX.Element => {
  const { icon, title, content, className } = props;
  return (
    <React.Fragment>
      <div className={`filter-block ${className}`}>
        <div className="icon">
          <img src={icon} alt="" />
        </div>
        <div className="sub-detail">
          <h5>{title}</h5>
          {content}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Index;
