import React, { FC } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Label,
  Brush,
  Tooltip,
} from 'recharts';
import CustomizedTooltip from '../CustomizeTooltip';
import Props from './typing';

const TotalTransactionsByVolumeAndCountChart: FC<Props> = (
  props
): JSX.Element => {
  const { dataset } = props;

  return (
    <div className="chart-card" style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer>
        <ComposedChart data={dataset} height={250}>
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray={'1'}
          />
          <Tooltip
            content={
              <CustomizedTooltip type={'totalTransactions'} {...props} />
            }
          />
          <XAxis
            dataKey={'key'}
            tickLine={false}
            tick={{ fontSize: 10 }}
            angle={0}
            dx={0}
            dy={10}
            interval={0}
            height={50}
          />
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
              position="left"
              style={{ textAnchor: 'middle' }}
              dy={20}
              dx={5}
            >
              Transaction Volume (in INR)
            </Label>
          </YAxis>
          <YAxis
            yAxisId={'line-chart'}
            dataKey={'totalTransactionCount'}
            axisLine={false}
            tickLine={false}
            type={'number'}
            orientation={'right'}
            offset={100}
            tickCount={3}
          >
            <Label
              style={{ maxWidth: '50px' }}
              angle={90}
              position="right"
              dy={-70}
              dx={-25}
            >
              Transaction Count (in thousands)
            </Label>
          </YAxis>
          <Bar
            yAxisId={'bar-chart'}
            dataKey={'totalTransactionAmount'}
            barSize={20}
            fill={'#A2EBF3'}
            name={'Transaction Volume'}
            dx={15}
            radius={[2, 2, 0, 0]}
          />
          <Line
            yAxisId={'line-chart'}
            dataKey={'totalTransactionCount'}
            type={'monotone'}
            dot={{ stroke: '#6149CD', strokeWidth: 2 }}
            strokeWidth={2}
          />
          <Brush
            dataKey="key"
            height={15}
            stroke="#8884d8"
            startIndex={
              dataset && dataset.length > 8
                ? Math.floor(dataset.length / 2) - 4
                : 0
            }
            endIndex={
              dataset && dataset.length > 8
                ? Math.floor(dataset.length / 2) + 3
                : dataset?.length
                ? dataset.length - 1
                : 0
            }
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalTransactionsByVolumeAndCountChart;
