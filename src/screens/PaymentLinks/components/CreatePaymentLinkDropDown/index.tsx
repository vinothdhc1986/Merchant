import React, { FC } from 'react';
import './styles.scss';
import Props from './typing';

const CreatePaymentLinkDropDown: FC<Props> = (props): JSX.Element => {
  return (
    <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
      <a
        className='dropdown-item'
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.showCreatePaymentLinkModal(true);
          props.handleCloseDropdown();
        }}
      >
        Individual Payment Link
      </a>

      <a
        className='dropdown-item'
        style={{ cursor: 'pointer' }}
        onClick={() => {
          props.showBulkUploadModal(true);
          props.handleCloseDropdown();
        }}
      >
        Bulk Payment Links
      </a>
    </div>
  );
};

export default CreatePaymentLinkDropDown;
