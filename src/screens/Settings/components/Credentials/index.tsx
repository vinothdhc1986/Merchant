import React, { FC, useState, useEffect } from 'react';
import Button from '../../../../components/Button';
import notify from '../../../../lib/notifiy';
import EditSecretKeyModal from '../EditSecretKeyModal';
import { checkPermissions, copyToClipboard } from '../../../../lib/helper';
import Props from './typing';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';

const copyCredentialEventMapping = {
  mid: clevertapEventConfigList.SETTINGS_CREDENTIALS_COPIED_MID,
  accessCode: clevertapEventConfigList.SETTINGS_CREDENTIALS_COPIED_ACCESS_CODE,
  secretCode: clevertapEventConfigList.SETTINGS_CREDENTIALS_COPIED_SECRET_KEY,
};

const Credentials: FC<Props> = (props): JSX.Element => {
  const { credentialSettingData } = props;

  const [showEditSecretKeyModal, setShowEditSecretKeyModal] =
    useState<boolean>(false);

  const [copySuccess, setCopySuccess] = useState({
    mid: '',
    accessCode: '',
    secretCode: '',
  });

  const copyToClipBoard = async (keyName, copyText) => {
    try {
      copyToClipboard(copyText);
      if (!props.isAdmin)
        pushClevertapEvent(copyCredentialEventMapping[keyName]);
      setCopySuccess({
        ...copySuccess,
        [keyName]: 'Copied!',
      });
      setTimeout(() => {
        setCopySuccess({
          mid: '',
          accessCode: '',
          secretCode: '',
        });
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
    if (!props.isAdmin)
      pushClevertapEvent(clevertapEventConfigList.SETTINGS_CREDENTIALS_SHOWN);
  }, []);

  return (
    <>
      <div className='white-box-content credentials'>
        <div className='credentials-row'>
          <div className='credentials'>
            MID
            <label>
              {credentialSettingData ? credentialSettingData.mid : ''}
            </label>
          </div>
          <div className='action-button'>
            <Button
              btnStyleClass='secondry-button'
              label={copySuccess.mid || 'Copy'}
              onClick={() => copyToClipBoard('mid', credentialSettingData.mid)}
              enable
            />
          </div>
        </div>
        {checkPermissions('VIEW_CREDENTIALS') && (
          <>
            <div className='credentials-row'>
              <div className='credentials'>
                Access Code
                <label> ****************</label>
              </div>
              <div className='action-button'>
                <Button
                  btnStyleClass='secondry-button'
                  label={copySuccess.accessCode || 'Copy'}
                  onClick={() =>
                    copyToClipBoard(
                      'accessCode',
                      credentialSettingData.accessCode
                    )
                  }
                  enable
                />
              </div>
            </div>
            <div className='credentials-row'>
              <div className='credentials'>
                Secret Key
                <label> *****************</label>
              </div>
              <div className='action-button'>
                {/*  To add this functionality */}
                {/* <Button
              btnStyleClass='secondry-button'
              label='Edit'
              onClick={() => setShowEditSecretKeyModal(true)}
              enable
            /> */}
                <Button
                  btnStyleClass='secondry-button'
                  label={copySuccess.secretCode || 'Copy'}
                  onClick={() =>
                    copyToClipBoard(
                      'secretCode',
                      credentialSettingData.secretKey
                    )
                  }
                  enable
                />
              </div>
            </div>
          </>
        )}
      </div>
      {showEditSecretKeyModal && (
        <EditSecretKeyModal
          handleCancel={() => setShowEditSecretKeyModal(false)}
          handleSave={() => setShowEditSecretKeyModal(false)}
          secretKeyValue='1234567890abcdefghijkl'
        />
      )}
    </>
  );
};

export default Credentials;
