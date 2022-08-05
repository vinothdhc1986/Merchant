import React, { FC, useEffect, useState } from 'react';
import './style.scss';
import Modal from 'screens/Login/components/Modal';
import notify from '../../../lib/notifiy';
import imgURL from '../../../lib/imgURL';
import {
  pushClevertapEvent,
  clevertapEventConfigList,
} from '../../../lib/analyticsUtil';
import { copyToClipboard } from '../../../lib/helper';
import Props from './typing';
import './style.scss';
import './style.scss';

const SupportModal: FC<Props> = (props): JSX.Element => {
  const [copied, setCopySuccess] = useState<string>('');
  const copyToClipBoard = (copyText) => {
    try {
      copyToClipboard(copyText);
      setCopySuccess('Copied!');
      setTimeout(() => {
        setCopySuccess('');
      }, 2000);
    } catch (err) {
      notify({
        message: 'Error',
        type: 'error',
        description: 'Failed to copy!',
      });
    }
  };

  useEffect(() => {
    pushClevertapEvent(clevertapEventConfigList.CONTACT_SUPPORT_SHOWN);

    return () => {
      pushClevertapEvent(clevertapEventConfigList.CONTACT_SUPPORT_EXITED_CLOSE);
    };
  }, []);

  return (
    <React.Fragment>
      <Modal
        className={'support-model'}
        backButtonEnable={false}
        onBackdropClick={() => props.handleClose()}
      >
        <div className='modal-header'>
          <h2 className='support-modal-heading'>Have a query or a request?</h2>
          <img
            className='cursor-pointer'
            src={imgURL['cross-circle']}
            alt='Close'
            onClick={() => props.handleClose()}
          />
        </div>
        <div className='support-modal-body'>
          <div className='description'>
            Write an email to us at{' '}
            <a
              onClick={() => {
                pushClevertapEvent(
                  clevertapEventConfigList.CONTACT_SUPPORT_MAIL_ID_CLICKED
                );
              }}
              href={`mailto:${process.env.REACT_APP_SUPPORT_EMAIL}`}
            >
              {process.env.REACT_APP_SUPPORT_EMAIL}
            </a>{' '}
            along with your Merchant ID and a description of your query/request
            to automatically raise a ticket. You will receive a response from us
            within <b>48 hours</b>. You can also{' '}
            <b>CC your Key Account Manager</b> to the email.
          </div>

          <div className='action-buttons'>
            <div>
              <div className='merchant-id'>Merchant ID </div>
              <div className='merchant-value-container'>
                <div className={'merchant-value'}>{props.merchantId} </div>
                <div>
                  <img
                    src={imgURL['copy-icon']}
                    alt='Click'
                    onClick={() => copyToClipBoard(props.merchantId)}
                    className={copied ? 'active' : ''}
                  ></img>
                </div>
              </div>
            </div>
            <div>
              <div className='merchant-id'>Toll free number</div>
              <div className={'merchant-value'}>18003099007</div>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default SupportModal;
