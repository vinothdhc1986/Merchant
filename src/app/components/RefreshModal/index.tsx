import React, { FC } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../screens/Login/components/Modal';
import Props from './typing';

const refreshModal: FC<Props> = (props) => {
  const { onOkClickHandler, onLogoutClickHandler } = props;
  return (
    <React.Fragment>
      <Modal
        className={'forgot-model'}
        backButtonEnable={false}
        title={'Action Required'}
      >
        <p>
          It looks like you&#39;ve been idle for awhile, you will be logged out
          soon for security purposes.
        </p>
        <div className="action-button">
          <button className="secondry-button" onClick={onLogoutClickHandler}>
            Log Out
          </button>
          <Button
            btnStyleClass="primary-button"
            label="Stay Signed in"
            enable
            onClick={onOkClickHandler}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default refreshModal;
