import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '../../../../components/Modal';
import TextInput from '../../../../components/TextInput';
import Button from '../../../../components/Button';
import CustomRadioGroup from '../../../../components/CustomRadioGroup';
import DialCodePhoneInput from '../../../../components/DialCodePhoneInput';
import CustomModalRow from '../../../../components/CustomModalRow';
import {
  nameValidationRegex,
  emailValidationRegex,
  selectedCountryPhoneRegex,
  ifscCodeValidationRegex,
  alphaNumericValidationRegexWithoutSpace,
} from '../../../../lib/constants';
import { getMerchantIdFromStore } from 'lib/helper';
import Props from './typings';
//import notify from 'lib/notifiy';

const RenderModalBody: FC<Props> = (props) => {
  const merchantId = getMerchantIdFromStore();
  const { validationErrors } = props;

  const [selectedCountry, setSelectedCountry] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dialCode, setDialCode] = useState('');

  const selectedCountryRegex = selectedCountryPhoneRegex[selectedCountry];
  const [beneficiaryWith, setBeneficiaryWith] = useState('');

  // useEffect(() => {
  //   const { isSuccess, isFailure, successMessage, errorMessage } =
  //     props.addNewBeneficiaryState;

  //   if (isSuccess) {
  //     notify({
  //       type: 'success',
  //       message: 'Success',
  //       description: successMessage,
  //     });

  //     props.closeModal();
  //     props.clearAddNewBeneficiaryAction();
  //   }
  //   if (isFailure) {
  //     notify({
  //       type: 'error',
  //       message: 'Failure',
  //       description: errorMessage,
  //     });
  //   }
  // }, [props.addNewBeneficiaryState]);

  useEffect(() => {
    if (beneficiaryWith === 'upiHandle') {
      formik.setFieldValue('bankName', '');
      formik.setFieldValue('accountNumber', '');
      formik.setFieldValue('repeatAccountNumber', '');
      formik.setFieldValue('ifscCode', '');
    }
    if (beneficiaryWith === 'bankDetails') {
      formik.setFieldValue('vpa', '');
    }
  }, [beneficiaryWith]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      bankName: '',
      accountNumber: '',
      repeatAccountNumber: '',
      ifscCode: '',
      vpa: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(nameValidationRegex, validationErrors.ONLY_ALPHABETS_ALLOWED)
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      email: Yup.string()
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      phone: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(selectedCountryRegex, validationErrors.INVALID_PHONE),
      ifscCode: Yup.string()
        .matches(ifscCodeValidationRegex, validationErrors.INVALID_IFSC_CODE)
        .trim(),
      bankName: Yup.string()
        .matches(nameValidationRegex, validationErrors.ONLY_ALPHABETS_ALLOWED)
        .trim(),
      accountNumber: Yup.string()
        .matches(
          alphaNumericValidationRegexWithoutSpace,
          validationErrors.ONLY_ALPHANUMERIC_ALLOWED
        )
        .trim(),
      repeatAccountNumber: Yup.string().when('accountNumber', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string()
          .required(validationErrors.REQUIRED_FIELD)
          .oneOf(
            [Yup.ref('accountNumber')],
            validationErrors.ACCOUNT_NO_MATCH_ERROR
          ),
      }),
      vpa: Yup.string().when(
        ['accountNumber', 'repeatAccountNumber', 'ifscCode', 'bankName'],
        {
          is: (val) => (val && val.length === 0 ? true : false),
          then: Yup.string().required(validationErrors.REQUIRED_FIELD),
        }
      ),
    }),
    onSubmit: () => {
      const rawPhone = formik.values.phone.slice(dialCode.length);
      //const dial = `+${dialCode}`;
      props.addNewBeneficiaryAction({
        //address: [''],
        merchantId: merchantId, // hardcoded for now
        beneAction: 'ADD',
        beneType: 'V',
        modificationStatus: 'SUBMIT',
        paymentType: formik.values.vpa ? 'UPI' : 'OTHR', // UPI for upiHandle else OTHR so that all types of beneficiaries can be created in backend
        bankName: formik.values.bankName,
        ifscCode: formik.values.ifscCode,
        mobileNo: rawPhone,
        beneName: formik.values.name,
        beneAccountNo: formik.values.accountNumber,
        emailId: formik.values.email,
        upiHandle: formik.values.vpa,
      });
    },
  });

  const enableSubmitButton = () => {
    return formik.values.name.length > 0 &&
      formik.values.email.length > 0 &&
      formik.values.phone.length > 0 &&
      formik.values.vpa.length > 0
      ? true
      : formik.values.bankName.length > 0 &&
          formik.values.accountNumber.length > 0 &&
          formik.values.repeatAccountNumber.length > 0 &&
          formik.values.ifscCode.length > 0;
  };

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className='content'>
          <h2 className='title'>Add Beneficiary</h2>
          <p className='description'>
            Please fill the following details to proceed.
          </p>

          <CustomModalRow
            label='Beneficiary Name'
            value={
              <TextInput
                id='name'
                placeholder='Enter a Name'
                //label='Full Name'
                name='name'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.name && formik.errors.name)}
                errorMessage={formik.errors.name}
                value={formik.values.name}
                maxlength={40}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Beneficiary Email ID'
            value={
              <TextInput
                id='email'
                placeholder={'Enter Email'}
                name='email'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                errorMessage={formik.errors.email}
                value={formik.values.email}
                maxlength={64}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Beneficiary Mobile No'
            value={
              <DialCodePhoneInput
                id='phone'
                placeholder='Enter your mobile no.'
                name='phone'
                handleChange={(value, data) => {
                  setSelectedCountry(data.name);
                  setDialCode(data.dialCode);
                  formik.setFieldValue('phone', value);
                }}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                errorMessage={formik.errors.phone}
                value={formik.values.phone}
                inputProps={{
                  name: 'phone',
                }}
                country={'in'}
                onlyCountries={['in']}
                masks={{ in: '..........' }}
                countryCodeEditable={false}
              />
            }
            isRequired
          />

          <CustomModalRow
            label={'Create beneficiary with'}
            value={
              <CustomRadioGroup
                options={[
                  { label: 'Bank Details', value: 'bankDetails' },
                  { label: 'VPA', value: 'upiHandle' },
                ]}
                groupType='inline'
                value={beneficiaryWith}
                onChange={(value: string) => {
                  setBeneficiaryWith(value);
                }}
                labelClassName='radio-label'
              />
            }
            isRequired
          />
          {beneficiaryWith === 'bankDetails' && (
            <>
              <CustomModalRow
                label='Bank Name'
                value={
                  <TextInput
                    id='bankName'
                    placeholder='Enter bank Name'
                    name='bankName'
                    handleChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.bankName && formik.errors.bankName
                    )}
                    errorMessage={formik.errors.bankName}
                    value={formik.values.bankName}
                    maxlength={128}
                  />
                }
                isRequired
              />

              <CustomModalRow
                label='Account Number'
                value={
                  <TextInput
                    id='bankName'
                    placeholder='Enter account no'
                    name='accountNumber'
                    handleChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.accountNumber &&
                        formik.errors.accountNumber
                    )}
                    errorMessage={formik.errors.accountNumber}
                    value={formik.values.accountNumber}
                    maxlength={32}
                  />
                }
                isRequired
              />

              <CustomModalRow
                label='Repeat Account Number'
                value={
                  <TextInput
                    id='repeatAccountNumber'
                    placeholder='Confirm account no.'
                    //label='Full Name'
                    name='repeatAccountNumber'
                    handleChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(
                      formik.touched.repeatAccountNumber &&
                        formik.errors.repeatAccountNumber
                    )}
                    errorMessage={formik.errors.repeatAccountNumber}
                    value={formik.values.repeatAccountNumber}
                    maxlength={32}
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
                    //label='Full Name'
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
            </>
          )}

          {beneficiaryWith === 'upiHandle' && (
            <CustomModalRow
              label='VPA'
              value={
                <TextInput
                  id='vpa'
                  placeholder='Enter VPA'
                  //label='Full Name'
                  name='vpa'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.vpa && formik.errors.vpa)}
                  errorMessage={formik.errors.vpa}
                  value={formik.values.vpa}
                  maxlength={128}
                />
              }
              isRequired
            />
          )}
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
            label='Add Beneficiary'
            btnStyleType='primary'
            btnStyleClass='primary-button'
            onClick={() => {}}
            type='submit'
            enable={enableSubmitButton()}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

const AddBeneficiaryModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        onBackdropClick={() => props.closeModal()}
      />
    </React.Fragment>
  );
};

export default AddBeneficiaryModal;
