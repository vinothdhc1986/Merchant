import React, { useState, FC, useEffect, useRef } from 'react';
import CustomRadioGroup from 'components/CustomRadioGroup';
import Button from 'components/Button';
import { checkPermissions, convertByteToKiloByte } from 'lib/helper';
import notify from 'lib/notifiy';
import CheckoutPage from '../CheckoutPage';
import { getMerchantIdFromStore } from 'lib/helper';
import store from '../../../../redux/store';
import Props from './typing';
import './styles.scss';
import {
  clevertapEventConfigList,
  pushClevertapEvent,
} from 'lib/analyticsUtil';
import CustomSwitch from 'components/CustomSwitch';

const themeCodeMapping = {
  0: 'light',
  1: 'dark',
  light: 0,
  dark: 1,
};

const CheckoutThemeSettings: FC<Props> = (props): JSX.Element => {
  const merchantId = getMerchantIdFromStore();
  const { getCheckoutThemeState, updateCheckoutThemeState } = props;
  const [checkoutTheme, setCheckoutTheme] = useState<'light' | 'dark'>('light');
  const [imgSrc, setImgSrc] = useState<string | null>('');

  const [checkoutThemeOld, setCheckoutThemeOld] = useState<'light' | 'dark'>(
    'light'
  );
  const [showSavedCards, setShowSavedCards] = useState<boolean>(false);
  const [showSavedCardsOld, setShowSavedCardsOld] = useState<boolean>(false);
  const [imgSrcOld, setImgSrcOld] = useState<string | null>('');
  const [defaultLogoSrc, setDefaultLogoSrc] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encodeImageFileAsURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setImgSrc(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  const onRadioButtonChange = (value) => {
    setCheckoutTheme(value);
  };

  const onFileChange = async (e) => {
    const fileObj = e.target.files[0];
    if (convertByteToKiloByte(fileObj.size) > 1024) {
      notify({
        message: 'Size limit Exceeded',
        type: 'error',
        description: 'Please choose an image with max size 1MB.',
      });
      return;
    }
    /**
     * Todo: Validation for Image Dimensions
     */
    const img = new Image();
    img.src = window.URL.createObjectURL(fileObj);
    img.onload = () => {
      if (img.width < 256 || img.height < 256 || img.width !== img.height) {
        notify({
          message: 'Select another Image',
          type: 'error',
          description:
            'Please choose a square image of minimum dimensions 256x256 px.',
        });
        return;
      } else {
        encodeImageFileAsURL(fileObj);
      }
    };
  };

  useEffect(() => {
    if (getCheckoutThemeState.isSuccess) {
      setImgSrc(getCheckoutThemeState?.data?.logo_url ?? null);
      setCheckoutTheme(
        themeCodeMapping[getCheckoutThemeState?.data?.theme_color || 0]
      );
      setCheckoutThemeOld(
        themeCodeMapping[getCheckoutThemeState?.data?.theme_color || 0]
      );
      setShowSavedCards(
        getCheckoutThemeState?.data?.card_tokenization_enabled || false
      );
      setShowSavedCardsOld(
        getCheckoutThemeState?.data?.card_tokenization_enabled || false
      );
      setImgSrcOld(getCheckoutThemeState?.data?.logo_url ?? null);
      setDefaultLogoSrc(getCheckoutThemeState?.data?.default_logo_url ?? null);
    }
  }, [getCheckoutThemeState.isSuccess]);

  useEffect(() => {
    if (updateCheckoutThemeState.isSuccess) {
      if (!props.isAdmin) {
        let updatedProperty: 'Logo' | 'Theme' | 'Logo & Theme';
        if (imgSrc !== imgSrcOld && checkoutTheme !== checkoutThemeOld) {
          updatedProperty = 'Logo & Theme';
        } else if (imgSrc !== imgSrcOld) {
          updatedProperty = 'Logo';
        } else {
          updatedProperty = 'Theme';
        }
        pushClevertapEvent({
          eventName:
            clevertapEventConfigList.CHECKOUT_SETTINGS_THEME_CHANGED.eventName,
          eventPayload: {
            updated: updatedProperty,
          },
        });
      }
      notify({
        message: 'Checkout Theme',
        type: 'success',
        description: 'Checkout theme updated successfully.',
      });
      setCheckoutThemeOld(checkoutTheme);
      setImgSrcOld(imgSrc);
      setShowSavedCardsOld(showSavedCards);
      props.clearUpdateCheckoutThemeAction();
    }
  }, [updateCheckoutThemeState.isSuccess]);

  useEffect(() => {
    props.getCheckoutThemeAction({
      merchantId: merchantId,
    });
  }, []);

  return (
    <div className='checkout-theme'>
      <div>
        <div className='white-box-content'>
          <h5>Checkout Page Settings</h5>
          <h6>Select Theme</h6>
          <CustomRadioGroup
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ]}
            value={checkoutTheme}
            onChange={(value) => onRadioButtonChange(value)}
          />
          <div className='devide'></div>
          <CustomSwitch
            label='Show Saved Cards'
            onChange={() => setShowSavedCards(!showSavedCards)}
            checked={showSavedCards}
          />
          <div className='devide'></div>
          <h5>Your Logo</h5>
          <p className='subtitle'>
            Please choose a square image of minimum dimensions 256x256 px in PNG
            format.
          </p>
          <span className='logo-upload'>
            <div className='image-preview'>
              {(imgSrc || defaultLogoSrc) && (
                <img
                  width={80}
                  height={80}
                  src={imgSrc || defaultLogoSrc}
                  className='review-form-thumbnail'
                  id='review-thumbnail-submit'
                  alt=' '
                />
              )}{' '}
              <input
                ref={fileInputRef}
                onClick={function () {
                  /**
                   * Reset input value to get rid of [selecting same file again won't trigger onChange]
                   */
                  if (fileInputRef.current && fileInputRef.current.value) {
                    fileInputRef.current.value = '';
                  }
                }}
                onChange={onFileChange}
                type='file'
                id='actual-btn'
                hidden
                accept='image/png'
              />
              <span className='custom-file-select-wrapper'>
                <label
                  className={`custom-file-select ${
                    imgSrc === imgSrcOld ? 'custom-file-select-filled' : ''
                  }`}
                  htmlFor='actual-btn'
                >
                  {!imgSrcOld ? 'Choose a File' : 'Update Logo'}
                </label>
                <label className='custom-file-select-message'>
                  Max File Size: 1 MB
                </label>
              </span>
              {Boolean(imgSrc) && (
                <span className='custom-file-select-wrapper'>
                  <label
                    className='custom-file-select'
                    onClick={() => {
                      setImgSrc(null);
                    }}
                  >
                    Remove Logo
                  </label>
                  <label className='custom-file-select-message'>
                    Replace with Default Logo
                  </label>
                </span>
              )}
            </div>
          </span>
          {checkPermissions('UPDATE_CHECKOUT_THEME_SETTINGS_DATA') && (
            <div className='action-button'>
              <Button
                label='Save Changes'
                btnStyleClass='primary-button'
                onClick={() => {
                  props.updateCheckoutThemeAction({
                    theme_color: themeCodeMapping[checkoutTheme],
                    logo_url: imgSrc,
                    merchant_id: merchantId,
                    card_tokenization_enabled: showSavedCards,
                  });
                }}
                enable={
                  checkoutTheme !== checkoutThemeOld || imgSrc !== imgSrcOld || showSavedCards !== showSavedCardsOld
                }
              />
            </div>
          )}
        </div>
      </div>

      <div className='checkout-preview'>
        <CheckoutPage
          checkoutTheme={checkoutTheme}
          logo={imgSrc || undefined}
          defaultLogo={defaultLogoSrc}
          merchantName={store.getState().loginReducer.loginState.merchantName}
        />
      </div>
    </div>
  );
};

export default CheckoutThemeSettings;
