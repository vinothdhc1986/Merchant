
import React, { FC } from 'react';
import Input from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import Select from '../../../../components/Select';
import Props from './typing';
import './style.scss';

const tenureTypeOptions = [
  {
    label: 'Day(s)',
    value: 'Days',
  },
  {
    label: 'Week(s)',
    value: 'Weeks',
  },
  {
    label: 'Month(s)',
    value: 'Months',
  },
  {
    label: 'Year(s)',
    value: 'Years',
  },
];

const UpdatePlanBody: FC<Props> = (props): JSX.Element => {
  const {
    planFormData,
    planFormError,
    handleChange,
    isCreate,
    handleCreatePlanSubmit,
    handleUpdatePlanSubmit,
    handleUpdatePlanCancel,
  } = props;

  // TODO: To be fixed
  // useEffect(() => {
  //   if (!isCreate) {
  //     console.log('changes ------------+++++++++++++++++');
  //   }
  // }, [planFormData]);

  const isCreateBtnEnable =
    planFormData.planName &&
    planFormData.amountPerUnit &&
    planFormData.billEvery &&
    planFormData.tenureType;

  return (
    <React.Fragment>
      <div className="plan-form">
        <Input
          id="planName"
          isRequired={true}
          label="Plan Name"
          type="text"
          value={planFormData.planName}
          className=""
          placeholder="Plan Name"
          handleChange={(e: any) => handleChange(e.target.id, e.target.value)}
          error={!!planFormError.planName}
          errorMessage={planFormError.planName}
        />
        <Input
          id="planDescription"
          label="Plan Description"
          type="text"
          value={planFormData.planDescription}
          className=""
          placeholder="Plan Description"
          handleChange={(e: any) => handleChange(e.target.id, e.target.value)}
          error={!!planFormError.planDescription}
          errorMessage={planFormError.planDescription}
        />
        <Input
          id="amountPerUnit"
          isRequired={true}
          label="Amount per unit"
          type="number"
          value={planFormData.amountPerUnit}
          className=""
          placeholder="Amount per unit"
          handleChange={(e: any) => handleChange(e.target.id, e.target.value)}
          error={!!planFormError.amountPerUnit}
          errorMessage={planFormError.amountPerUnit}
        />

        <div className="two-col">
          <Input
            id="billEvery"
            isRequired={true}
            label="Bill Every"
            type="number"
            value={planFormData.billEvery}
            className=""
            placeholder="Bill Every"
            handleChange={(e: any) => handleChange(e.target.id, e.target.value)}
            error={!!planFormError.billEvery}
            errorMessage={planFormError.billEvery}
          />
          <Select
            onChange={(value) => {
              handleChange('tenureType', value);
            }}
            optionList={tenureTypeOptions}
            defaultValue={
              planFormData.tenureType
                ? planFormData.tenureType
                : tenureTypeOptions[0].value
            }
          />
        </div>
        <Input
          id="additionalNotes"
          label="Addiitonal Notes"
          type="text"
          value={planFormData.additionalNotes}
          className=""
          placeholder="Addiitonal Notes"
          handleChange={(e: any) => handleChange(e.target.id, e.target.value)}
          error={!!planFormError.additionalNotes}
          errorMessage={planFormError.additionalNotes}
        />

        <div className="form-group action-button">
          {isCreate ? (
            <Button
              btnStyleClass="primary-button"
              label="Create Plan"
              onClick={handleCreatePlanSubmit}
              enable={isCreateBtnEnable}
            />
          ) : (
            <React.Fragment>
              <Button
                btnStyleClass="secondry-button"
                label="Cancel"
                onClick={handleUpdatePlanCancel}
                enable={true}
              />
              <Button
                btnStyleClass="primary-button"
                label="Save Changes"
                onClick={handleUpdatePlanSubmit}
                enable={false}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UpdatePlanBody;
