import React, { FC } from 'react';
import Props from './typing';
import './style.scss';

const Checkbox: FC<Props> = (props): JSX.Element => {
  const { handleChange, checked, label, id } = props;
  return (
    <React.Fragment>
      <div className="check-box">
        <input
          type="checkbox"
          className="d-none selectall"
          id={id}
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={id} className="d-flex">
          <span className="check-box-icon d-block"></span>
          {label}
        </label>
      </div>
    </React.Fragment>
  );
};

export default Checkbox;
