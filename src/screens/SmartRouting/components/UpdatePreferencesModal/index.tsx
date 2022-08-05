import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'components/Modal';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import {
  getPreferenceGatewayAction,
  clearPreferenceGatewayAction,
  updatePreferenceScoreAction,
  clearUpdatePreferenceAction,
} from 'redux/actions/smartRouting';
import notify from 'lib/notifiy';
import { getMerchantIdFromStore } from 'lib/helper';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';
import './style.scss';

const RenderModalBody = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();

  const { closeModal, gateways } = props;
  const [preferenceScore, setPreferenceScore] = useState<string>('');

  useEffect(() => {
    props.getPreferenceGatewayAction(merchantId);
    return () => {
      props.clearPreferenceGatewayAction();
      props.clearUpdatePreferenceAction();
    };
  }, []);

  useEffect(() => {
    const { isSuccess, isFailure, responseCode, responseMessage } =
      props.updatePreferenceScoreState;
    if (
      isSuccess &&
      (responseCode === 3000 || responseMessage?.toLowerCase() === 'success')
    ) {
      if (!props.isAdmin) {
        pushClevertapEvent(
          clevertapEventConfigList.SMART_ROUTING_PRIORITY_LOGIC_UPDATED
        );
      }
      notify({
        type: 'success',
        message: 'Priority Logic Updated',
        description: 'Priority Logic was updated successfully.',
      });
      closeModal();
    } else if (isFailure) {
      /*TODO in case of Failure */
      notify({
        type: 'error',
        message: 'Priority Logic Updation Failed',
        description: responseMessage,
      });
    }
  }, [props.updatePreferenceScoreState]);

  const handleSaveChanges = () => {
    if (!preferenceScore) {
      return;
    }
    props.updatePreferenceScoreAction(preferenceScore, merchantId);
  };

  useEffect(() => {
    if (props.preferenceGateway?.data?.Logic) {
      setPreferenceScore(props.preferenceGateway.data.Logic);
    }
  }, [props.preferenceGateway?.data]);

  const handlePreferenceScoreChange = (e) => {
    setPreferenceScore(e.target.value);
  };

  return (
    <React.Fragment>
      <h3>Update Priority Logic</h3>
      <p>
        Please type in the name of the gateways, separated by commas, to
        indicate your prioritization.
      </p>
      <div className='modal-body update-preference-body'>
        <h4>Available Gateways</h4>
        <p>{gateways}</p>
        <TextInput
          label='Priority Logic'
          value={preferenceScore}
          handleChange={handlePreferenceScoreChange}
        />
        <div className='action-button text-right'>
          <Button
            btnStyleClass='secondry-button'
            label='Cancel'
            onClick={closeModal}
            enable
          />
          <Button
            btnStyleClass='primary-button'
            label='Save Changes'
            onClick={handleSaveChanges}
            enable={!!preferenceScore}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const UpdatePreferencesModal: FC<Props> = (props): JSX.Element => {
  return (
    <React.Fragment>
      <Modal
        ModalBody={RenderModalBody}
        modalBodyProps={{ ...props }}
        modalWrapperClass='update-preferences-modal'
        onBackdropClick={props.closeModal}
      />
    </React.Fragment>
  );
};

const mapStateToProps = ({ smartRoutingReducer, loginReducer }) => ({
  preferenceGateway: smartRoutingReducer.preferenceGatewayState,
  updatePreferenceScoreState: smartRoutingReducer.updatePreferenceScoreState,
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps, {
  getPreferenceGatewayAction,
  clearPreferenceGatewayAction,
  updatePreferenceScoreAction,
  clearUpdatePreferenceAction,
})(UpdatePreferencesModal);
