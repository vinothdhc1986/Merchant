import React, { FC } from 'react';
import Table from 'antd/lib/table';
import Pagination from '../Pagination';
import Props from './typing';
import './style.scss';
import { useMemo } from 'react';

const sortMapping = {
  ascend: 'ASC',
  descend: 'DESC',
};

const reverseSortMapping = {
  ASC: 'ascend',
  DESC: 'descend',
};

const CustomTable: FC<Props> = (props): JSX.Element => {
  const {
    dataSource,
    handleSorting,
    totalRecords,
    showPagination,
    currentPage,
    onPageChangeHandler,
  } = props;

  const columns = useMemo(() => {
    if (props.isSortingTwoWayBinded) {
      return props.columns
      .filter((item) => item.isColumnVisible)
      .map((item) => {
        if (props.sortBy === item.key && props.orderBy) {
          return { ...item, sortOrder: reverseSortMapping[props.orderBy] };
        }
        return { ...item, sortOrder: false };
      });
    }
    return props.columns.filter((item) => item.isColumnVisible);
  }, [props.columns, props.sortBy, props.orderBy]);

  return (
    <React.Fragment>
      <Table
        tableLayout={'auto'}
        dataSource={dataSource}
        columns={columns}
        onChange={(pagination, filters, sorter) => {
          if (handleSorting) {
            handleSorting({
              columnName: sorter['columnKey'],
              order: sorter['order'] ? sortMapping[sorter['order']] : null,
            });
          }
        }}
        pagination={false}
        scroll={{ x: true }}
      />
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChangeHandler}
          total={totalRecords}
          pageSize={10}
        />
      )}
    </React.Fragment>
  );
};

export default CustomTable;
