import React, { FC } from 'react';
import InputField from '../TextInput';
import Checkbox from '../Checkbox';
import Button from '../Button';
import Select from '../Select';
import Modal from '../Modal';
import { amountOptions, radioOptions } from './constants';
import Props from './typing';
import './style.scss';
import DialCodePhoneInput from 'components/DialCodePhoneInput';


const renderDropdownWithAmount = (field) => {
  return (
    <div className='filter-row'>
      <Select
        optionList={field.options}
        defaultValue={field.options[0].value}
        value={field.value.selectKey}
        onChange={(e) => {
          field.handleSelect(field.name, e);
        }}
        parentId='plural-xt-filter-body'
      />

      {field.value.selectKey === 'amount' && (
        <Select
          optionList={amountOptions}
          defaultValue={amountOptions[0].value}
          value={field.amountFilter}
          onChange={(e) => {
            field.handleSelectAmount(e);
          }}
          parentId='plural-xt-filter-body'
        />
      )}

      <div className='value-box'>
        <InputField
          type='text'
          value={field.value.inputValue}
          placeholder='Enter Value'
          className='form-control'
          handleChange={(e) => field.handleInput(field.name, e.target.value)}
          readonly={
            field.value.selectKey === 'Select' || !field.value.selectKey
          }
        />
      </div>
    </div>
  );
};

const renderDropdownWithoutAmount = (field) => {
  return (
    <div className='filter-row'>
      <Select
        optionList={field.options}
        defaultValue={field.options[0].value}
        value={field.value.selectKey}
        onChange={(e) => {
          field.handleSelect(field.name, e);
        }}
        parentId='plural-xt-filter-body'
      />

      <div className='value-box customer-detail'>
        {field.value.selectKey === "customerPhone" ? 
         
          <DialCodePhoneInput
                id={field.name}
                formGroupClassName='customer-phone'
                placeholder='Enter your mobile no.'
                name='phone'
                handleChange={(value, data) => {
                  field.handleInput(field.name,  `${value.replace(data.dialCode,`${data.dialCode}-`)}`);
                  }}
                onBlur={field.handleInputBlur || (() => {})}
                errorMessage={field.inputErrorMessage || ''}
                error={field.inputError || false}
                inputProps={{
                  name: 'phone',
                }}
                country={'in'}
                onlyCountries={['in']}
                masks={{ in: '..........' }}
                countryCodeEditable={false}
              /> : 
              <InputField
                id={field.name}
                type='text'
                value={field.value.inputValue || ''}
                placeholder='Enter Value'
                className='form-control'
                handleChange={(e) => field.handleInput(field.name, e.target.value)}
                readonly={
                  field.value.selectKey === 'Select' || !field.value.selectKey
                }
                onBlur={field.handleInputBlur || (() => {})}
                errorMessage={field.inputErrorMessage || ''}
                error={field.inputError || false}
              />
        }
      </div>
    </div>
  );
};

const renderCheckboxGroup = (field) => {
  return (
    <div className='filter-row'>
      <label>{field.label}</label>
      <ul className='order-status'>
        {field.options.map((item, index) => (
          <li key={index}>
            <Checkbox
              id={item.id}
              label={item.label}
              checked={field.value.includes(item.id)}
              handleChange={() => {
                field.onChange(field.name, item.id);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderInputField = (field) => {
  return (
    <div className='filter-row'>
      <label>{field?.label}</label>
      <div className='value-box'>
        <InputField
          type={field.subType || 'number'}
          maxlength={field.maxlength}
          id={field.name}
          value={field.value}
          placeholder='Enter Value'
          className='form-control'
          handleChange={(e) => field.onChange(e.target.id, e.target.value)}
          onBlur={field.handleInputBlur || (() => {})}
          errorMessage={field.inputErrorMessage || ''}
          error={field.inputError || false}
        />
      </div>
    </div>
  );
};

const renderBillingCycle = (field) => {
  return (
    <div className='filter-row'>
      <label>Billing Cycle</label>
      <div className='value-box'>
        <InputField
          type='number'
          value={field.value.freq}
          placeholder='Enter Value'
          className='form-control'
          handleChange={(e) => field.onChange('freq', e.target.value)}
        />
        <ul className='order-status'>
          {radioOptions.map((item) => (
            <li key={item.id}>
              <div className='check-box radio-button'>
                <input
                  type='radio'
                  className='d-none selectall'
                  name='status'
                  id={item.id}
                  checked={field.value.tenureType === item.id}
                  onChange={(e) => field.onChange('tenureType', e.target.id)}
                />
                <label htmlFor={item.id} className='d-flex'>
                  <span className='check-box-icon d-block'></span>
                  {item.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const renderActionButtons = (props) => {
  const { closeFilter, applyFilter, resetFilter } = props;
  return (
    <div className='action-button text-right'>
      <Button
        btnStyleClass='secondry-button f-left'
        label='Cancel'
        onClick={closeFilter}
        enable={true}
      />
      <Button
        btnStyleClass='secondry-button'
        label='Clear'
        onClick={resetFilter}
        enable={true}
      />
      <Button
        btnStyleClass='primary-button'
        label='Filter Transactions'
        onClick={applyFilter}
        enable={!props.disableSubmit}
      />
    </div>
  );
};

const renderFormData = (field): JSX.Element | null => {
  switch (field.type) {
    case 'dropdownWithAmount':
      return renderDropdownWithAmount(field);
    case 'dropdownWithoutAmount':
      return renderDropdownWithoutAmount(field);
    case 'checkboxGroup':
      return renderCheckboxGroup(field);
    case 'inputField':
      return renderInputField(field);
    case 'billingCycle':
      return renderBillingCycle(field);
    default:
      return null;
  }
};

const RenderModalBody = (props) => {
  /**
   * @props container all data passed as modalBodyProps
   */
  const { columns } = props;
  return (
    <>
      <h3>Filter By</h3>
      <p>Please use the options to filter the transactions.</p>
      <div
        className='modal-body filter-component-body'
        id='plural-xt-filter-body'
      >
        {columns.map((field, index) => (
          <React.Fragment key={index}>{renderFormData(field)}</React.Fragment>
        ))}
        {renderActionButtons(props)}
      </div>
    </>
  );
};

const Filter: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        onBackdropClick={props.closeFilter}
      />
    </React.Fragment>
  );
};

export default Filter;
