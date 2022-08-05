import React, { FC, useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { connect } from 'react-redux';
import SelectDropdown from 'components/Select';
import { getOverviewStatusSummaryAction } from 'redux/actions/payouts';
import imgURL from '../../../../lib/imgURL';
import { getMerchantIdFromStore } from 'lib/helper';
import {
  FILTER_CONSTANTS,
  STATUS_COLOR_MAPPING,
  STATUS_NO_DATA_COLOR_CONFIG,
} from 'screens/Payouts/constants';
import { StatusSummaryProps } from '../../typing';

const StatusSummary: FC<StatusSummaryProps> = (props) => {
  const merchantId = getMerchantIdFromStore();

  const [appliedFilter, setAppliedFilter] = useState(FILTER_CONSTANTS[0].value);

  useEffect(() => {
    props.getOverviewStatusSummaryAction(merchantId, appliedFilter);
  }, [appliedFilter]);

  const pieChartData = useMemo(() => {
    const statusHash = {};
    if (Array.isArray(props.statusSummary?.statuses))
      props.statusSummary.statuses.map((status) => {
        statusHash[status.status] = status.count;
      });

    const payoutStatusData: Array<{
      value: number;
      name: string;
      color: string;
      count: number;
    }> = [];

    // Note: Maintaining total payout count to calculate percentage
    let totalPayoutCount = 0;

    for (const status in STATUS_COLOR_MAPPING) {
      let totalCurrentCount = 0;
      if (status === 'PROCESSING') {
        // Note: PROCESSING = SCHEDULED + PENDING + PROCESSING
        totalCurrentCount =
          (statusHash['SCHEDULED'] || 0) +
          (statusHash['PENDING'] || 0) +
          (statusHash['PROCESSING'] || 0);
      } else {
        totalCurrentCount = statusHash[status] || 0;
      }
      totalPayoutCount += totalCurrentCount;
      payoutStatusData.push({
        value: 0, // percentage
        name: status, // status name
        color: STATUS_COLOR_MAPPING[status].color, // color
        count: totalCurrentCount, // payout count
      });
    }

    // Note: Calculating percentage using totalPayoutCount
    for (const payoutStatus of payoutStatusData) {
      payoutStatus.value =
        totalPayoutCount > 0
          ? Math.floor((payoutStatus.count / totalPayoutCount) * 100)
          : 0;
    }

    return {
      mapped: payoutStatusData, // All 4 statuses
      filteredByZero: payoutStatusData.filter((status) =>
        Boolean(status.value)
      ), // Filtere status array with percent > 0
    };
  }, [props.statusSummary]);

  return (
    <div className='payout-statuses-card overview-card'>
      <h3>{`PAYOUT STATUSES`}</h3>
      <SelectDropdown
        onChange={setAppliedFilter}
        DropdownIcon={<img src={imgURL['down-arrow']} alt='down-arrow' />}
        optionList={FILTER_CONSTANTS}
        value={appliedFilter}
        wrapperClass='filter-dropdown'
      />
      <div className='payout-pie-chart'>
        <ResponsiveContainer width={'100%'} height={250}>
          <PieChart>
            <Pie
              data={
                pieChartData.filteredByZero.length
                  ? pieChartData.filteredByZero
                  : STATUS_NO_DATA_COLOR_CONFIG
              }
              dataKey='value'
              nameKey='name'
              innerRadius={65}
              outerRadius={93}
              cx='50%'
              cy='50%'
              stroke='none'
            >
              {pieChartData.filteredByZero.length
                ? pieChartData.filteredByZero.map((item, i) => (
                    <Cell key={i} fill={item.color}></Cell>
                  ))
                : STATUS_NO_DATA_COLOR_CONFIG.map((item, i) => (
                    <Cell key={i} fill={item.color}></Cell>
                  ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className='status-details'>
          {pieChartData.mapped.map((el, index) => (
            <div key={el.name + '_' + index}>
              <div>
                <span style={{ background: el.color }}></span>
              </div>
              <div>
                <span>{el.name}</span>
                <div>
                  <span>{el.count}</span>
                  <span>{el.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ payoutsReducer }) => ({
  statusSummary: payoutsReducer.overviewData.statusSummary,
});

export default connect(mapStateToProps, { getOverviewStatusSummaryAction })(
  StatusSummary
);
