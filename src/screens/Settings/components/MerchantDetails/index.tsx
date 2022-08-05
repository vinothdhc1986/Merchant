import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import DialCodePhoneInput from '../../../../components/DialCodePhoneInput';
import Select from '../../../../components/Select';
import Button from '../../../../components/Button';
import CustomModalRow from '../../../../components/CustomModalRow';
import {
  ENTITY_TYPE_OPTIONS,
  KYC_STATUS_OPTIONS,
  initFormData,
  INIT_DIAL_CODE,
} from './constant';
import notify from '../../../../lib/notifiy';
import TextInput from '../../../../components/TextInput';
import Textarea from '../../../../components/Textarea';
import {
  nameValidationRegex,
  emailValidationRegex,
  phoneValidationRegex,
  PANValidationRegex,
} from '../../../../lib/constants';
import {
  getMerchantKycEntityTypesListAction,
  clearGetMerchantKycEntityTypesListAction,
  getMerchantKycDetailsAction,
  clearGetMerchantKycDetailsAction,
  updateMerchantKycDetailsAction,
  clearUpdateMerchantKycDetailsAction,
} from '../../../../redux/actions/payouts';
import { Props } from './typing';
import './styles.scss';

const MerchantDetails: FC<Props> = (props): JSX.Element => {
  const { validationErrors } = props;
  const [dialCode, setDialCode] = useState(INIT_DIAL_CODE);

  const formik = useFormik({
    initialValues: { ...initFormData },
    validationSchema: Yup.object({
      businessName: Yup.string()
        .matches(nameValidationRegex, validationErrors.ONLY_ALPHABETS_ALLOWED)
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      businessPan: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(PANValidationRegex, validationErrors.INVALID_PAN)
        .trim(),
      merchantId: Yup.string().required(validationErrors.REQUIRED_FIELD).trim(),
      contactNumber: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .matches(phoneValidationRegex, validationErrors.INVALID_PHONE),
      email: Yup.string()
        .matches(emailValidationRegex, validationErrors.INVALID_EMAIL)
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      taxInformation: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      billingAddress: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      kycDocuments: Yup.string()
        .required(validationErrors.REQUIRED_FIELD)
        .trim(),
      entityType: Yup.string().required(validationErrors.REQUIRED_FIELD).trim(),
      kycStatus: Yup.string().required(validationErrors.REQUIRED_FIELD).trim(),
    }),
    onSubmit: (values) => {
      props.updateMerchantKycDetailsAction({
        ...values,
        id: props.getMerchantKycDetailsState.data?.id ?? null,
      });
    },
  });

  const isSubmitBtnEnable = () => {
    return (
      Object.values(formik.values).every((item) => !!item) &&
      !Object.values(formik.errors).length
    );
  };

  useEffect(() => {
    props.getMerchantKycEntityTypesListAction();
    props.getMerchantKycDetailsAction({
      merchantId: props.merchantId,
    });
    formik.setValues({
      ...formik.values,
      merchantId: props.merchantId,
      email: props.merchantEmailId,
      businessName: props.merchantName,
    });
    return () => {
      props.clearGetMerchantKycEntityTypesListAction();
      props.clearGetMerchantKycDetailsAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, errorCode, errorMessage, data } =
      props.getMerchantKycDetailsState;
    if (isSuccess) {
      formik.setValues({
        ...formik.values,
        businessName: data?.businessName,
        businessPan: data?.businessPan,
        merchantId: data?.merchantId,
        contactNumber: data?.contactNumber,
        email: data?.email,
        taxInformation: data?.taxInformation,
        billingAddress: data?.billingAddress,
        kycDocuments: data?.kycDocuments,
        entityType: data?.entityType,
        kycStatus: data?.kycStatus,
      });
    }
    // errorCode = 500201, when kyc doesn't exist for this merchant
    if (isFailure && errorCode !== '500201') {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage || validationErrors.SOMETHING_WENT_WRONG,
      });
    }
  }, [props.getMerchantKycDetailsState]);

  useEffect(() => {
    const { isSuccess, isFailure, successMessage, errorMessage } =
      props.updateMerchantKycDetailsState;
    if (isSuccess) {
      notify({
        type: 'success',
        message: 'Success',
        description:
          successMessage ||
          `Record ${
            props.getMerchantKycDetailsState.data?.id ? 'updated' : 'created'
          } successfully.`,
      });
      props.clearUpdateMerchantKycDetailsAction();
    }
    if (isFailure) {
      notify({
        type: 'error',
        message: 'Failure',
        description: errorMessage || validationErrors.SOMETHING_WENT_WRONG,
      });
      props.clearUpdateMerchantKycDetailsAction();
    }
  }, [props.updateMerchantKycDetailsState]);

  return (
    <div className='merchant-details-section'>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-container'>
          <h2>Merchant Details</h2>
          <CustomModalRow
            label='Business Name'
            value={
              <TextInput
                id='businessName'
                placeholder='Enter a Business Name'
                name='businessName'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.businessName && formik.errors.businessName
                )}
                errorMessage={formik.errors.businessName}
                value={formik.values.businessName}
                maxlength={100}
                readonly
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Entity Type'
            value={
              <Select
                onChange={(value) => formik.setFieldValue('entityType', value)}
                optionList={[
                  ...ENTITY_TYPE_OPTIONS,
                  ...props.kycEntityTypesList.map((item) => ({
                    label: item.description,
                    value: item.name,
                  })),
                ]}
                defaultValue={ENTITY_TYPE_OPTIONS[0].label}
                bordered={false}
                value={formik.values.entityType}
                wrapperClass={'entity-filter-wrapper'}
                error={Boolean(
                  formik.touched.entityType && formik.errors.entityType
                )}
                errorMessage={formik.errors.entityType}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='KYC Documents'
            value={
              <Textarea
                id='kycDocuments'
                placeholder='Enter KYC Documents'
                name='kycDocuments'
                value={formik.values.kycDocuments}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={5}
                maxlength={100}
                cols={5}
                error={Boolean(
                  formik.touched.kycDocuments && formik.errors.kycDocuments
                )}
                errorMessage={formik.errors.kycDocuments}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='KYC Status'
            value={
              <>
                <Select
                  onChange={(value) => formik.setFieldValue('kycStatus', value)}
                  optionList={KYC_STATUS_OPTIONS}
                  defaultValue={KYC_STATUS_OPTIONS[0].label}
                  bordered={false}
                  value={formik.values.kycStatus}
                  wrapperClass={'KYC-filter-wrapper'}
                  error={Boolean(
                    formik.touched.kycStatus && formik.errors.kycStatus
                  )}
                  errorMessage={formik.errors.kycStatus}
                />
              </>
            }
            isRequired
          />

          <CustomModalRow
            label='Business PAN'
            value={
              <TextInput
                id='businessPan'
                placeholder='Enter a Business Name'
                name='businessPan'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.businessPan && formik.errors.businessPan
                )}
                errorMessage={formik.errors.businessPan}
                value={formik.values.businessPan}
                maxlength={40}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Merchant ID'
            value={
              <TextInput
                id='merchantId'
                placeholder='Enter a Business Name'
                name='merchantId'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.merchantId && formik.errors.merchantId
                )}
                errorMessage={formik.errors.merchantId}
                value={formik.values.merchantId}
                maxlength={32}
                readonly
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Contact Number'
            value={
              <DialCodePhoneInput
                id='phone'
                placeholder='Enter Contact Number'
                name='contactNumber'
                handleChange={(value, data) => {
                  setDialCode(data.dialCode);
                  formik.setFieldValue('contactNumber', value.slice(2));
                }}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.contactNumber && formik.errors.contactNumber
                )}
                errorMessage={formik.errors.contactNumber}
                value={`${dialCode}${formik.values.contactNumber}`}
                inputProps={{
                  name: 'contactNumber',
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
            label='Email ID'
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
                readonly
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Tax Information'
            value={
              <TextInput
                id='taxInformation'
                placeholder={'Enter Tax Information'}
                name='taxInformation'
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.taxInformation && formik.errors.taxInformation
                )}
                errorMessage={formik.errors.taxInformation}
                value={formik.values.taxInformation}
                maxlength={64}
              />
            }
            isRequired
          />

          <CustomModalRow
            label='Billing Address'
            value={
              <Textarea
                id='billingAddress'
                placeholder='Enter Billing Address'
                name='billingAddress'
                value={formik.values.billingAddress}
                handleChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={5}
                maxlength={150}
                cols={5}
                error={Boolean(
                  formik.touched.billingAddress && formik.errors.billingAddress
                )}
                errorMessage={formik.errors.billingAddress}
              />
            }
            isRequired
          />
        </div>
        <div className='btns-container'>
          <Button
            label='Discard Changes'
            btnStyleType='secondary'
            btnStyleClass='secondry-button'
            onClick={() => {
              formik.resetForm();
              formik.setFieldValue('contactNumber', '');
              setDialCode('');
            }}
            enable
          />
          <Button
            label='Save Changes'
            btnStyleType='primary'
            btnStyleClass='primary-button '
            onClick={() => {}}
            type='submit'
            enable={isSubmitBtnEnable()}
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({
  validationReducer,
  payoutsReducer,
  loginReducer,
}) => ({
  validationErrors: validationReducer.validationErrorState.validationErrors,
  kycEntityTypesList: payoutsReducer.merchantKycEntityTypesListState.data ?? [],
  getMerchantKycDetailsState: payoutsReducer.getMerchantKycDetailsState,
  merchantId: loginReducer.loginState.MerchantId,
  merchantName: loginReducer.loginState.merchantName,
  merchantEmailId: loginReducer.loginState.merchantEmailId,
  updateMerchantKycDetailsState: payoutsReducer.updateMerchantKycDetailsState,
});

export default connect(mapStateToProps, {
  getMerchantKycEntityTypesListAction,
  clearGetMerchantKycEntityTypesListAction,
  getMerchantKycDetailsAction,
  clearGetMerchantKycDetailsAction,
  updateMerchantKycDetailsAction,
  clearUpdateMerchantKycDetailsAction,
})(MerchantDetails);
