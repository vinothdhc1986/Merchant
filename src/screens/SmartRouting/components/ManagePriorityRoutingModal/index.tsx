import React, { FC, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'components/Select';
import Button from 'components/Button';
import FilterModal from 'components/Modal';
import { PREFERENCE_SCORE_TYPE } from '../../components/PreferenceScoreTab/constants';
import { toPascal } from 'lib/helper';
import { twoDigitAfterDecimalValidationRegex } from 'lib/constants';
import managePriorityRoutingProps from './typing';

const RenderModalBody: FC<managePriorityRoutingProps> = (
  props
): JSX.Element => {
  const { payload } = props;
  const formik = useFormik({
    initialValues: {
      gateway: '',
      preferenceScore: '',
      titleValue: '',
    },
    validationSchema: Yup.object({
      gateway: Yup.string(),
      preferenceScore: Yup.string(),
      titleValue:
        props.payload.type === 'bin'
          ? Yup.string().length(6, 'Invalid BIN')
          : Yup.string(),
    }),
    onSubmit: (values) => {
      props.handleSave({
        titleValue: values.titleValue,
        gateway: values.gateway,
        preferenceScore: values.preferenceScore,
        type: props.payload.type,
        mode: props.payload.mode,
        isUpdated: Boolean(props.payload.mode === 'edit'),
      });
    },
  });

  const titleLabel = useMemo((): string => {
    switch (payload.type) {
      case PREFERENCE_SCORE_TYPE.bin:
        return 'BIN Value';
      case PREFERENCE_SCORE_TYPE.issuer:
        return 'Issuer';
      case PREFERENCE_SCORE_TYPE.card:
        return 'Card Brand';
      case PREFERENCE_SCORE_TYPE.transaction:
        return 'Transaction Type';
      default:
        return '';
    }
  }, [payload.type.toString()]);

  useEffect(() => {
    if (payload.mode === 'edit') {
      formik.setValues({
        gateway: payload.gateway,
        preferenceScore: payload.preferenceScore,
        titleValue: payload.titleValue,
      });
    }
  }, []);

  const handleCancel = () => {
    props.handleCancel();
  };
  const handleChange = (value: string, name: string) => {
    formik.setFieldValue(name, value);
  };

  const handlePreferenceInputChange = (e) => {
    if (
      twoDigitAfterDecimalValidationRegex.test(e.target.value) &&
      parseFloat(e.target.value) <= 2 &&
      parseFloat(e.target.value) >= 0
    )
      formik.setFieldValue('preferenceScore', e.target.value);
    if (e.target.value === '')
      formik.setFieldValue('preferenceScore', e.target.value);
  };

  const handleBinValueChange = (e) => {
    if (
      (!isNaN(e.target.value) && e.target.value <= 999999) ||
      e.target.value === ''
    )
      formik.setFieldValue('titleValue', e.target.value.trim());
  };

  const getTitleOptions = (type) => {
    switch (type) {
      case 'issuer':
        return (
          props.issuerNames.map((item) => ({ label: item, value: item })) || []
        );
      case 'card':
        return (
          props.cardBrandNames.map((item) => ({ label: item, value: item })) ||
          []
        );
      default:
        return [];
    }
  };

  const getTitleComponent = (type: string): JSX.Element => {
    if (type === PREFERENCE_SCORE_TYPE.bin) {
      return (
        <div className='value-box'>
          <input
            type='text'
            value={formik.values.titleValue}
            placeholder='Value'
            onChange={handleBinValueChange}
            onBlur={formik.handleBlur}
            name='titleValue'
            className='form-control'
            disabled={payload.mode === 'edit'}
          />
          {formik.touched.titleValue && formik.errors.titleValue && (
            <div className='error'>{formik.errors.titleValue}</div>
          )}
        </div>
      );
    }
    return (
      <Select
        onChange={(value) => handleChange(value, 'titleValue')}
        optionList={getTitleOptions(props.payload.type)}
        placeholder='Select'
        value={formik.values.titleValue || undefined}
        disabled={payload.mode === 'edit'}
        wrapperClass='gateway-list-dropdown'
        parentId='preference-score-modal-body'
      />
    );
  };

  return (
    <div className='manage-priority-modal'>
      <h3>
        {toPascal(payload.mode)} {toPascal(payload.type)} Type Routing
      </h3>
      {/* <p>Some description</p> */}
      <div className='modal-body' id='preference-score-modal-body'>
        <form onSubmit={formik.handleSubmit}>
          <div className='filter-row'>
            <label>{titleLabel}</label>
            {getTitleComponent(payload.type)}
          </div>
          <div className='filter-row'>
            <label>Gateway</label>
            <Select
              onChange={(value) => handleChange(value, 'gateway')}
              optionList={props.gatewayNames}
              placeholder='Gateway'
              value={formik.values.gateway || undefined}
              disabled={payload.mode === 'edit'}
              wrapperClass='gateway-list-dropdown'
              parentId='preference-score-modal-body'
            />
          </div>
          <div className='filter-row'>
            <label>Preference Score</label>
            <div className='value-box'>
              <input
                type='text'
                value={formik.values.preferenceScore}
                placeholder='Preference Score'
                name='preferenceScore'
                onChange={handlePreferenceInputChange}
                onBlur={formik.handleBlur}
                className='form-control'
              />
            </div>
          </div>
          <p>
            Preference Score should be from 0 to 2 with maximum allowable
            decimal up to two digits.
          </p>
          <div className='action-button text-right'>
            <Button
              btnStyleClass='secondry-button'
              onClick={handleCancel}
              label='Cancel'
              enable
            />
            <Button
              btnStyleClass='primary-button'
              // onClick={handleCancel}
              label='Save Changes'
              type='submit'
              enable={Boolean(
                formik.values.gateway &&
                  formik.values.preferenceScore &&
                  formik.values.titleValue
              )}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const ManagePriorityRoutingModal: FC<managePriorityRoutingProps> = (
  props
): JSX.Element => {
  return (
    <FilterModal
      ModalBody={RenderModalBody}
      modalBodyProps={{ ...props }}
      onBackdropClick={() => props.handleCancel()}
    />
  );
};

export default React.memo(ManagePriorityRoutingModal);
