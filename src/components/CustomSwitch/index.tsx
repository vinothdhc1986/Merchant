import React, { FC } from 'react';
import Switch from 'antd/lib/switch';
import Props from './typing';

const CustomSwitch: FC<Props> = (props): JSX.Element => {
  const { label, checked, onChange, disabled } = props;

  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <div className={'custom-switch' + ' ' + props.className || ''}>
      {Boolean(label) && (
        <div title={label} className='custom-switch-label overflow-ellipse'>
          {label}
        </div>
      )}
      <Switch
        size='small'
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSwitch;
