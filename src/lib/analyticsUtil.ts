import { CleverTapEventConfig, CleverTapEventConfigName } from './typing';

declare global {
  interface Window {
    clevertap: {
      event: {
        push: (event: string, payload: { [property: string]: any }) => void;
      };
    };
  }
}

export const pushClevertapEvent = (eventConfig: CleverTapEventConfig): void => {
  const eventPayload = eventConfig.eventPayload || {};
  if (
    window.clevertap?.event?.push &&
    typeof window.clevertap.event.push === 'function'
  )
    window.clevertap.event.push(eventConfig.eventName, {
      ...eventPayload,
    });
};

export const clevertapEventConfigList: {
  readonly [configName in CleverTapEventConfigName]: CleverTapEventConfig;
} = {
  SIGN_UP_SHOWN: {
    eventName: 'DB Signup Shown',
  },
  SIGN_UP_EXITED_SIGN_IN: {
    eventName: 'DB Signup Exited',
    eventPayload: {
      exit: 'Sign In',
    },
  },
  SIGN_UP_EXITED_CREATE_ACCOUNT: {
    eventName: 'DB Signup Exited',
    eventPayload: {
      exit: 'Create Account',
    },
  },
  LOGIN_SHOWN: {
    eventName: 'DB Login Shown',
  },
  LOGIN_PAGE_EXITED_SIGN_UP: {
    eventName: 'DB Login Page Exited',
    eventPayload: {
      exit: 'Sign Up',
    },
  },
  LOGIN_PAGE_EXITED_FORGOT_PASSWORD: {
    eventName: 'DB Login Page Exited',
    eventPayload: {
      exit: 'Forgot Password',
    },
  },
  LOGIN_PAGE_EXITED_CONTINUE: {
    eventName: 'DB Login Page Exited',
    eventPayload: {
      exit: 'Continue',
    },
  },
  RESET_PASSWORD_SHOWN: {
    eventName: 'DB Reset Password Shown',
  },
  RESET_PASSWORD_EXITED_CANCEL: {
    eventName: 'DB Reset Password Exited',
    eventPayload: {
      exit: 'Cancel',
    },
  },
  RESET_PASSWORD_EXITED_SEND_OTP: {
    eventName: 'DB Reset Password Exited',
    eventPayload: {
      exit: 'Send OTP',
    },
  },
  OVERVIEW_PAGE_SHOWN: {
    eventName: 'DB Overview Page Shown',
  },
  SIDEBAR_TAB_CLICKED_PAYMENT: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Payment',
    },
  },
  SIDEBAR_TAB_CLICKED_REFUNDS: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Refunds',
    },
  },
  SIDEBAR_TAB_CLICKED_ANALYTICS: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Analytics',
    },
  },
  SIDEBAR_TAB_CLICKED_SETTINGS: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Settings',
    },
  },
  SIDEBAR_TAB_CLICKED_PAYMENT_LINKS: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Payment Links',
    },
  },
  SIDEBAR_TAB_CLICKED_PAYMENT_PAGES: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Payment Pages',
    },
  },
  SIDEBAR_TAB_CLICKED_SMART_ROUTING: {
    eventName: 'DB Tab Clicked',
    eventPayload: {
      tabClicked: 'Smart Routing',
    },
  },
  CONTACT_SUPPORT_SHOWN: {
    eventName: 'DB Contact Support Shown',
  },
  CONTACT_SUPPORT_EXITED_CLOSE: {
    eventName: 'DB Contact Support Exited',
  },
  CONTACT_SUPPORT_MAIL_ID_CLICKED: {
    eventName: 'DB Contact Support Email Clicked',
  },
  DOCUMENTATION_CLICKED: {
    eventName: 'DB Documentation Clicked',
  },
  USER_MANAGEMENT_CLICKED_PROFILE: {
    eventName: 'DB User Management Clicked',
    eventPayload: {
      source: 'Profile',
    },
  },
  USER_MANAGEMENT_CLICKED_SETTINGS: {
    eventName: 'DB User Management Clicked',
    eventPayload: {
      source: 'Settings',
    },
  },
  USER_MANAGEMENT_ROLE_CREATED: {
    eventName: 'DB Settings User Mgmt New Roles',
  },
  USER_MANAGEMENT_USER_CREATED: {
    eventName: 'DB Settings User Mgmt New User',
  },
  GENERAL_SETTINGS_URL_CHANGED: {
    eventName: 'DB Settings General URL Changed',
  },
  CHECKOUT_SETTINGS_THEME_CHANGED: {
    eventName: 'DB Settings Checkout Theme Changed',
  },
  SETTINGS_CREDENTIALS_SHOWN: {
    eventName: 'DB Settings Credentials Shown',
  },
  SETTINGS_CREDENTIALS_COPIED_MID: {
    eventName: 'DB Settings Credentials Copied',
    eventPayload: {
      copied: 'MID',
    },
  },
  SETTINGS_CREDENTIALS_COPIED_ACCESS_CODE: {
    eventName: 'DB Settings Credentials Copied',
    eventPayload: {
      copied: 'Access Code',
    },
  },
  SETTINGS_CREDENTIALS_COPIED_SECRET_KEY: {
    eventName: 'DB Settings Credentials Copied',
    eventPayload: {
      copied: 'Secret Key',
    },
  },
  SETTINGS_WEBHOOK_URL_CHANGED: {
    eventName: 'DB Settings Webhook URL Changes',
  },
  PAYMENT_PAGES_REDIRECTED: {
    eventName: 'DB Payment Pages Exited',
  },
  PAYMENT_LINKS_BULK_UPLOAD_HISTORY_VIEWED: {
    eventName: 'DB Payment Links Upload History Viewed',
  },
  PAYMENT_LINKS_REPORT_DOWNLOADED: {
    eventName: 'DB Payment Links Report Downloaded',
  },
  PAYMENT_LINK_CREATED_INDIVIDUAL: {
    eventName: 'DB Payment Links Created',
    eventPayload: {
      linkType: 'Individual',
    },
  },
  PAYMENT_LINK_CREATED_BULK: {
    eventName: 'DB Payment Links Created',
    eventPayload: {
      linkType: 'Bulk',
    },
  },
  SMART_ROUTING_GATEWAY_CREATED: {
    eventName: 'DB Smart Routing Gateway Created',
  },
  SMART_ROUTING_FAQ_SHOWN: {
    eventName: 'DB Smart Routing FAQ Shown',
  },
  SMART_ROUTING_PREFERENCE_SCORE_BIN_ROUTING_UPDATED: {
    eventName: 'DB Smart Routing Preferences BIN Routing Updated',
  },
  SMART_ROUTING_PREFERENCE_SCORE_ISSUER_ROUTING_UPDATED: {
    eventName: 'DB Smart Routing Issuer Routing Updated',
  },
  SMART_ROUTING_PREFERENCE_SCORE_CARD_BRAND_ROUTING_UPDATED: {
    eventName: 'DB Smart Routing Card Brand',
  },
  SMART_ROUTING_PRIORITY_LOGIC_UPDATED: {
    eventName: 'DB Smart Routing Priority Logic Updated',
  },
  SMART_ROUTING_CUSTOM_ROUTING_LOGIC_TURNED_ON: {
    eventName: 'DB Smart Routing Custom Logic Shown',
    eventPayload: {
      turnedOn: 'Yes',
    },
  },
  SMART_ROUTING_CUSTOM_ROUTING_LOGIC_TURNED_OFF: {
    eventName: 'DB Smart Routing Custom Logic Shown',
    eventPayload: {
      turnedOn: 'No',
    },
  },
  REFUND_BULK_UPLOAD_HISTORY_SHOWN: {
    eventName: 'DB Refunds Report Bulk History Shown',
  },
  REFUND_BULK_UPLOAD_SUCCESS: {
    eventName: 'DB Refunds Bulk Upload Done',
  },
  REFUND_REPORT_DOWNLOADED: {
    eventName: 'DB Refunds Report Downloaded',
  },
  PAYMENT_REPORT_DOWNLOADED: {
    eventName: 'DB Payments Report Downloaded',
  },
  OVERVIEW_REPORT_DOWNLOADED: {
    eventName: 'DB Overview Report Downloaded',
  },
  LOGIN_OTP_PAGE_SHOWN: {
    eventName: 'DB Login OTP Page Shown',
  },
  LOGIN_OTP_SUBMITTED: {
    eventName: 'DB Login OTP Submitted',
  },
  LOGIN_OTP_ERROR_MESSAGE_SHOWN: {
    eventName: 'DB Login OTP Error Shown',
  },
  LOGIN_OTP_RESENT: {
    eventName: 'DB Login OTP Resent',
  },
  INCOMPATIBLE_DEVICE_DIALOG_SHOWN: {
    eventName: 'Incompatible Device Dialog Shown',
  },
};
