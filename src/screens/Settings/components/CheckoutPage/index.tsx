/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, useEffect } from 'react';
import { Props } from './typing';
import imgURL from '../../../../lib/imgURL';

import './common.scss';
import './payment.scss';

const Checkout: FC<Props> = (props): JSX.Element => {
  const ChangeTheme = (obj: object): void => {
    const root = document.documentElement;
    root.style.setProperty(
      '--primary-light-background-color',
      obj['--primary-light-background-color'] || '#F3FFFD'
    );
    root.style.setProperty(
      '--primary-input-light-background-color',
      obj['--primary-input-light-background-color'] || '#FFFFFF'
    );
    root.style.setProperty(
      '--primary-select-background',
      obj['--primary-select-background'] || '#ffffff'
    );
    root.style.setProperty(
      '--primary-light-text-color',
      obj['--primary-light-text-color'] || '#24342B'
    );
    root.style.setProperty(
      '--resend-button-background',
      obj['--resend-button-background'] || '#e6effc'
    );
    root.style.setProperty(
      '--primary-payment-options-background',
      obj['--primary-payment-options-background'] || '#FBFBFB'
    );
    root.style.setProperty(
      '--primary-payment-options-text-color',
      obj['--primary-payment-options-text-color'] || '#4f5c55'
    );
    root.style.setProperty(
      '--primary-payment-background-color',
      obj['--primary-payment-background-color'] || '#FFFFFF'
    );
    root.style.setProperty(
      '--primary-border-color',
      obj['--primary-border-color'] || '#EBECEF'
    );
    root.style.setProperty(
      '--primary-light-points-card-gradient',
      obj['--primary-light-points-card-gradient'] ||
        'linear-gradient(180deg, #ecf4ff 0%, #ffffff 100%)'
    );
    root.style.setProperty(
      '--primary-details-popup',
      obj['--primary-details-popup'] || '#FEFEE7'
    );
    root.style.setProperty(
      '--primary-light-span-color',
      obj['--primary-light-span-color'] || '#3483e4'
    );
    root.style.setProperty(
      '--primary-contrast-color-1',
      obj['--primary-contrast-color-1'] || '#337FE6'
    );
    root.style.setProperty(
      '--primary-less-opacity-text',
      obj['--primary-less-opacity-text'] || 'rgb(36 52 43 / 50%)'
    );
  };

  useEffect(() => {
    if (props.checkoutTheme === 'dark') {
      ChangeTheme({
        '--primary-light-background-color': '#272727',
        '--primary-input-light-background-color': '#000000',
        '--primary-select-background': '#000000',
        '--primary-light-text-color': '#ffffff',
        '--resend-button-background': '#000000',
        '--primary-payment-options-background': '#000000',
        '--primary-payment-options-text-color': '#FFFFFF',
        '--primary-payment-background-color': '#121212',
        '--primary-border-color': '#2D2D2D',

        '--primary-light-points-card-gradient':
          'linear-gradient(180deg, #1F1F1F 0%, #121212 100%)',
        '--primary-details-popup': '#121212',
        '--primary-less-opacity-text': 'rgb(255 255 255 / 50%)',
      });
    } else if (props.checkoutTheme === 'light') {
      ChangeTheme({});
    } else {
      const regExp = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
      if (regExp.test(props.checkoutTheme))
        ChangeTheme({
          '--primary-light-span-color': props.checkoutTheme,
          '--primary-contrast-color-1': props.checkoutTheme,
        });
      else {
        ChangeTheme({});
      }
    }
  }, [props.checkoutTheme]);

  return (
    <div className='checkoutpage'>
      <div className='modal-dialog modal-dialog-centered checkoutpage'>
        <div className='checkout-theme-setting-preview-wrapper'>
          <h5 className='preview'>Preview</h5>
        </div>
        <div className='checkout-modal-content'>
          <div className='top-gradiant'></div>
          <div className='modalMiddle'>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            >
              <img src={imgURL.cross} alt='cross' />
            </button>
            <div className='modal-header-section'>
              <div className='logo'>
                <img
                  src={
                    props.logo
                      ? props.logo
                      : props.defaultLogo || imgURL['checkout-logo']
                  }
                  alt='Logo'
                />
              </div>
              <div className='header-order-total'>
                <p
                  className='text-ellipsis'
                  title={props.merchantName ?? 'Clarks.in'}
                >
                  {props.merchantName ?? 'Clarks.in'}
                </p>
                <label>ORDER TOTAL</label>
                <span>₹5,200</span>
              </div>
            </div>

            <div className='myUser'>
              <div className='userIcon'>
                <img src={imgURL.account} alt='user' />
              </div>{' '}
              <span>
                +91 9876543210 <label>|</label> johnappleseed@gmail.com
              </span>{' '}
              <button className='editButton'>
                <img src={imgURL.edit_icon} alt='edit' />{' '}
              </button>
            </div>

            <div className='savedCard'>
              <h4>RECENTLY USED</h4>
              <div className='specialsDiscoverability checkout-swiper swiper-container'>
                <ul className='swiper-wrapper'>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img src={imgURL.hdfc} alt='hdfc' width='28' />
                    </div>
                    <label>Netbanking</label>
                    <span>HDFC</span>
                  </li>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img src={imgURL.apay} alt='hdfc' width='36' />
                    </div>
                    <label>Wallet</label>
                    <span>Amazon Pay</span>
                  </li>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img src={imgURL['master-card']} alt='hdfc' width='36' />
                    </div>
                    <label>HDFC Card</label>
                    <span>•••• 1234</span>
                  </li>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img src={imgURL.hdfc} alt='hdfc' width='28' />
                    </div>
                    <label>Netbanking</label>
                    <span>HDFC</span>
                  </li>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img src='images/apay.svg' alt='hdfc' width='36' />
                    </div>
                    <label>Wallet</label>
                    <span>Amazon Pay</span>
                  </li>
                  <li className='swiper-slide'>
                    <div className='bankIcon'>
                      <img
                        src='images/Mastercard_recently_used.svg'
                        alt='hdfc'
                        width='36'
                      />
                    </div>
                    <label>HDFC Card</label>
                    <span>•••• 1234</span>
                  </li>
                </ul>
                <div className='checkout-swiper-button-next swiper-button-white'>
                  <span></span>
                </div>
                <div className='checkout-swiper-button-prev swiper-button-white'>
                  <span></span>
                </div>
              </div>
            </div>

            <div className='modal-body'>
              <div className='paymentOptions paylist'>
                <h4 className='form-title'>PAYMENT OPTIONS</h4>
                <ul>
                  <li className='creditCard'>
                    <img src='images/cc_dc.svg' />
                    <span>Credit/Debit Cards</span>
                  </li>
                  <li className='netbanking'>
                    <img src='images/netbanking.svg' />
                    <span>Netbanking</span>
                  </li>
                  <li className='payUpi'>
                    <img src='images/upi.svg' />
                    <span>Pay via UPI</span>
                  </li>
                  <li className='wallet'>
                    <img src='images/wallet.svg' />
                    <span>Wallet</span>
                  </li>
                  <li className='emi'>
                    <img src='images/emi.svg' />
                    <span>EMI</span>
                  </li>
                  {/* <li className='payLater'>
                    <img src='images/pay_later.svg' />
                    <span>Buy Now Pay Later</span>
                  </li> */}
                  <li className='payPoints'>
                    <img src='images/pay_points.svg' />
                    <span>Pay by Points</span>
                  </li>
                  {/* <li className='giftCard'>
                    <img src='images/gift_card.svg' />
                    <span>Gift Card</span>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className='footer_icon'>
          <img src={imgURL['plural_logo']} alt='pluralLogo' />
          <div className='rightLogo'>
            <img src={imgURL['pci-icon']} alt='pci' />
            <img src={imgURL['visa-icon']} alt='visaVerified' />
            <img src={imgURL['master-card-icon']} alt='masterCard' />
            <img src={imgURL['safekey-icon']} alt='safekey' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
