import React, { FC } from 'react';
import Input from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import Props from './typing';
import './style.scss';

const CreateAddonModalBody: FC<Props> = (props): JSX.Element => {
  const {
    closeModal,
    createAddonHandler,
    addonModalFormData,
    addonModalChangeHandler,
  } = props;

  return (
    <>
      <h3>Create an Addon</h3>
      <p>
        Addons will be available while creating subscriptions for all plans.
      </p>
      <div className="modal-body">
        <div className="filter-row amoun-unit">
          <label>
            Addon Name<em>*</em>
          </label>
          <div className="value-box">
            <Input
              id="addonName"
              type="text"
              value={addonModalFormData.addonName || ''}
              className=""
              placeholder="Enter Name"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handleChange={(e: any) => {
                addonModalChangeHandler(e.target.id, e.target.value);
              }}
            />
          </div>
        </div>
        <div className="filter-row amoun-unit">
          <label>
            Addon Amount per unit<em>*</em>
          </label>
          <div className="value-box">
            <Input
              id="amountPerUnit"
              type="text"
              value={addonModalFormData.amountPerUnit || ''}
              className=""
              placeholder="Enter Amount"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              handleChange={(e: any) => {
                addonModalChangeHandler(e.target.id, e.target.value);
              }}
            />
          </div>
        </div>

        <div className="action-button text-right">
          <Button
            btnStyleClass="secondry-button"
            label="Cancel"
            onClick={closeModal}
            enable={true}
          />
          <Button
            btnStyleClass="primary-button"
            label="Create Addon"
            onClick={createAddonHandler}
            enable={
              !!addonModalFormData.amountPerUnit &&
              !!addonModalFormData.addonName
            }
          />
        </div>
      </div>
    </>
  );
};

export default CreateAddonModalBody;
