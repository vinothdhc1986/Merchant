/* eslint-disable no-debugger */
import React, { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { dataset } from './constant';
import Props from './typing';

const PlatformChart: FC<Props> = (props): JSX.Element => {
  const { platformData } = props;

  return (
    <React.Fragment>
      {platformData &&
      platformData[0].value !== null &&
      platformData[1].value !== null ? (
        <PieChart width={200} height={190}>
          <Pie
            data={platformData}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            cx="50%"
            cy="50%"
          >
            {dataset.map((item, i) => (
              <Cell key={i} fill={item.color}></Cell>
            ))}{' '}
          </Pie>
        </PieChart>
      ) : (
        <PieChart width={200} height={190}>
          <Pie
            data={[{ name: 'abc', value: 100, index: 0, color: '#123456' }]}
            dataKey="value"
            nameKey="name"
            innerRadius={58}
            outerRadius={82}
            cx="50%"
            cy="50%"
          >
            {dataset.map((item, i) => (
              <Cell key={i} fill={'#F7F8FB'}></Cell>
            ))}{' '}
          </Pie>
        </PieChart>
      )}
    </React.Fragment>
  );
};

export default PlatformChart;
