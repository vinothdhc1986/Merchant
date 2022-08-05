import React, { FC } from 'react';
import TRMSection from './components/TRMSection';
import PayoutSection from './components/PayoutSection';

const Customization: FC = () => {
  return (
    <div className='white-box-content customizations'>
      <TRMSection />
      <hr className='horizontal-divider' />
      <PayoutSection />
    </div>
  );
};

export default Customization;
