import React, { FC, useState, useMemo, useEffect } from 'react';
import { Row, Col } from 'antd/lib/grid';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import TextInput from 'components/TextInput';
import DateTimePicker from 'components/DateTimePicker';
import CustomSwitch from 'components/CustomSwitch';
import Checkbox from 'components/Checkbox';
import Button from 'components/Button';
import {
  createPaymentLinkAction,
  clearCreatePaymentLinkAction,
} from 'redux/actions/paymentLinks';
import notify from 'lib/notifiy';
import { formatToIST, getMerchantIdFromStore } from 'lib/helper';
import {
  phoneValidationRegex,
  emailValidationRegex,
  twoDigitAfterDecimalValidationRegex,
  noWhiteSpaceStringValidationRegex,
  DEFAULT_VALIDATION_ERROR,
  numericValidationRegex,
  alphaNumericWithHashHyphenRegex,
  alphaNumericWithHashHyphenRegexWithSpace,
} from 'lib/constants';
import {
  PAYMENT_LINK_PAYMENT_MODE_CSV,
  CREATE_PAYMENT_LINK_AMOUNT_RANGE,
} from 'screens/PaymentLinks/constants';
import imgURL from 'lib/imgURL';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';
import './styles.scss';

const CreatePaymentLinkSideModalBody: FC<Props> = (props): JSX.Element => {
  const { validationErrors } = props;

  const [showExpiryDatePicker, setShowExpiryDatePicker] = useState(false);
  const [showScheduleDatePicker, setShowScheduleDatePicker] = useState(false);

  const formik = useFormik({
    initialValues: {
      Amount: '',
      invoiceNo: '',
      productDescription: '',
      productCode: '',
      email: '',
      mobile: '',
      linkExpiryDateTime: new Date(
        new Date().setDate(new Date().getDate() + 1)
      ),
      isPaymentLinkScheduled: false,
      linkScheduleDateTime: new Date(),
      isPartialPaymentEnabled: false,
    },
    validationSchema: Yup.object().shape(
      {
        Amount: Yup.number()
          .min(CREATE_PAYMENT_LINK_AMOUNT_RANGE.min)
          .max(CREATE_PAYMENT_LINK_AMOUNT_RANGE.max)
          .required(
            validationErrors?.REQUIRED_FIELD ?? DEFAULT_VALIDATION_ERROR
          ),
        invoiceNo: Yup.string().required(
          validationErrors?.REQUIRED_FIELD ?? DEFAULT_VALIDATION_ERROR
        ),
        productDescription: Yup.string()
          .required(
            validationErrors?.REQUIRED_FIELD ?? DEFAULT_VALIDATION_ERROR
          )
          .trim(),
        productCode: Yup.string(),
        email: Yup.string()
          .matches(
            emailValidationRegex,
            validationErrors?.INVALID_EMAIL ?? DEFAULT_VALIDATION_ERROR
          )
          .trim()
          .when('mobile', {
            is: (mobile) => !mobile,
            then: Yup.string().required(
              validationErrors?.REQUIRED_FIELD ?? DEFAULT_VALIDATION_ERROR
            ),
            otherwise: Yup.string(),
          }),
        mobile: Yup.string()
          .matches(
            phoneValidationRegex,
            validationErrors?.INVALID_PHONE ?? DEFAULT_VALIDATION_ERROR
          )
          .when('email', {
            is: (email) => !email,
            then: Yup.string().required(
              validationErrors?.REQUIRED_FIELD ?? DEFAULT_VALIDATION_ERROR
            ),
            otherwise: Yup.string(),
          }),
        linkExpiryDateTime: Yup.date(),
        linkScheduleDateTime: Yup.date(),
      },
      [['mobile', 'email']]
    ),
    onSubmit: (values) => {
      const payload = {
        InvoiceNo: values.invoiceNo,
        MerchantId: getMerchantIdFromStore(),
        PaymentModeCSV: PAYMENT_LINK_PAYMENT_MODE_CSV,
        AmountInRupees: parseFloat(values.Amount),
        ProductDescription: values.productDescription.trim(),
        UrlExpiryDatetTime: formatToIST(values.linkExpiryDateTime),
        IsPartialPaymentEnabled: values.isPartialPaymentEnabled,
      };
      if (values.mobile) {
        payload['PayerMobileNo'] = values.mobile;
      }
      if (values.email) {
        payload['PayerEmailId'] = values.email.trim();
      }
      if (values.productCode) {
        payload['ProductCodes'] = [
          {
            Amount: parseFloat(values.Amount),
            ProductCode: values.productCode,
          },
        ];
      }
      if (values.isPaymentLinkScheduled) {
        payload['scheduleLink'] = formatToIST(values.linkScheduleDateTime);
      }
      props.createPaymentLinkAction({
        ...payload,
      });
    },
  });

  const handleRegexInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    regex: RegExp
  ) => {
    if (regex.test(e.target.value) || e.target.value === '') {
      formik.setFieldValue(e.target.name, e.target.value);
    }
  };

  const dateValidationError = useMemo(() => {
    if (formik.values.linkExpiryDateTime < new Date()) {
      return (
        validationErrors?.PAYMENT_LINK_EXPIRY_DATE_TIME_VALIDATION ??
        DEFAULT_VALIDATION_ERROR
      );
    } else if (
      formik.values.isPaymentLinkScheduled &&
      formik.values.linkScheduleDateTime >= formik.values.linkExpiryDateTime
    ) {
      return (
        validationErrors?.PAYMENT_LINK_DATE_TIME_RANGE ??
        DEFAULT_VALIDATION_ERROR
      );
    }
    return '';
  }, [
    formik.values.linkExpiryDateTime,
    formik.values.linkScheduleDateTime,
    formik.values.isPaymentLinkScheduled,
  ]);

  useEffect(() => {
    return () => {
      props.clearCreatePaymentLinkAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, responseMessage } =
      props.createPaymentLinkState;
    if (isSuccess) {
      if (!props.isAdmin)
        pushClevertapEvent(
          clevertapEventConfigList.PAYMENT_LINK_CREATED_INDIVIDUAL
        );
      notify({
        message: 'Success',
        description: validationErrors?.PAYMENT_LINK_CREATED_SUCCESSFULLY,
        type: 'success',
      });
      props.handleClose();
      props.handleRefreshListing();
    } else if (isFailure) {
      notify({
        message: 'Failure',
        description: responseMessage,
        type: 'error',
      });
    }
  }, [props.createPaymentLinkState]);

  return (
    <div
      className='plan-form create-payment-link-modal-body'
      id='create-payment-link'
    >
      <form onSubmit={formik.handleSubmit}>
        <div className='two-col'>
          <Row gutter={8}>
            <Col span={12}>
              <div className='form-group'>
                <label>
                  Amount (INR)<em>*</em>
                </label>
                <TextInput
                  type='text'
                  value={formik.values.Amount}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(
                      e,
                      twoDigitAfterDecimalValidationRegex
                    )
                  }
                  onBlur={formik.handleBlur}
                  name='Amount'
                  error={Boolean(formik.touched.Amount && formik.errors.Amount)}
                  errorMessage={formik.errors.Amount}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>
                  Invoice No<em>*</em>
                </label>
                <TextInput
                  type='text'
                  value={formik.values.invoiceNo}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(e, alphaNumericWithHashHyphenRegex)
                  }
                  onBlur={formik.handleBlur}
                  name='invoiceNo'
                  error={Boolean(
                    formik.touched.invoiceNo && formik.errors.invoiceNo
                  )}
                  errorMessage={formik.errors.invoiceNo}
                  maxlength={16}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>
                  Product Description<em>*</em>
                </label>
                <TextInput
                  type='text'
                  value={formik.values.productDescription}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(
                      e,
                      alphaNumericWithHashHyphenRegexWithSpace
                    )
                  }
                  onBlur={formik.handleBlur}
                  name='productDescription'
                  error={Boolean(
                    formik.touched.productDescription &&
                      formik.errors.productDescription
                  )}
                  errorMessage={formik.errors.productDescription}
                  maxlength={2048}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>Product Code/SKU</label>
                <TextInput
                  type='text'
                  value={formik.values.productCode}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(e, alphaNumericWithHashHyphenRegex)
                  }
                  onBlur={formik.handleBlur}
                  name='productCode'
                  error={Boolean(
                    formik.touched.productCode && formik.errors.productCode
                  )}
                  errorMessage={formik.errors.productCode}
                  maxlength={16}
                />
              </div>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={12}>
              <div className='form-group margin-botton-5'>
                <label>Customer Email ID</label>
                <TextInput
                  type='text'
                  value={formik.values.email}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(e, noWhiteSpaceStringValidationRegex)
                  }
                  onBlur={formik.handleBlur}
                  name='email'
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  errorMessage={
                    formik.errors.email === validationErrors?.REQUIRED_FIELD
                      ? ''
                      : formik.errors.email
                  }
                  maxlength={50}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group margin-botton-5'>
                <label>Customer Mobile No</label>
                <TextInput
                  type='text'
                  value={formik.values.mobile}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={(e) =>
                    handleRegexInputChange(e, numericValidationRegex)
                  }
                  onBlur={formik.handleBlur}
                  maxlength={10}
                  name='mobile'
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                  errorMessage={
                    formik.errors.mobile === validationErrors?.REQUIRED_FIELD
                      ? ''
                      : formik.errors.mobile
                  }
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className='two-col'></div>

        <p className='desclaimer'>
          Customer Email ID or Customer Mobile No is mandatory
        </p>

        <Checkbox
          handleChange={(e) => {
            formik.setFieldValue('isPaymentLinkScheduled', e.target.checked);
          }}
          label='Schedule Link'
          id='scheduled'
          checked={formik.values.isPaymentLinkScheduled}
        />

        <div className='margin-top-15'>
          <Row gutter={8}>
            <Col span={12}>
              <div className='schedule-date-picker-wrapper'>
                <DateTimePicker
                  onVisibleChange={(show) =>
                    setShowScheduleDatePicker(
                      show && formik.values.isPaymentLinkScheduled
                    )
                  }
                  visible={showScheduleDatePicker}
                  value={new Date(formik.values.linkScheduleDateTime)}
                  placement='topLeft'
                  handleDateChange={(date) => {
                    formik.setFieldValue('linkScheduleDateTime', date);
                  }}
                  minDate={new Date()}
                  parentId={'create-payment-link'}
                >
                  <div
                    className={`form-control calnderInput ${
                      formik.values.isPaymentLinkScheduled
                        ? ''
                        : 'schedule-date-picker-disable'
                    }`}
                  >
                    {
                      <React.Fragment>
                        {formik.values.isPaymentLinkScheduled
                          ? format(
                              formik.values.linkScheduleDateTime,
                              'dd/MM/yyyy hh:mm:ss a'
                            )
                          : 'Select Link Schedule Date'}
                        <img src={imgURL['grey-calendar-icon']} />
                      </React.Fragment>
                    }
                  </div>
                </DateTimePicker>
              </div>
            </Col>
          </Row>
        </div>
        <Row gutter={8}>
          <Col span={12}>
            <div className='form-group expiry-date-picker-wrapper'>
              <label>
                Link Expiry Time<em>*</em>
              </label>
              <DateTimePicker
                onVisibleChange={(show) => setShowExpiryDatePicker(show)}
                visible={showExpiryDatePicker}
                value={new Date(formik.values.linkExpiryDateTime)}
                placement='topLeft'
                handleDateChange={(date) => {
                  formik.setFieldValue('linkExpiryDateTime', date);
                }}
                minDate={
                  formik.values.isPaymentLinkScheduled
                    ? formik.values.linkScheduleDateTime
                    : new Date()
                }
                parentId='create-payment-link'
              >
                <div className='form-control calnderInput'>
                  {
                    <React.Fragment>
                      {format(
                        formik.values.linkExpiryDateTime,
                        'dd/MM/yyyy hh:mm:ss a'
                      )}
                      <img src={imgURL['grey-calendar-icon']} />
                    </React.Fragment>
                  }
                </div>
              </DateTimePicker>
            </div>
          </Col>
          {dateValidationError && (
            <div className='link-expiry-date-validation-error error'>
              {dateValidationError}
            </div>
          )}
        </Row>
        <div className='partial-payment-switch-wrapper'>
          <CustomSwitch
            label='Accept Payment in Parts'
            onChange={(checked: boolean) =>
              formik.setFieldValue('isPartialPaymentEnabled', checked)
            }
            checked={formik.values.isPartialPaymentEnabled}
          />
        </div>
        <div className='form-group action-button'>
          <Button
            label='Create Payment Link'
            type='submit'
            enable={!dateValidationError}
            btnStyleClass='primary-button create-payment-submit'
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({
  paymentLinksReducer,
  validationReducer,
  loginReducer,
}) => ({
  createPaymentLinkState: paymentLinksReducer.createPaymentLinkState,
  validationErrors: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  createPaymentLinkAction,
  clearCreatePaymentLinkAction,
})(CreatePaymentLinkSideModalBody);
