import React, { FC } from 'react';
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Label,
  Brush,
  Tooltip,
} from 'recharts';
import CustomizedTooltip from '../CustomizeTooltip';
import Props from './typing';

const Chart: FC<Props> = (props): JSX.Element => {
  const { dataset } = props;

  return (
    <div className="chart-card" style={{ width: '100%', height: '250px' }}>
      <ResponsiveContainer>
        <ComposedChart width={500} height={250} data={dataset}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            content={
              <CustomizedTooltip type={'successTransactions'} {...props} />
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
          <Bar
            yAxisId={'bar-chart'}
            dataKey="successAmount"
            stackId="daily-bar-chart"
            fill="#34CB70"
            barSize={20}
          />
          <Bar
            yAxisId={'bar-chart'}
            dataKey="failureAmount"
            stackId="daily-bar-chart"
            fill="#FB4E4E"
            barSize={20}
            radius={[4, 4, 0, 0]}
          />
          <Brush
            travellerWidth={5}
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

export default Chart;
