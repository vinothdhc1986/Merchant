import React, { FC } from 'react';
import Select from 'antd/lib/select';
import { SelectProps } from './typings';
import './style.scss';

const { Option } = Select;

const SelectDropdown: FC<SelectProps> = (props) => {
  const {
    placeholder,
    onChange,
    defaultValue,
    optionList,
    disabled,
    wrapperClass,
    value,
    parentId,
    DropdownIcon,
    error,
    errorMessage,
  } = props;
  const getElement = (id: string): HTMLElement => {
    return document.getElementById(id) || document.body;
  };

  return (
    <>
      <div className={`filter-dropdown ${wrapperClass}`}>
        <Select
          suffixIcon={DropdownIcon && DropdownIcon}
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(e)}
          placeholder={placeholder}
          disabled={disabled}
          bordered={false}
          getPopupContainer={parentId ? () => getElement(parentId) : undefined}
        >
          {optionList &&
            optionList.length > 0 &&
            optionList.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
        </Select>
        {error && <div className='error'>{errorMessage}</div>}
      </div>
    </>
  );
};

export default SelectDropdown;
