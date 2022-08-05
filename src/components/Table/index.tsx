import React, { FC } from 'react';
import NoDataFound from '../NoDataFound';
import Props from './typing';
import './style.scss';

const renderTableBody = ({ cols, records }) =>
  records.map((item, index) => (
    <React.Fragment key={index}>
      <tr>
        {cols.map((column, key) =>
          column.isColumnVisible ? (
            <td key={key}>{column.render(item, index)}</td>
          ) : null
        )}
      </tr>
    </React.Fragment>
  ));

const Table: FC<Props> = (props): JSX.Element => {
  const { cols, records } = props;
  return (
    <React.Fragment>
      {records && records.length > 0 ? (
        <div className="table-section">
          <table>
            <thead>
              <tr>
                {cols.map((headerItem, index) =>
                  headerItem.isColumnVisible ? (
                    <th key={index}>{headerItem.title}</th>
                  ) : null
                )}
              </tr>
            </thead>
            <tbody>
              {renderTableBody({
                cols,
                records,
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <NoDataFound />
      )}
    </React.Fragment>
  );
};

export default Table;
