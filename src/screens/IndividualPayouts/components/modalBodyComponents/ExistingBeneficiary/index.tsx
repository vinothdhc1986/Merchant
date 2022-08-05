import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../../../../components/Button';
import CustomSearchInput from '../../../../../components/CustomSearchInput';
import CustomModalRow from '../../../../../components/CustomModalRow';
import imgUrl from '../../../../../lib/imgURL';
import { getMerchantIdFromStore } from 'lib/helper';
import { alphaNumericValidationRegexWithoutSpace } from 'lib/constants';
import Props from './typings';
import { getBeneficiaryByCodeAction } from 'redux/actions/payouts';

const initState = {
  beneficiaryCode: '',
  beneficiaryName: '',
  accountNumber: '',
  IFSC: '',
  VPA: '',
};

const ExistingBeneficiary: FC<Props> = (props): JSX.Element => {
  const { validationErrors } = props;
  const merchantId = getMerchantIdFromStore();

  const [searchText, setSearchText] = useState(props.search || '');
  const [searchError, setSearchError] = useState('');
  const [existingBeneficiaryDetails, setExistingBeneficiaryDetails] =
    useState(initState);

  useEffect(() => {
    if (props.search) {
      setSearchText(props.search);
    }
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, data } = props.getBeneficiaryByCodeState;

    if (isSuccess && data?.status === 'ACTIVE') {
      setSearchError('');
      setExistingBeneficiaryDetails({
        beneficiaryCode: data.beneficiaryCode,
        beneficiaryName: data.beneName,
        accountNumber: data.beneAccountNo,
        IFSC: data.ifscCode,
        VPA: data.upiHandle,
      });
    } else if (data?.status === 'DISABLED') {
      setSearchError(validationErrors.BENEFICIARY_ALREADY_DISABLED);
      setExistingBeneficiaryDetails(initState);
    } else if (data?.status === 'FAILED') {
      setSearchError(validationErrors.BENEFICIARY_ALREADY_FAILED);
      setExistingBeneficiaryDetails(initState);
    }
    if (isFailure) {
      setSearchError(validationErrors.BENEFICIARY_NOT_FOUND);
      setExistingBeneficiaryDetails(initState);
    }
  }, [props.getBeneficiaryByCodeState]);

  const searchRecordsHandler = (value: string) => {
    const trimmedValue = value.trim();
    const isValueValid =
      alphaNumericValidationRegexWithoutSpace.test(trimmedValue);
    if (trimmedValue.length > 0 && isValueValid) {
      props.getBeneficiaryByCodeAction({
        merchantId: merchantId,
        beneficiaryCode: trimmedValue,
      });
    }

    if (!isValueValid) {
      setSearchError(validationErrors.ONLY_ALPHANUMERIC_ALLOWED);
    }

    if (trimmedValue.length === 0) setSearchError('');

    setSearchText(trimmedValue);
    setExistingBeneficiaryDetails(initState);
  };

  return (
    <React.Fragment>
      <div className='content'>
        <div className='back-button' onClick={() => props.onBackClick()}>
          <img src={imgUrl['back-arrow-blue']} alt='Back' /> Back
        </div>
        <CustomModalRow
          label={'Beneficiary ID'}
          isRequired
          value={
            <div>
              <CustomSearchInput
                placeholder='Enter Beneficiary ID'
                value={searchText}
                handleSearch={() => {}}
                searchRecordsHandler={(value) => searchRecordsHandler(value)}
                customWidth='100%'
                suffix={<span style={{ color: '#2E7BE6' }}>Search</span>}
              />
              {!searchText ? (
                <span className={`empty-text`}>
                  Please enter a beneficiary ID
                </span>
              ) : searchError ? (
                <span className={`red`}>{searchError}</span>
              ) : null}
            </div>
          }
        />
        <CustomModalRow
          label={'Beneficiary Name'}
          value={existingBeneficiaryDetails.beneficiaryName || '-'}
        />
        <CustomModalRow
          label={'Account Number'}
          value={existingBeneficiaryDetails.accountNumber || '-'}
        />
        <CustomModalRow
          label={'IFSC Code'}
          value={existingBeneficiaryDetails.IFSC || '-'}
        />
        <CustomModalRow
          label={'VPA'}
          value={existingBeneficiaryDetails.VPA || '-'}
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
            props.onProceed(existingBeneficiaryDetails, searchText);
          }}
          enable={
            props.getBeneficiaryByCodeState.isSuccess &&
            !searchError &&
            !!searchText
          }
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ payoutsReducer, validationReducer }) => ({
  getBeneficiaryByCodeState: payoutsReducer.getBeneficiaryByCodeState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
});

export default connect(mapStateToProps, { getBeneficiaryByCodeAction })(
  ExistingBeneficiary
);
