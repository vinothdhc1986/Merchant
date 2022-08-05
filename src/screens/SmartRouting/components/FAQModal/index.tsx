import React, { useEffect } from 'react';
import { FC } from 'react';
import { connect } from 'react-redux';
import Button from 'components/Button';
import Modal from 'components/Modal';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import Props from './typing';
import './styles.scss';

const RenderModalBody: FC<Props> = (props) => {
  useEffect(() => {
    if (!props.isAdmin)
      pushClevertapEvent(clevertapEventConfigList.SMART_ROUTING_FAQ_SHOWN);
  }, []);

  return (
    <div className='smart-routing-faq-modal'>
      <div className='faq-content'>
        <h3>What is Priority Logic?</h3>
        <p>
          Priority logic refers to assigning a rank to the integrated payment
          gateways on the basis of the merchant’s ranking preference with ‘1’
          becoming the highest priority. <span>For example,</span>
        </p>
        <h5>PayU, Plural Gateway, RazorPay</h5>
        <p>
          In this priority logic, PayU will be the highest priority while
          routing payments whereas RazorPay will be the lowest priority.
        </p>
        <h3>What is the preference score mechanism?</h3>
        <p>
          Preference score allows you to prioritize your integrated payment
          gateways on the basis of multiple factors such as BIN, Issuer, and
          Card Brand, allowing you greater control over Plural’s smarting
          routing mechanism. Preference Scores should be from 0 to 2 with
          maximum allowable decimal up to two digits. The higher the preference
          score, the higher the prioritization that payment gateway is given.
        </p>
        <h3>
          What happens if I have set both a Preference Score as well as priority
          logic?
        </h3>
        <p>
          In the condition where you set both preference scores as well as a
          priority logic, preference scores SUPERCEDE and OVERWRITE the priority
          logic.
        </p>
        <p className='margin-top-24'>
          <span>For example,</span> If you have set a 123321 BIN’s preference
          scores with RazorPay as ‘1’ score and PayU as ‘2’ score but your
          priority logic mentions RazorPay as ‘1’ and PayU as ‘2’ [assuming no
          other preference scores are setup], for all non-123321 BINs, RazorPay
          will be prioritized over PayU but for 123321 BIN PayU will be
          prioritized over RazorPay.
        </p>
      </div>
      <div className='button-wrapper'>
        <Button
          label='Close'
          onClick={props.closeModal}
          btnStyleType='primary'
          enable
          btnStyleClass='modal-button'
        />
      </div>
    </div>
  );
};

const FAQModal: FC<Props> = (props): JSX.Element => {
  return (
    <Modal
      ModalBody={RenderModalBody}
      modalBodyProps={{ ...props }}
      modalWrapperClass={'smart-routing-faq-modal-wrapper'}
      onBackdropClick={props.closeModal}
    />
  );
};

const mapStateToProps = ({ loginReducer }) => ({
  isAdmin: loginReducer.loginState.isAdmin,
});

export default connect(mapStateToProps)(FAQModal);
