import React, { FC, useState } from 'react';
import { Row, Col } from 'antd/lib/grid';
import TextInput from 'components/TextInput';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
import { format } from 'date-fns';
import { phoneValidationRegex, emailValidationRegex } from 'lib/constants';
import './styles.scss';
import Button from 'components/Button';
import Props from './typing';
import DateTimePicker from 'components/DateTimePicker';
import imgURL from 'lib/imgURL';

const CreatePaymentLinkSideModalBody: FC<Props> = (props): JSX.Element => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      amount: '',
      invoiceNo: '',
      productDescription: '',
      productCode: '',
      transactionType: '',
      brandEmiProductCode: '',
      email: '',
      mobile: '',
      linkExpiryDateTime: new Date(),
    },
    validationSchema: Yup.object({
      amount: Yup.number().required('This is a required field'),
      invoiceNo: Yup.string().required('This is a required field'),
      productDescription: Yup.string().required('This is a required field'),
      productCode: Yup.string().required('This is a required field'),
      transactionType: Yup.string(),
      brandEmiProductCode: Yup.string(),
      email: Yup.string().matches(
        emailValidationRegex,
        'Please enter a valid email'
      ),
      mobile: Yup.string().matches(
        phoneValidationRegex,
        'Please enter a valid mobile number'
      ),
    }),
    onSubmit: () => {
      props.handleClose();
    },
  });
  return (
    <div className='plan-form create-payment-link-modal-body'>
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
                  value={formik.values.amount}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='amount'
                  error={Boolean(formik.touched.amount && formik.errors.amount)}
                  errorMessage={formik.errors.amount}
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
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='invoiceNo'
                  error={Boolean(
                    formik.touched.invoiceNo && formik.errors.invoiceNo
                  )}
                  errorMessage={formik.errors.invoiceNo}
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
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='productDescription'
                  error={Boolean(
                    formik.touched.productDescription &&
                      formik.errors.productDescription
                  )}
                  errorMessage={formik.errors.productDescription}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>
                  Product Code/SKU<em>*</em>
                </label>
                <TextInput
                  type='text'
                  value={formik.values.productCode}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='productCode'
                  error={Boolean(
                    formik.touched.productCode && formik.errors.productCode
                  )}
                  errorMessage={formik.errors.productCode}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>Transaction Type</label>
                <div className='filter-dropdown'>
                  <Select
                    onChange={() => {}}
                    optionList={[
                      { label: 'Transaction Type', value: 'TRANSACTION_TYPE' },
                      { label: 'Non EMI', value: 'NON_EMI' },
                    ]}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>Brand EMI Product Code </label>
                <TextInput
                  type='text'
                  value={formik.values.brandEmiProductCode}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='brandEmiProductCode'
                  error={Boolean(
                    formik.touched.brandEmiProductCode &&
                      formik.errors.brandEmiProductCode
                  )}
                  errorMessage={formik.errors.brandEmiProductCode}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>Customer Email ID</label>
                <TextInput
                  type='text'
                  value={formik.values.email}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='email'
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  errorMessage={formik.errors.email}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className='form-group'>
                <label>Customer Mobile No</label>
                <TextInput
                  type='text'
                  value={formik.values.mobile}
                  placeholder=''
                  formGroupClassName='margin-bottom-unset'
                  handleChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name='mobile'
                  error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                  errorMessage={formik.errors.mobile}
                />
              </div>
            </Col>
          </Row>
        </div>

        <div className='two-col'></div>

        <p className='desclaimer'>
          Customer Email ID or Customer Mobile No is mandatory
        </p>

        <Checkbox handleChange={() => {}} label='Scheduled' id='scheduled' />

        <div className='margin-top-15'>
          <Row gutter={8}>
            <Col span={12}>
              <div className='form-group'>
                <Select
                  onChange={() => {}}
                  optionList={[
                    { label: 'Select Link Expiry Date', value: '1' },
                    { label: 'Select Link Expiry Date', value: '2' },
                  ]}
                  placeholder=''
                />
              </div>
            </Col>
          </Row>
        </div>
        <Row gutter={8}>
          <Col span={12}>
            <div className='form-group'>
              <label>
                Link Expiry Time<em>*</em>
              </label>
              <DateTimePicker
                onVisibleChange={(show) => setShowDatePicker(show)}
                visible={showDatePicker}
                value={new Date(formik.values.linkExpiryDateTime)}
                placement='topLeft'
                handleDateChange={(date) => {
                  formik.setFieldValue('linkExpiryDateTime', date);
                }}
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
        </Row>
        <div className='form-group action-button'>
          <Button
            label='Create Payment Link'
            type='submit'
            enable
            btnStyleClass='primary-button create-payment-submit'
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentLinkSideModalBody;
