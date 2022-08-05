import React, { FC } from 'react';
import Pagination from 'antd/lib/pagination';
import './style.scss';
import Props from './typing';

const Index: FC<Props> = (props): JSX.Element => {
  const { currentPage, onPageChange, total, pageSize } = props;
  return (
    <React.Fragment>
      <div className="pagination-section">
        <Pagination
          defaultCurrent={1}
          pageSize={pageSize || 10}
          size="small"
          current={currentPage}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </React.Fragment>
  );
};

export default Index;
