/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Popper from 'components/Popper';
import { UiRoutes } from 'lib/constants';
import imgURL from 'lib/imgURL';
import { checkPermissions } from 'lib/helper';

export const GATEWAY_TABLE_CONSTANTS = (handlers: {
  clickedActionBtnId: string | null;
  setClickedActionBtnId: CallableFunction;
  setStatusChangeGatewayID: CallableFunction;
  setGatewayCurrentStatus: CallableFunction;
}) => {
  return [
    {
      key: 'GATEWAY',
      dataIndex: 'GATEWAY',
      sorter: true,
      title: 'Gateways',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.gatewayName}</span>;
      },
    },
    {
      key: 'GATEWAY_ID',
      dataIndex: 'GATEWAY_ID',
      sorter: true,
      title: 'Gateway Reference ID',
      id: 'Gateway Reference ID',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.gatewayID}</span>;
      },
    },
    {
      key: 'CREATED_ON',
      dataIndex: 'CREATED_ON',
      sorter: true,
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
      key: 'GATEWAY_STATUS',
      dataIndex: 'GATEWAY_STATUS',
      align: 'center',
      sorter: true,
      title: 'Status',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <div
            className={`status ${
              rowData.status !== 2 ? 'deactivated' : 'active'
            }`}
          >
            {rowData.status !== 2 ? 'Deactivated' : 'Active'}
          </div>
        );
      },
    },
    {
      title: 'Action',
      align: 'center',
      ellipsis: true,
      isColumnVisible:
        checkPermissions('ACTIVATION_DEACTIVATION_ON_GATEWAYS') ||
        checkPermissions('UPDATE_GATEWAY_CONFIG') ||
        checkPermissions('VIEW_GATEWAY_CONFIG'),
      render: (text, rowData) => {
        return (
          <div className='action-bt'>
            <div className='dropdown' style={{ textAlign: 'center' }}>
              <Popper
                visible={handlers.clickedActionBtnId === rowData.gatewayID}
                onVisibleChange={(visible: boolean) => {
                  handlers.setClickedActionBtnId(
                    visible ? rowData.gatewayID : null
                  );
                }}
                placement='bottomRight'
                content={
                  <>
                    {checkPermissions(
                      'ACTIVATION_DEACTIVATION_ON_GATEWAYS'
                    ) && (
                      <a
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handlers.setStatusChangeGatewayID(rowData.gatewayID);
                          handlers.setClickedActionBtnId('');
                          handlers.setGatewayCurrentStatus(
                            Boolean(rowData.status === 2)
                          );
                        }}
                      >
                        Update Status
                      </a>
                    )}
                    {checkPermissions('UPDATE_GATEWAY_CONFIG') ||
                    checkPermissions('VIEW_GATEWAY_CONFIG') ? (
                      <Link
                        className='dropdown-item'
                        style={{ cursor: 'pointer' }}
                        to={{
                          pathname: UiRoutes.VIEW_GATEWAY_DETAILS(
                            rowData.gatewayName
                          ),
                          state: { gatewayId: rowData.gatewayID },
                        }}
                      >
                        Update Configuration
                      </Link>
                    ) : null}
                  </>
                }
              >
                <button className='dropdown-toggle'>
                  <img
                    src={
                      handlers.clickedActionBtnId === rowData.gatewayID
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
