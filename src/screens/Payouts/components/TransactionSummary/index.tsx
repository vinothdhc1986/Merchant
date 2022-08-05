import React, { FC, useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Label,
  Brush,
} from 'recharts';
import SelectDropdown from 'components/Select';
import { getOverviewTransactionSummaryAction } from 'redux/actions/payouts';
import imgURL from 'lib/imgURL';
import { FILTER_CONSTANTS } from 'screens/Payouts/constants';
import { TransactionSummaryProps } from 'screens/Payouts/typing';
import { getMerchantIdFromStore } from 'lib/helper';

const TransactionSummary: FC<TransactionSummaryProps> = (props) => {
  const merchantId = getMerchantIdFromStore();
  const [appliedFilter, setAppliedFilter] = useState(FILTER_CONSTANTS[0].value);

  useEffect(() => {
    props.getOverviewTransactionSummaryAction(merchantId, appliedFilter);
  }, [appliedFilter]);

  const barChartData = useMemo(() => {
    return props.transactionSummary.map((transaction) => {
      return {
        ...transaction,
        // TODO: helper function to be added here.
        totalTransactionAmount: transaction.totalTransactionAmount / 1000,
      };
    });
  }, [props.transactionSummary]);

  return (
    <div className='payout-transaction-card overview-card'>
      <h3>{`PAYOUT TRANSACTIONS`}</h3>
      <SelectDropdown
        onChange={setAppliedFilter}
        DropdownIcon={<img src={imgURL['down-arrow']} alt='down-arrow' />}
        optionList={FILTER_CONSTANTS}
        value={appliedFilter}
        wrapperClass='filter-dropdown'
      />
      <br />
      <ResponsiveContainer>
        <ComposedChart width={500} height={280} data={barChartData}>
          <CartesianGrid strokeDasharray='5 5' vertical={false} />
          <XAxis
            dataKey={'date'}
            tickLine={false}
            tick={{ fontSize: 10 }}
            angle={0}
            dx={0}
            dy={10}
            interval={0}
            height={60}
          >
            <Label style={{ textAnchor: 'middle' }} dy={10} dx={0}>
              Dates
            </Label>
          </XAxis>
          <YAxis
            yAxisId={'bar-chart'}
            dataKey={'totalTransactionAmount'}
            unit={'K'}
            axisLine={false}
            tickLine={false}
            type={'number'}
            orientation={'left'}
            offset={100}
            width={70}
            tickCount={5}
          >
            <Label
              angle={270}
              position='left'
              style={{ textAnchor: 'middle' }}
              dy={0}
              dx={20}
            >
              Amount (in INR)
            </Label>
          </YAxis>
          <Bar
            yAxisId={'bar-chart'}
            dataKey='totalTransactionAmount'
            stackId='daily-bar-chart'
            fill='#80BFFF'
            barSize={20}
          />
          {barChartData.length > 10 && (
            <Brush
              dataKey='date'
              height={15}
              stroke='#8884d8'
              startIndex={0}
              endIndex={9}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

const mapStateToProps = ({ payoutsReducer }) => ({
  transactionSummary: payoutsReducer.overviewData.transactionSummary,
});

export default connect(mapStateToProps, {
  getOverviewTransactionSummaryAction,
})(TransactionSummary);
