import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../components/Button';
import TextInput from '../../../../../components/TextInput';
import CustomModalRow from '../../../../../components/CustomModalRow';
import CustomRadioGroup from '../../../../../components/CustomRadioGroup';
import imgUrl from '../../../../../lib/imgURL';
import { twoDigitAfterDecimalValidationRegex } from 'lib/constants';
import {
  MAX_REMARK_LENGTH,
  remarksRegex,
  payoutTransferLimit,
  upiPaymentOption,
  bankPaymentOptions,
} from 'screens/IndividualPayouts/individualPayouts.constants';
import Props from './typings';

const TransferDetails: FC<Props> = (props): JSX.Element => {
  const { validationErrors, isVPA } = props;

  const [transferLimitMessage, setTransferLimitMessage] = useState('');

  const [transferLimitError, setTransferLimitError] = useState(false);

  useEffect(() => {
    props.savedTransferDetails && formik.setValues(props.savedTransferDetails);
  }, [props.savedTransferDetails]);

  useEffect(() => {
    isVPA && formik.setFieldValue('transferType', 'UPI');
  }, []);

  const formik = useFormik({
    initialValues: {
      transferType: '',
      amount: 0,
      remarks: '',
    },
    validationSchema: Yup.object({
      transferType: Yup.string().required(validationErrors.REQUIRED_FIELD),
      amount: Yup.string().required(validationErrors.REQUIRED_FIELD).trim(),
      remarks: Yup.string().required(validationErrors.REQUIRED_FIELD),
    }),
    onSubmit: () => {
      props.onProceed(formik.values);
    },
  });

  // onTransfer type change msg limit range
  useEffect(() => {
    if (formik.values.transferType.length > 0) {
      const selectedTransferObject =
        payoutTransferLimit[formik.values.transferType];
      const selectedLimitMessage = `Please enter an amount between ₹ ${selectedTransferObject.limitFrom} to ₹ ${selectedTransferObject.limitTo}.`;
      setTransferLimitMessage(selectedLimitMessage);
    } else {
      setTransferLimitMessage('Please enter an amount between ₹ X to ₹ Y.');
    }
  }, [formik.values.transferType]);

  // amount validation
  useEffect(() => {
    if (formik.values.amount > 0 && formik.values.transferType.length > 0) {
      const selectedTransferObject =
        payoutTransferLimit[formik.values.transferType];
      if (
        !(
          selectedTransferObject.limitFrom <= formik.values.amount &&
          formik.values.amount <= selectedTransferObject.limitTo
        )
      ) {
        setTransferLimitError(true);
      } else {
        setTransferLimitError(false);
      }
    }
  }, [formik.values.transferType, formik.values.amount]);

  const handleAmountChange = (e: React.ChangeEvent<any>) => {
    if (twoDigitAfterDecimalValidationRegex.test(e.target.value))
      formik.handleChange(e);
  };

  const handleRemarksChange = (e: React.ChangeEvent<any>) => {
    if (remarksRegex.test(e.target.value)) 
    formik.handleChange(e);
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className='content'>
          <div className='back-button' onClick={() => props.onBackClick()}>
            <img src={imgUrl['back-arrow-blue']} alt='Back' /> Back
          </div>

          <CustomModalRow
            label={'Transfer Type'}
            isRequired
            value={
              <CustomRadioGroup
                options={isVPA ? upiPaymentOption : bankPaymentOptions}
                groupType='inline'
                value={formik.values.transferType}
                onChange={formik.handleChange}
                labelClassName='radio-label'
                name='transferType'
              />
            }
          />
          <CustomModalRow
            label={'Amount(INR)'}
            value={
              <div>
                <TextInput
                  id='amount'
                  type='number'
                  placeholder='Enter a amount'
                  name='amount'
                  handleChange={handleAmountChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.amount && formik.errors.amount)}
                  errorMessage={formik.errors.amount}
                  value={formik.values.amount}
                />
                <p className={transferLimitError ? 'error' : 'empty-text'}>
                  {transferLimitMessage}
                </p>
              </div>
            }
            isRequired
          />
          <CustomModalRow
            label={'Remarks'}
            isRequired
            value={
              <TextInput
                id='remarks'
                placeholder='Enter additional notes'
                name='remarks'
                handleChange={handleRemarksChange}
                onBlur={formik.handleBlur}
                maxlength={MAX_REMARK_LENGTH}
                error={Boolean(formik.touched.remarks && formik.errors.remarks)}
                errorMessage={formik.errors.remarks}
                value={formik.values.remarks}
              />
            }
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
            type='submit'
            label='Proceed'
            btnStyleType='primary'
            btnStyleClass='primary-button'
            enable={
              formik.values.amount > 0 &&
              formik.values.transferType.length > 0 &&
              formik.values.remarks.length > 0 &&
              transferLimitError === false
            }
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default TransferDetails;
