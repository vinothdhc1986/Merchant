import React, { FC } from 'react';
import Button from '../../../../components/Button';
import InputField from '../../../../components/TextInput';
import Props from './typing';
import './style.scss';

const radioOptions = [
  {
    label: 'Week',
    id: 'Week',
  },
  {
    label: 'Month',
    id: 'Month',
  },
  {
    label: 'Year',
    id: 'Year',
  },
];

const FilterModalBody: FC<Props> = (props): JSX.Element => {
  const { cancelHandler } = props;
  return (
    <React.Fragment>
      <h3>Filter By</h3>
      <p>Please use the options to filter the plans.</p>
      <div className="modal-body">
        <div className="filter-row">
          <label>Amount per unit</label>
          <div className="value-box">
            <InputField
              type="number"
              value=""
              placeholder="Enter Value"
              className="form-control"
              handleChange={() => {}}
            />
          </div>
        </div>
        <div className="filter-row">
          <label>Billing Cycle</label>
          <div className="value-box">
            <InputField
              type="number"
              value=""
              placeholder="Enter Value"
              className="form-control"
              handleChange={() => {}}
            />
            <ul className="order-status">
              {radioOptions.map((item) => (
                <li key={item.id}>
                  <div className="check-box radio-button">
                    <input
                      type="radio"
                      className="d-none selectall"
                      name="status"
                      id={item.id}
                    />
                    <label htmlFor={item.id} className="d-flex">
                      <span className="check-box-icon d-block"></span>
                      {item.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="action-button text-right">
          <Button
            btnStyleClass="secondry-button f-left"
            label="Cancel"
            onClick={cancelHandler}
            enable={true}
          />
          <Button
            btnStyleClass="secondry-button"
            label="Clear"
            onClick={() => {}}
            enable={false}
          />
          <Button
            btnStyleClass="primary-button"
            label="Filter Transactions"
            onClick={() => {}}
            enable={false}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FilterModalBody;
