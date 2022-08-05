import React, { useEffect, useState } from 'react';
import imgURL from '../../lib/imgURL';
import './style.scss';

const TestEnvLabel = (): JSX.Element => {
  const [showDescription, setShowDescription] = useState(false);

  const handleResize = () => {
    if (window.screen.width > 1250) {
      setShowDescription(true);
    } else {
      setShowDescription(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className='test_env-label-container'>
        <div className='test_env-icon-wrapper'>
          {' '}
          <img src={imgURL['megaphone-icon']} />
        </div>
        <div className='test_env-text-wrapper'>
          <h3>{`You're currently in the Test Environment`}</h3>
          {showDescription && (
            <p>
              Please activate your account to access the Live Environment. For
              more details, check your registered email.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TestEnvLabel;
