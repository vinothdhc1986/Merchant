import React, { FC } from 'react';
import './style.scss';

const NoDataFound: FC = (): JSX.Element => {
  return (
    <div className="empty-error">
      <h4>No Data Found</h4>
    </div>
  );
};

export default NoDataFound;
