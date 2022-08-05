import React, { FC } from 'react';
import Editor from '@monaco-editor/react';
import Button from '../../../../components/Button';
import Props from './typing';
import './style.scss';

const CustomPriorityLogicPopup: FC<Props> = (props) => {
  const {
    modalType,
    closeModal,
    customRoutingLogic,
    setCustomRoutingLogic,
    selectedRowStatus,
    handleApprove,
    handleReject,
    handleUpdate,
  } = props;

  return (
    <React.Fragment>
      <h3>
        {modalType === 'review' ? 'Review' : 'Update'} Custom Priority Logic
      </h3>
      <div className='modal-body'>
        <div className='form-group'>
          <label>Custom Priority Logic</label>
          <Editor
            height='40vh'
            width={'100%'}
            className='priority-logic-editor'
            defaultLanguage='javascript'
            value={customRoutingLogic}
            options={{
              readOnly: modalType === 'review' ? true : false,
            }}
            onChange={(e) =>
              setCustomRoutingLogic && setCustomRoutingLogic(e || '')
            }
            onMount={(editor) =>
              modalType === 'review' ? null : editor.focus()
            }
          />
        </div>
        <div className='action-button text-left'>
          {modalType === 'review' ? (
            <>
              {
                <Button
                  btnStyleClass={`secondry-button ${
                    selectedRowStatus !== 'pending' ? 'visibility-hidden' : ''
                  }`}
                  label='Reject'
                  onClick={handleReject}
                  enable={true}
                />
              }
              {selectedRowStatus === 'pending' && (
                <Button
                  btnStyleClass={`primary-button ${
                    selectedRowStatus !== 'pending' ? 'visibility-hidden' : ''
                  }`}
                  label='Approve'
                  onClick={handleApprove}
                  enable={true}
                />
              )}
              <Button
                btnStyleClass='secondry-button f-right'
                label='Close'
                onClick={() => closeModal()}
                enable={true}
              />
            </>
          ) : (
            <>
              <Button
                btnStyleClass='secondry-button'
                label='Close'
                onClick={() => closeModal()}
                enable={true}
              />
              <Button
                btnStyleClass='primary-button f-right'
                label='Update'
                onClick={handleUpdate}
                enable={true}
              />
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomPriorityLogicPopup;
