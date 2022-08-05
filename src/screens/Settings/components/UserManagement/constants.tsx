/* eslint-disable react/display-name */
import React from 'react';
import Popper from '../../../../components/Popper';
import imgURL from '../../../../lib/imgURL';
import { format } from 'date-fns';
import { checkPermissions } from 'lib/helper';

const STATUS_ENUM = {
  2: 'Active',
  3: 'Suspended',
  4: 'Expired',
  7: 'Pending',
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const USER_MANAGEMENT_TABLE_CONSTANTS = (handlers: {
  clickedActionBtnId: string | null;
  setClickedActionBtnId: CallableFunction;
  handleClickUpdateUserRole: CallableFunction;
  setDeleteUserId: CallableFunction;
  handleClickResendInvitation: CallableFunction;
}) => {
  return [
    {
      title: 'Full Name',
      key: 'user_name',
      dataIndex: 'user_name',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.user_name || 'NA'}</span>;
      },
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.email || 'NA'}</span>;
      },
    },
    {
      title: 'Role',
      key: 'role_name',
      dataIndex: 'role_name',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.role_name || 'NA'}</span>;
      },
    },
    {
      title: 'Created On',
      key: 'created_at',
      dataIndex: 'created_at',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.created_at
              ? format(new Date(rowData.created_at), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      title: 'Last Modified',
      key: 'last_updated',
      dataIndex: 'last_updated',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.last_updated
              ? format(new Date(rowData.last_updated), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      sorter: true,
      align: 'center',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <div className={`status-${rowData.status_id} status`}>
            {STATUS_ENUM[rowData.status_id]}
          </div>
        );
      },
    },
    {
      title: 'Action',
      isColumnVisible: checkPermissions('UPDATE_DELETE_USER'),
      align: 'center',
      render: (rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              <Popper
                visible={handlers.clickedActionBtnId === rowData.user_id}
                placement='bottomRight'
                onVisibleChange={(visible: boolean) => {
                  handlers.setClickedActionBtnId(
                    visible ? rowData.user_id : null
                  );
                }}
                content={
                  <>
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleClickUpdateUserRole(rowData);
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Update
                    </a>
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.setDeleteUserId(rowData.user_id);
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Delete
                    </a>
                    {/* Todo/Confirm: Do we need to add confirmation modal for resend?? */}
                    {/* This option will be visible only for expired status users */}
                    {rowData.status_id === 4 && (
                      <a
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handlers.handleClickResendInvitation(rowData.user_id);
                        }}
                      >
                        Resend
                      </a>
                    )}
                  </>
                }
              >
                {rowData.role_name === 'Owner' ? (
                  <></>
                ) : (
                  <button className='dropdown-toggle'>
                    <img
                      src={
                        handlers.clickedActionBtnId === rowData.user_id
                          ? imgURL['active-dotted-menu']
                          : imgURL['dotted-menu']
                      }
                      alt='menu'
                    />
                  </button>
                )}
              </Popper>
            </div>
          </div>
        );
      },
    },
  ];
};
