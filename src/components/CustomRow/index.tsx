import React, { FC } from 'react';
import Props from './typing';

const CustomRow: FC<Props> = (props) => {
  const { label, value, valueStyleClass } = props;
  return (
    <>
      <tr>
        <td>{label}</td>
        <td className={valueStyleClass ?? ''}>{value}</td>
      </tr>
    </>
  );
};

export default CustomRow;
