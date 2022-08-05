import React, { FC } from 'react';
import Radio from 'antd/lib/radio';
import Props from './typing';
import './styles.scss';

const CustomRadioGroup: FC<Props> = (props): JSX.Element => {
  const { labelClassName, options, value, onChange, groupType, name } = props;

  let radioStyle;
  if (groupType && groupType === 'inline') {
    radioStyle = {
      height: '30px',
      lineHeight: '30px',
      display: 'inline-block',
    };
  } else
    radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

  // make it customisable for formik or normal
  const handleChange = (e) => {
    if (name) {
      onChange(e);
    } else onChange(e.target.value);
  };
  return (
    <Radio.Group name={name} onChange={handleChange} value={value}>
      {options.map((radioItem, index) => (
        <Radio
          style={radioStyle}
          value={radioItem.value}
          key={index}
          className={`custom-radio-button ${labelClassName || ''}`}
        >
          {radioItem.label}
        </Radio>
      ))}
    </Radio.Group>
  );
};

export default CustomRadioGroup;
