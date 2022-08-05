/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { FC, useEffect, useRef, useState } from 'react';
import superagent from 'superagent';
import Upload from 'antd/lib/upload';
import Progress from 'antd/lib/progress';
import store from 'redux/store';
import { connect } from 'react-redux';
import { downloadCsvAction } from 'redux/actions/downloadCsv';
import imgURL from '../../lib/imgURL';
import config from '../../config';
import Button from '../Button';
import Modal from '../Modal';
import notify from '../../lib/notifiy';
import { getMerchantIdFromStore } from '../../lib/helper';
import {
  alphaNumericWithHyphenUnderScoreValidationRegex,
  DEFAULT_API_ERROR,
} from 'lib/constants';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import { errorObjMapping } from './constants';
import Props, { API_CALL_STATE } from './typing';
import './style.scss';

const { Dragger } = Upload;

const RenderBulkModalBody: FC<Props> = (props): JSX.Element => {
  const authToken = store.getState().loginReducer.loginState.token;

  const merchantId = getMerchantIdFromStore();

  const { validationMessages } = props;
  const { closeModal, title } = props;

  const [fileList, setFileList] = useState<any>([]);
  const [progressPercent, setProgressPercent] = useState<any>(0);
  const [uploadErrorMsg, setFileUploadErrorMsg] = useState<string>('');
  const [apiCallState, setApiCallState] = useState<API_CALL_STATE>({
    isLoading: false,
    isSuccess: false,
    isFailure: false,
    errorCode: 0,
    data: {},
    errorMessage: '',
  });
  useEffect(() => {
    if (apiCallState.errorMessage) {
      setFileUploadErrorMsg(
        () =>
          errorObjMapping[apiCallState.errorCode] || apiCallState.errorMessage
      );
    }
  }, [apiCallState]);

  const dropzoneProps = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    beforeUpload: (file): boolean => {
      setFileUploadErrorMsg(() => '');
      const isCSV = file.name.includes('.csv');
      const isValidFileName = file.name
        .split('.')[0]
        .match(alphaNumericWithHyphenUnderScoreValidationRegex);
      if (!isCSV) {
        setFileUploadErrorMsg(() =>
          validationMessages?.INVALID_FILE_TYPE_CSV.replace(
            '${fileName}',
            file.name
          )
        );
      } else if (!isValidFileName) {
        setFileUploadErrorMsg(() => validationMessages?.INVALID_FILE_NAME);
      }
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', fileList[0]);
    if (props.baseURL === config.API.API_PAYOUTS_URL) {
      formData.append('merchantId', `${merchantId}`);
    }
    setApiCallState({
      isLoading: true,
      isSuccess: false,
      isFailure: false,
      data: {},
      errorCode: 0,
      errorMessage: '',
    });

    // API Call
    const request = superagent(
      'post',
      `${props.baseURL ? props.baseURL : config.API.API_BASE_URL}/${
        props.uploadCsvEndpoint
      }`
    );
    request
      .set('Authorization', `Bearer ${authToken}`)
      .send(formData)
      .on('progress', (e) => {
        e.percent >= 0 && setProgressPercent(e.percent);
      })
      .withCredentials()
      .query({
        sourceId: props.sourceId,
      })
      .then((response) => {
        const { body } = response;
        if (!props.isAdmin) {
          if (props.sourceId === 3)
            pushClevertapEvent(
              clevertapEventConfigList.PAYMENT_LINK_CREATED_BULK
            );
          if (props.sourceId === 2)
            pushClevertapEvent(
              clevertapEventConfigList.REFUND_BULK_UPLOAD_SUCCESS
            );
        }
        setApiCallState({
          isLoading: false,
          isSuccess: true,
          isFailure: false,
          data: body,
          errorCode: 0,
          errorMessage: '',
        });
        props.fetchListAfterUploadBulk && props.fetchListAfterUploadBulk();
      })
      .catch((error) => {
        if (error && error.response && error.response.body) {
          setApiCallState({
            isLoading: false,
            isSuccess: false,
            isFailure: true,
            data: {},
            errorCode:
              error?.response?.body?.error_code ||
              error?.response?.body?.errorCode ||
              '',
            errorMessage:
              error?.response?.body?.error_message ||
              error?.response?.body?.errorMessage ||
              '',
          });
        } else {
          notify({
            description: DEFAULT_API_ERROR,
            duration: 1,
            type: 'error',
            message: 'Error',
          });
        }
      });
  };

  return (
    <React.Fragment>
      <h3>{title}</h3>
      {props.baseURL === config.API.API_PAYOUTS_URL && (
        <p className='red'>
          <b>Note:</b> Make sure the pay date is in YYYY-MM-DD format.
        </p>
      )}
      <a
        onClick={() =>
          props.downloadCsvAction({
            url: `${props.baseURL ? props.baseURL : config.API.API_BASE_URL}/${
              props.downloadSampleCsvEndpoint
            }`,
            fileName: props.customFilename,
          })
        }
      >
        Click here to download the csv template.
      </a>

      <div className='modal-body'>
        <div className='bulk-upload'>
          <Dragger
            {...{
              ...dropzoneProps,
              disabled: apiCallState.isSuccess || apiCallState.isFailure,
            }}
          >
            {apiCallState.isLoading ||
            apiCallState.isSuccess ||
            apiCallState.isFailure ? (
              <div className='progress-bar-container'>
                <img
                  className='doc-thumbnail'
                  src={imgURL['doc-icon']}
                  alt='add-icon'
                />
                <span className='filename' title={fileList[0]?.name ?? ''}>
                  {fileList[0]?.name ?? ''}
                </span>
                <span className='progress-percent'>{`${Math.floor(
                  progressPercent
                )}%`}</span>
                <Progress
                  percent={progressPercent}
                  size='small'
                  showInfo={false}
                />
                <img
                  className='upload-cross-btn'
                  src={imgURL.cross}
                  alt='cross'
                />
              </div>
            ) : !uploadErrorMsg && fileList.length > 0 ? (
              <>
                <div>
                  <img
                    className='doc-thumbnail'
                    src={imgURL['doc-icon']}
                    alt='document'
                  />
                  <span>{fileList[0] && fileList[0].name}</span>
                </div>
                <a className='ant-upload-text'>Choose Another File</a>
              </>
            ) : (
              <>
                <p className='ant-upload-drag-icon'>
                  <img src={imgURL['add-icon']} alt='add-icon' />
                </p>
                <a className='ant-upload-text curser-pointer'>
                  Click or drag file to this area to upload
                </a>
                <p className='ant-upload-hint'>
                  Click here to choose a csv file
                </p>
              </>
            )}
          </Dragger>
          {!!uploadErrorMsg && fileList.length > 0 && (
            <div className='file-upload-error'>
              {uploadErrorMsg && uploadErrorMsg.split('_').join(' ')}
            </div>
          )}
          {apiCallState.isSuccess && (
            <div className='file-upload-success'>
              {`${
                apiCallState?.data?.totalRecords
                  ? apiCallState?.data?.totalRecords
                  : apiCallState?.data?.Total_rows_inserted
              } ${validationMessages.RECORDS_UPLOADED_SUCCESSFULLY}`}
            </div>
          )}
        </div>

        <div className='action-button text-right'>
          {apiCallState.isSuccess ? (
            <Button
              btnStyleClass='secondry-button'
              label='Close'
              onClick={closeModal}
              enable={true}
            />
          ) : (
            <>
              <Button
                btnStyleClass='secondry-button'
                label='Cancel'
                onClick={closeModal}
                enable={true}
              />
              {apiCallState.isFailure ? (
                <Button
                  btnStyleClass='primary-button'
                  label='Upload Again'
                  onClick={() => {
                    setFileList([]);
                    setProgressPercent(0);
                    setFileUploadErrorMsg('');
                    setApiCallState({
                      isLoading: false,
                      isSuccess: false,
                      isFailure: false,
                      errorCode: 0,
                      data: {},
                      errorMessage: '',
                    });
                  }}
                  enable={true}
                />
              ) : (
                <Button
                  btnStyleClass='primary-button'
                  label='Upload'
                  onClick={() => {
                    handleUpload();
                  }}
                  enable={
                    !uploadErrorMsg &&
                    fileList.length > 0 &&
                    !apiCallState.isLoading
                  }
                />
              )}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const BulkUploadModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderBulkModalBody}
        modalBodyProps={{ ...props }}
        modalWrapperClass='bulk-upload-section'
        onBackdropClick={props.closeModal}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ validationReducer, loginReducer }) => ({
  validationMessages: validationReducer.validationErrorState.validationErrors,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, { downloadCsvAction })(BulkUploadModal);
