import React from 'react';
import notification from 'antd/lib/notification';
import imgURL from './imgURL';

const notify = (config: {
  message: string;
  duration?: number | null | undefined;
  type: 'success' | 'error' | 'warning';
  description: string;
}): void => {
  const iconMapping = {
    success: imgURL['check-sucees'],
    error: imgURL['error-close'],
    warning: imgURL['alert-icon'],
  };
  const { message, duration = 4, description, type } = config;
  notification[type]({
    message,
    duration,
    className: `merchant-dashboard-custom-notification ${type}`,
    description,
    icon: iconMapping[type] ? (
      <img src={iconMapping[type]} className='toaster-notification-icon' />
    ) : undefined,
    closeIcon: <img src={imgURL['close-model']} />,
  });
};

export default notify;
