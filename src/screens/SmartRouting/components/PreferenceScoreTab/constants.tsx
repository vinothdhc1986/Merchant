/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { format } from 'date-fns';
import Popper from 'components/Popper';
import imgURL from 'lib/imgURL';
import { preferenceType } from './typing';
import { checkPermissions } from 'lib/helper';

export const PREFERENCE_SCORE_TYPE = {
  bin: 'bin',
  issuer: 'issuer',
  card: 'card',
  transaction: 'transaction',
};

export const PREFERENCE_SCORE_TYPE_KEY_MAPPING = {
  bin: 'ISIN',
  issuer: 'IssuerName',
  card: 'CardBrandName',
  transaction: 'transaction',
};

const PREFERENCE_SCORE_TITLE = {
  bin: 'BIN',
  issuer: 'Issuer',
  card: 'Card Brand',
  transaction: 'Title',
};

const PREFERENCE_SCORE_KEY = {
  bin: 'ISIN',
  issuer: 'ISSUER_NAME',
  card: 'CARD_BRAND',
  // transaction: 'Title',
};

export const PREFERENCE_SCORES_TABLE_CONSTANTS = (handlers: {
  clickedActionBtnId: string | null;
  setClickedActionBtnId: FunctionStringCallback;
  type: preferenceType;
  handleDeletePreferenceScore: CallableFunction;
  handleEditRouting: CallableFunction;
}) => {
  return [
    {
      key: PREFERENCE_SCORE_KEY[handlers.type],
      dataIndex: PREFERENCE_SCORE_KEY[handlers.type],
      sorter: true,
      title: PREFERENCE_SCORE_TITLE[handlers.type],
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData[PREFERENCE_SCORE_TYPE_KEY_MAPPING[handlers.type]]}
          </span>
        );
      },
    },
    {
      key: 'GATEWAY_NAME',
      dataIndex: 'GATEWAY_NAME',
      sorter: true,
      title: 'Gateway',
      id: 'Gateway',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.GatewayName}</span>;
      },
    },
    {
      key: 'PREFERENCE_SCORE',
      dataIndex: 'PREFERENCE_SCORE',
      sorter: true,
      title: 'Preference Score',
      isColumnVisible: true,
      render: (text, rowData) => {
        return <span>{rowData.PreferenceScore}</span>;
      },
    },
    {
      key: 'DATE_CREATED',
      dataIndex: 'DATE_CREATED',
      sorter: true,
      title: 'Created On',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.DateCreated
              ? format(new Date(rowData.DateCreated), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      key: 'LAST_UPDATED',
      dataIndex: 'Last Updated',
      sorter: true,
      title: 'Last Updated',
      isColumnVisible: true,
      render: (text, rowData) => {
        return (
          <span>
            {rowData.LastUpdated
              ? format(new Date(rowData.LastUpdated), 'd MMM yyyy, hh:mm aa')
              : 'NA'}
          </span>
        );
      },
    },
    {
      title: 'Action',
      isColumnVisible: checkPermissions('UPDATE_DELETE_PREFERENCE_ROUTES'),
      render: (rowData, index) => {
        return (
          <div className='action-bt'>
            <div className='dropdown'>
              <Popper
                visible={handlers.clickedActionBtnId === index}
                onVisibleChange={(visible: boolean) => {
                  handlers.setClickedActionBtnId(visible ? index : null);
                }}
                placement='bottomRight'
                content={
                  <>
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleEditRouting(
                          rowData,
                          rowData[
                            PREFERENCE_SCORE_TYPE_KEY_MAPPING[handlers.type]
                          ],
                          handlers.type
                        );
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Update
                    </a>
                    <a
                      className='dropdown-item'
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        handlers.handleDeletePreferenceScore(
                          rowData,
                          handlers.type
                        );
                        handlers.setClickedActionBtnId('');
                      }}
                    >
                      Delete
                    </a>
                  </>
                }
              >
                <button className='dropdown-toggle'>
                  <img
                    src={
                      handlers.clickedActionBtnId === index
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
