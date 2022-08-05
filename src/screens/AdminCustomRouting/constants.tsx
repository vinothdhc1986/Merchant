/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */

import { format } from 'date-fns';
import Popper from '../../components/Popper';
import imgURL from '../../lib/imgURL';
import { checkPermissions, toPascal } from '../../lib/helper';

export const STATUS_IDS_MAPPING = {
  pending: 1,
  approved: 2,
  reject: 10,
};

export const tableConstants = ({
  selectedRowId,
  setSelectedRowId,
  reviewClickHandler,
  updateClickHandler,
}) => {
  return [
    {
      key: 'merchantId',
      dataIndex: 'merchantId',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Merchant ID',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.merchantId || 'NA'}</span>;
      },
    },
    {
      key: 'merchantName',
      dataIndex: 'merchantName',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Merchant Name',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.merchantName || 'NA'}</span>;
      },
    },

    {
      key: 'preferenceScore',
      dataIndex: 'preferenceScore',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Preference Score',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.preferenceScore || 'NA'}</span>;
      },
    },

    {
      key: 'createdOn',
      dataIndex: 'createdOn',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Created On',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.createdOn
              ? format(new Date(rowData.createdOn), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },

    {
      key: 'updatedOn',
      dataIndex: 'updatedOn',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Updated On',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.updatedOn
              ? format(new Date(rowData.updatedOn), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },

    {
      key: 'approvedStatusMsg',
      dataIndex: 'approvedStatusMsg',
      sorter: true,
      ellipsis: true,
      align: 'center',
      title: 'Status',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span
            className={`status ${
              rowData?.approvedStatusMsg.toLowerCase() ?? ''
            }`}
          >
            {toPascal(rowData.approvedStatusMsg) || 'NA'}
          </span>
        );
      },
    },

    {
      title: 'Action',
      ellipsis: true,
      align: 'center',
      isColumnVisible: checkPermissions('UPDATE_DELETE_CUSTOM_ROUTE_ADMIN'),
      render: (rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              <Popper
                visible={selectedRowId === rowData.configId}
                placement='bottomRight'
                onVisibleChange={() => {
                  if (selectedRowId && selectedRowId === rowData.configId) {
                    setSelectedRowId(null);
                  } else {
                    setSelectedRowId(rowData.configId);
                  }
                }}
                content={
                  <>
                    <div
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenuButton'
                    >
                      <a
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        onClick={() => reviewClickHandler(rowData)}
                      >
                        {String(
                          rowData.approvedStatusMsg
                        ).toLocaleLowerCase() === 'pending' ? 'Review' : 'View'}
                      </a>
                      {String(rowData.approvedStatusMsg).toLocaleLowerCase() ===
                        'pending' && (
                        <a
                          className='dropdown-item'
                          style={{ cursor: 'pointer' }}
                          onClick={() => updateClickHandler(rowData)}
                        >
                          Update
                        </a>
                      )}
                    </div>
                  </>
                }
              >
                <button
                  className='dropdown-toggle'
                  type='button'
                  id='dropdownMenuButton'
                  data-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  <img
                    src={
                      selectedRowId === rowData.configId
                        ? imgURL['active-dotted-menu']
                        : imgURL['dotted-menu']
                    }
                    alt='menu'
                  />
                </button>
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};
