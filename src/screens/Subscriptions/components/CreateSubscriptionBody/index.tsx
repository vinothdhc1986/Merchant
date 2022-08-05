/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { FC, useState } from 'react';
import SelectDropdown from '../../../../components/Select';
import { plansOptions } from '../../constants';
import Button from '../../../../components/Button';
import Input from '../../../../components/TextInput';
import Checkbox from '../../../../components/Checkbox';
import AddonRow from '../AddonRow';
import Modal from '../../../../components/Modal';
import imgURL from '../../../../lib/imgURL';
import CreateAddonModalBody from '../CreateAddonModalBody';

import Props from './typing';
import './style.scss';

const CreateSubscriptionBody: FC<Props> = (props): JSX.Element => {
  const [isCreateAddonModal, setIsCreateAddonModal] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [addonList, setAddonList] = useState<any[]>([]);
  const [addonModalFormData, setAddonModalFormData] = useState<{
    addonName: string;
    amountPerUnit: string;
  }>({
    addonName: '',
    amountPerUnit: '',
  });

  const addonModalChangeHandler = (name, value) => {
    setAddonModalFormData({
      ...addonModalFormData,
      [name]: value,
    });
  };

  const createAddonHandler = () => {
    const addonListCopy = [...addonList];
    addonListCopy.push({ ...addonModalFormData });
    setAddonList(addonListCopy);
    setIsCreateAddonModal(false);
    setAddonModalFormData({
      addonName: '',
      amountPerUnit: '',
    });
  };

  return (
    <React.Fragment>
      <div className="create-sbscription">
        <div className="create-plan-box">
          <h5>PLAN DETAILS</h5>
          <div className="form-group">
            <label>
              Plan<em>*</em>
            </label>
            <SelectDropdown
              placeholder={'select'}
              onChange={() => {}}
              defaultValue={'select'}
              optionList={plansOptions}
            />
          </div>

          <div className="form-group">
            <label>
              Quantity<em>*</em>
            </label>
            <div className="quantity">
              <Button
                btnStyleClass="secondry-button dissable"
                label="-"
                onClick={() => {}}
                enable={true}
              />
              <div className="value-box">1</div>
              <Button
                btnStyleClass="secondry-button"
                label="+"
                onClick={() => {}}
                enable={true}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label>
              Start Date<em>*</em>
            </label>
            <div className="check-box">
              <input
                type="checkbox"
                className="d-none"
                id="check1"
                checked={false}
              />
              <label htmlFor="check1" className="d-flex">
                <span className="check-box-icon d-block"></span>
                Start immediately with first payment
              </label>
            </div>
            <SelectDropdown
              placeholder={'select'}
              onChange={() => {}}
              defaultValue={'select'}
              optionList={plansOptions}
            />
          </div>

          <Input
            id="totalCounts"
            isRequired={true}
            label="Total Counts"
            type="number"
            value={''}
            className=""
            placeholder="Total Counts"
            handleChange={() => {}}
            // error={!!planFormError.planName}
            // errorMessage={planFormError.planName}
          />
          <div className="form-group">
            <label>
              Link Expiry Date<em>*</em>
            </label>
            <Checkbox
              handleChange={() => {}}
              checked={false}
              label={'No Expiry Date on Link'}
              id={'expiry-date-id'}
            />

            <SelectDropdown
              placeholder={'No Expiry Date on Link'}
              onChange={() => {}}
              defaultValue={'select'}
              optionList={plansOptions}
            />
          </div>
        </div>

        <div className="create-plan-box addon-row">
          <h5>ADDONS</h5>
          <Checkbox
            handleChange={() => {}}
            checked={true}
            label={'I want to add an upfront amount'}
            id={'addons-check-id'}
          />
          {addonList.map((item, i) => (
            <AddonRow key={i} />
          ))}

          <button
            className="secondry-button border-0"
            onClick={() => setIsCreateAddonModal(true)}
          >
            <img src={imgURL['plus-icon']} alt="" />
            Addon
          </button>
        </div>

        <div className="create-plan-box border-0">
          <h5>CUSTOMER DETAILS</h5>
          <div className="column-two">
            <div className="col">
              <Input
                id="customerEmail"
                label="Customer Email"
                type="text"
                value={''}
                className=""
                placeholder="Customer Email"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handleChange={(e: any) => {}}
                // error={!!planFormError.planName}
                // errorMessage={planFormError.planName}
              />
            </div>
            <div className="col">
              <Input
                id="customerMobile"
                label="Customer Mobile Number"
                type="number"
                value={''}
                className=""
                placeholder="Customer Mobile Number"
                handleChange={() => {}}
                // error={!!planFormError.planName}
                // errorMessage={planFormError.planName}
              />
            </div>
          </div>

          <Checkbox
            handleChange={() => {}}
            checked={false}
            label={'Notify Customer'}
            id={'notify-customer-id'}
          />
        </div>
        <div className="action-button">
          <Button
            btnStyleClass="primary-button dissable"
            label="Confirm"
            onClick={() => {}}
            enable={true}
          />{' '}
        </div>
      </div>
      {isCreateAddonModal && (
        <Modal
          ModalBody={CreateAddonModalBody}
          modalBodyProps={{
            closeModal: () => {
              setIsCreateAddonModal(false);
              setAddonModalFormData({
                addonName: '',
                amountPerUnit: '',
              });
            },
            createAddonHandler,
            addonModalFormData,
            addonModalChangeHandler,
          }}
          modalWrapperClass="subscription-filter"
          onBackdropClick={() => {
            setIsCreateAddonModal(false);
            setAddonModalFormData({
              addonName: '',
              amountPerUnit: '',
            });
          }}
        />
      )}
    </React.Fragment>
  );
};

export default CreateSubscriptionBody;
