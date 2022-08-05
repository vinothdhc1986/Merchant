import React, { FC } from 'react';
import CustomModalRow from 'components/CustomModalRow';
import Button from '../../../../../components/Button';
import CustomRadioGroup from '../../../../../components/CustomRadioGroup';
import Props from './typings';

const BeneficiaryType: FC<Props> = (props): JSX.Element => {
  const { beneficiaryType, setBeneficiaryType } = props;

  return (
    <React.Fragment>
      <div className='content'>
        <CustomModalRow
          label={'Beneficiary Type'}
          value={
            <CustomRadioGroup
              options={[
                { label: 'Existing Beneficiary', value: 'existingBeneficiary' },
                { label: 'New Beneficiary', value: 'newBeneficiary' },
              ]}
              groupType='inline'
              value={beneficiaryType}
              onChange={(value: string) => {
                setBeneficiaryType(value);
              }}
              labelClassName='radio-label'
            />
          }
          isRequired
        />
      </div>
      <div className='modal-action-buttons'>
        <Button
          label='Close'
          btnStyleType='secondary'
          btnStyleClass='secondry-button'
          onClick={() => {
            props.closeModal();
          }}
          enable
        />

        <Button
          label='Proceed'
          btnStyleType='primary'
          btnStyleClass='primary-button'
          onClick={() => {
            props.onProceed(beneficiaryType);
          }}
          enable={
            beneficiaryType === 'existingBeneficiary' ||
            beneficiaryType === 'newBeneficiary'
          }
        />
      </div>
    </React.Fragment>
  );
};

export default BeneficiaryType;
