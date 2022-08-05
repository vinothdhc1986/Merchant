
import React, { FC, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import Modal from '../Modal';
import Button from '../Button';
import Upload from 'antd/lib/upload';
import imgURL from '../../lib/imgURL';
import { getMerchantIdFromStore } from '../../lib/helper';
import Props from './typing';
import './style.scss';
import config from '../../config';

const { Dragger } = Upload;

const renderDropzone = (
  uploadBulkRefundAction,
  fileList,
  setFileList
): JSX.Element => {
  const csvLinkRef = useRef();

  const dropzoneProps = {
    name: 'file',
    multiple: false,
    onChange({ fileList }) {
      setFileList(fileList);
    },
    beforeUpload: (): boolean => false,
  };

  return (
    <React.Fragment>
      <Dragger {...{ ...dropzoneProps }}>
        <p className="ant-upload-drag-icon">
          <img src={imgURL['add-icon']} alt="add-icon" />
        </p>
        <a className="ant-upload-text curser-pointer">
          Click or drag file to this area to upload
        </a>
        <p className="ant-upload-hint">Click here to choose a csv file</p>
      </Dragger>
      {/* <CSVLink
        className="hidden"
        // data={csvData}
        ref={csvLinkRef}
        filename="data.csv"
      ></CSVLink> */}
    </React.Fragment>
  );
};

const RenderBulkModalBody = (props): JSX.Element => {
  const {
    closeModal,
    title,
    getDownloadCsvTemplateAction,
    uploadBulkRefundAction,
  } = props;

  const [fileList, setFileList] = useState<any>([]);

  const handleUpload = () => {
    // eslint-disable-next-line prefer-const
    let formData = new FormData();
    formData.append('file', fileList[0].originFileObj);
    const merchantId = getMerchantIdFromStore();
    uploadBulkRefundAction({
      merchantId: merchantId,
      sourceId: 2,
      file: formData,
    });
  };
  return (
    <React.Fragment>
      <h3>{title}</h3>
      <a
        rel="noreferrer"
        // onClick={() => {
        //   getDownloadCsvTemplateAction();
        // }}
        href={`${config.API.API_BASE_URL}/api/refund/batch/sample/file/download`}
        target="_blank"
      >
        Click here to download the csv template.
      </a>
      <div className="modal-body">
        <div className="bulk-upload">
          {renderDropzone(uploadBulkRefundAction, fileList, setFileList)}
          {/* <div className="file-upload-error">
            Filename.docx is not a valid file type. Please choose a csv file.
          </div> */}
        </div>

        <div className="action-button text-right">
          <Button
            btnStyleClass="secondry-button"
            label="Cancel"
            onClick={closeModal}
            enable={true}
          />
          <Button
            btnStyleClass="primary-button"
            label="Upload"
            onClick={() => {
              handleUpload();
              closeModal();
            }}
            enable={fileList.length > 0}
          />
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
        modalWrapperClass="bulk-upload-section"
        onBackdropClick={props.closeModal}
      />
    </React.Fragment>
  );
};

export default BulkUploadModal;
