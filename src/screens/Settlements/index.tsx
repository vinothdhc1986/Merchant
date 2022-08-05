import React, { FC, useState } from 'react';
import Props from './typing';
import AboutHeader from '../../components/AboutHeader';
import imgUrl from '../../lib/imgURL';
import CustomTable from '../../components/CustomTable';
import Pagination from '../../components/Pagination';
import SettlementScheduleModal from './components/SettlementScheduleModal';
import ViewSettlementDetailsModal from './components/ViewSettlementDetailsModal';
import Popper from '../../components/Popper';
import { SETTLEMENT_TABLE_CONSTANTS, dummyData } from './constants';
import './style.scss';

const Settlements: FC<Props> = (): JSX.Element => {
  const [showSettlementSchedule, setShowSettlementSchedule] = useState<boolean>(
    false
  );
  const [settlementDetailsPayload, setSettlementDetailsPayload] = useState<{
    show: boolean;
    gateway: string;
    details;
  }>({
    show: false,
    gateway: '',
    details: {},
  });
  const [
    showGatewayFilterDropdown,
    setShowGatewayFilterDropdown,
  ] = useState<boolean>(false);

  const handleViewSettlementDetails = (rowData) => {
    if (rowData) {
      setSettlementDetailsPayload({
        show: true,
        gateway: rowData.gateway,
        details: { ...rowData },
      });
    }
  };
  return (
    <>
      <div className="settlements">
        <AboutHeader
          title="Settlements"
          content="View the statuses of all settlements across multiple payment gateways."
        />
        <div className="screen-heading">
          <h2>Settlements</h2>
          <p>
            View all settlements made into your account(s) across payment
            gateways
          </p>
        </div>
        <div className="filtering-row">
          <div className="filtering-column">
            <Popper
              placement={'bottom'}
              contentClassName="gateway-filter"
              visible={showGatewayFilterDropdown}
              onVisibleChange={(visible: boolean) => {
                setShowGatewayFilterDropdown(visible);
              }}
              content={
                <>
                  <a
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowGatewayFilterDropdown(false);
                    }}
                  >
                    Settlements on Edge
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowGatewayFilterDropdown(false);
                    }}
                  >
                    Settlements on Razorpay
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowGatewayFilterDropdown(false);
                    }}
                  >
                    Settlements on PayU
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowGatewayFilterDropdown(false);
                    }}
                  >
                    Settlements on Bill Desk
                  </a>
                  <a
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setShowGatewayFilterDropdown(true);
                    }}
                  >
                    Settlements on CC Avenue
                  </a>
                </>
              }
            >
              <button>Settlements on Edge</button>
            </Popper>
          </div>
          <div className="filtering-column">
            <button onClick={() => setShowSettlementSchedule(true)}>
              <img
                src={imgUrl['calendar-icon']}
                alt="View Settlements Schedule"
              />{' '}
              View Settlements Schedule
            </button>
            <button>
              <img src={imgUrl['download-icon']} alt="Download" /> Download
            </button>
          </div>
        </div>
        <CustomTable
          columns={SETTLEMENT_TABLE_CONSTANTS({ handleViewSettlementDetails })}
          dataSource={dummyData}
        />
        <Pagination />
      </div>
      {showSettlementSchedule && (
        <SettlementScheduleModal
          handleCancel={() => setShowSettlementSchedule(false)}
          handleMoreInfo={() => {}}
        />
      )}
      {Boolean(
        settlementDetailsPayload.show &&
          settlementDetailsPayload.gateway &&
          settlementDetailsPayload.details
      ) && (
        <ViewSettlementDetailsModal
          handleClose={() =>
            setSettlementDetailsPayload({
              ...settlementDetailsPayload,
              show: false,
            })
          }
          gateway={settlementDetailsPayload.gateway}
        />
      )}
    </>
  );
};

export default Settlements;
