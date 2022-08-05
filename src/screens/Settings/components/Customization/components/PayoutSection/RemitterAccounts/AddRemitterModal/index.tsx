import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import TextInput from '../../../../../../../../components/TextInput';
import CustomModalRow from '../../../../../../../../components/CustomModalRow';
import Button from '../../../../../../../../components/Button';
import CustomRadioGroup from '../../../../../../../../components/CustomRadioGroup';
import * as Yup from 'yup';
import { StatusType } from '../typing';
import Props from './typing';
import {
  STATUS_TYPE_OPTIONS,
  CURRENT_ACCOUNT_TYPE,
} from './addRemitterModal.constants';
import { getMerchantIdFromStore } from '../../../../../../../../lib/helper';
import { addRemitterAccountAction } from '../../../../../../../../redux/actions/payouts';
import {
  nameValidationRegex,
  alphaNumericValidationRegexWithoutSpace,
  ifscCodeValidationRegex,
} from '../../../../../../../../lib/constants';
import './styles.scss';

const AddRemitterModal: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();

  const { cancelHandler, validationErrors } = props;
  const [status, setStatus] = useState<StatusType>('');

  const formik = useFormik({
    initialValues: {
      bankName: '',
      accountName: '',
      accountNo: '',
      repeatAccountNo: '',
      ifscCode: '',
    },
    validationSchema: Yup.object({
      bankName: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(nameValidationRegex, validationErrors.ONLY_ALPHABETS_ALLOWED)
        .trim(),
      accountName: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(nameValidationRegex, validationErrors.ONLY_ALPHABETS_ALLOWED)
        .trim(),
      ifscCode: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(ifscCodeValidationRegex, validationErrors.INVALID_IFSC_CODE)
        .trim(),
      accountNo: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(
          alphaNumericValidationRegexWithoutSpace,
          validationErrors.ONLY_ALPHANUMERIC_ALLOWED
        )
        .trim(),
      repeatAccountNo: Yup.string().when('accountNo', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .required(validationErrors.REQUIRED_FIELD)
          .oneOf(
            [Yup.ref('accountNo')],
            validationErrors.ACCOUNT_NO_MATCH_ERROR
          ),
      }),
    }),
    onSubmit: () => {
      const requestPayload = {
        ...formik.values,
        status,
        accountType: CURRENT_ACCOUNT_TYPE,
        merchantId,
      };
      props.addRemitterAccountAction(requestPayload);
    },
  });

  const isSubmitBtnEnable = () => {
    return (
      Object.values(formik.values).every((item) => !!item) &&
      !Object.values(formik.errors).length &&
      !!status
    );
  };

  return (
    <div className='remitter-add-modal-container'>
      <form onSubmit={formik.handleSubmit}>
        <div className='content'>
          <h2 className='title'>Add Account Details</h2>
          <p className='description'>
            Please fill the following details to proceed.
          </p>

          <CustomModalRow
            label='Bank Name'
            value={
              <TextInput
                id='bankName'
                placeholder='Enter Bank Name'
                name='bankName'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.bankName && formik.errors.bankName
                )}
                errorMessage={formik.errors.bankName}
                value={formik.values.bankName}
                maxlength={50}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Account Name'
            value={
              <TextInput
                id='accountName'
                placeholder='Enter Account Name'
                name='accountName'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.accountName && formik.errors.accountName
                )}
                errorMessage={formik.errors.accountName}
                value={formik.values.accountName}
                maxlength={64}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Account Number'
            value={
              <TextInput
                id='accountNo'
                placeholder='Enter account no'
                name='accountNo'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.accountNo && formik.errors.accountNo
                )}
                errorMessage={formik.errors.accountNo}
                value={formik.values.accountNo}
                maxlength={32}
              />
            }
            isRequired
          />
          <CustomModalRow
            label='Repeat Account Number'
            value={
              <TextInput
                id='repeatAccountNo'
                placeholder='Confirm account no.'
                name='repeatAccountNo'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.repeatAccountNo &&
                    formik.errors.repeatAccountNo
                )}
                errorMessage={formik.errors.repeatAccountNo}
                value={formik.values.repeatAccountNo}
                maxlength={32}
              />
            }
            isRequired
          />

          <CustomModalRow
            label={'Status Type'}
            value={
              <CustomRadioGroup
                options={STATUS_TYPE_OPTIONS}
                groupType='inline'
                value={status}
                onChange={(value: StatusType) => setStatus(value)}
                labelClassName='radio-label'
              />
            }
            isRequired
          />

          <CustomModalRow
            label='IFSC Code'
            value={
              <TextInput
                id='ifscCode'
                placeholder='Enter IFSC code'
                name='ifscCode'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.ifscCode && formik.errors.ifscCode
                )}
                errorMessage={formik.errors.ifscCode}
                value={formik.values.ifscCode}
                maxlength={11}
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
            onClick={cancelHandler}
            enable
          />
          <Button
            label={'Add Account'}
            btnStyleType='primary'
            btnStyleClass='primary-button'
            onClick={() => {}}
            type='submit'
            enable={isSubmitBtnEnable()}
          />
        </div>
      </form>
    </div>
  );
};

export default connect(null, {
  addRemitterAccountAction,
})(AddRemitterModal);
