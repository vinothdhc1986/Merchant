import store from '../redux/store';
import {
  format,
  isToday,
  isYesterday,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  getMonth,
  getYear,
  isSunday,
  isSaturday,
  isThisWeek,
  addDays,
  startOfWeek,
  subDays,
} from 'date-fns';
import { permissionEnum } from './typing';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const toPascal = (str: string, customSeperator = ' '): string => {
  const arr = str.split(customSeperator);
  const newStrArr: Array<string> = [];
  arr.map((stringWords: string) => {
    if (stringWords) {
      newStrArr.push(
        stringWords.slice(0, 1).toUpperCase() +
          stringWords.slice(1).toLowerCase()
      );
    }
  });
  return newStrArr.join(' ');
};

export const toStatusClass = (str: string): string => {
  return str.toLowerCase().replace(' ', '-');
};

export const toCapitalize = (str: string): string => {
  return str[0].toUpperCase() + str.substr(1).toLowerCase();
};

export const convertByteToKiloByte = (sizeInByte: number): number => {
  return Math.ceil(sizeInByte / 1000);
};

export const convertSecondsToMilliSeconds = (seconds: number): number => {
  return Math.ceil(seconds * 1000);
};

export const getMerchantIdFromStore = (): string | number => {
  return store.getState().loginReducer.loginState.MerchantId;
  // return 3413;
};
/**
 * @param gatewaysList list of all gateways for the merchant
 * @returns gateways options,
 * to get rid of conficts between gateways & status checkbox ids in filter
 */
export const paymentGatewayOptions = (gatewaysList) => {
  const gatewayOption: { id: string; label: string }[] = [];
  gatewaysList.forEach((item) =>
    gatewayOption.push({
      id: `${item.gatewayName}-${item.gatewayID}`,
      label: item.gatewayName,
    })
  );
  return gatewayOption;
};

export const findGatewayNameUsingGatewayId = (id, allGatewaysList) => {
  const gatewayId = id.split('-').pop();
  const gatewayObj = allGatewaysList.find(
    (item) => item.gatewayID.toString() === gatewayId.toString()
  );
  return gatewayObj && gatewayObj.gatewayName;
};

export const getGatewayName = (id: string): string => {
  return id.split('-')[0];
};

export const getGatewayId = (id: string): string => {
  return id.split('-')[1];
};

/**
 * @param orderStatusList list of all type of order status for the merchant
 * @returns order status options,
 * to get rid of conficts between gateways & status checkbox ids in filter
 */
export const orderStatusOptions = (orderStatusList) => {
  const orderStatusOption: { id: string; label: string }[] = [];
  orderStatusList
    .filter((orderStatus) => Boolean(orderStatus?.statusName))
    .forEach((item) => {
      orderStatusOption.push({
        id: `${item.statusName}-${item.statusId}`,
        label: item.statusName,
      });
    });
  return orderStatusOption;
};

export const getProfileImgText = (name) => {
  const namesArray = name.trim().split(' ');
  if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
  else
    return `${namesArray[0].charAt(0)}${namesArray[
      namesArray.length - 1
    ].charAt(0)}`;
};
// fullName
//   .split(' ')
//   .map((name) => [name[0], name[1]])
//   .join(' ')
//   .toUpperCase()
//   ;

// export const validateURL = (value) => {
//   return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
//     value
//   );
// };

export const validateURL = (urlReq: string): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let url: any;
  try {
    url = new URL(urlReq);
  } catch (e) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const getTimeKey = (key) => {
  // return Number(key) <= 11
  //   ? `${key}:00 AM`
  //   : `${
  //       key % 12 === 0 ? 12 : key % 12 < 10 ? `0${key % 12}` : key % 12
  //     }:00 PM`;
  return `${Number(key)}:00`;
};

export const copyToClipboard = (str: string) => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

export const getPrevMidNightTimeStamp = (timeStamp: number): number =>
  new Date(timeStamp).setHours(0, 0, 0, 0);

export const getNextMidNightTimeStamp = (timeStamp: number): number =>
  new Date(timeStamp).setHours(23, 59, 59, 999);

export const formatToIST = (date: Date): string =>
  format(date, 'yyyy-MM-dd HH:mm:ss.SSS');

export const validateMultipleURL = (str: string): boolean => {
  const multipleURLs = str.split(',');
  const checkValid = multipleURLs.find((url) => !validateURL(url));
  return !checkValid;
};

export const getDateRangeTitle = (
  startDate: Date | string,
  endDate: Date | string
): string => {
  let dateTitle = '';
  if (isToday(new Date(startDate)) && isToday(new Date(endDate))) {
    dateTitle = 'Today';
  } else if (
    isYesterday(new Date(startDate)) &&
    isYesterday(new Date(endDate))
  ) {
    dateTitle = 'Yesterday';
  } else if (
    isFirstDayOfMonth(new Date(startDate)) &&
    new Date(endDate).getTime() ===
      getNextMidNightTimeStamp(new Date().getTime()) &&
    getMonth(new Date(startDate)) === getMonth(new Date())
  ) {
    dateTitle = 'This Month';
  } else if (
    isFirstDayOfMonth(new Date(startDate)) &&
    isLastDayOfMonth(new Date(endDate)) &&
    getMonth(new Date(startDate)) + 1 === getMonth(new Date()) &&
    getYear(new Date(startDate)) === getYear(new Date())
  ) {
    dateTitle = 'Last Month';
  } else if (
    isSunday(new Date(startDate)) &&
    new Date(endDate).getTime() ===
      getNextMidNightTimeStamp(new Date().getTime()) &&
    isThisWeek(new Date(startDate))
  ) {
    dateTitle = 'This Week';
  } else if (
    isSunday(new Date(startDate)) &&
    isSaturday(new Date(endDate)) &&
    addDays(new Date(startDate), 7).toString() ===
      startOfWeek(new Date()).toString()
  ) {
    dateTitle = 'Last Week';
  } else if (
    isToday(new Date(endDate)) &&
    new Date(
      getNextMidNightTimeStamp(addDays(new Date(startDate), 6).getTime())
    ).toString() === new Date(endDate).toString()
  ) {
    dateTitle = 'Last 7 Days';
  }
  return dateTitle;
};

export const checkPermissions = (permission: permissionEnum): boolean => {
  const userPermissions = store.getState().loginReducer?.permissionState
    ? store.getState().loginReducer?.permissionState
    : {};
  if (userPermissions[permission]) {
    return true;
  } else {
    return false;
  }
};

export const getBase64Data = (payload) => {
  const buff = new Buffer(JSON.stringify(payload));
  const base64data = buff.toString('base64');
  return base64data;
};

export const getClientSecretKeyFromStore = (): string => {
  return store.getState().loginReducer?.clientSecretKeyState?.data;
};

export const redirectToUrl = (url: string): void => {
  const tempLink = document.createElement('a');
  tempLink.href = url;
  tempLink.setAttribute('id', 'redirection-url-link');
  tempLink.click();
  tempLink.remove();
};

export const timerDisplay = (remainingSeconds: number) => {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds - minutes * 60;
  const displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:` + displaySeconds;
};

export const dateRangeUpToToday = (dayasUpToToday = 7) => {
  return {
    startDate: subDays(
      new Date(getPrevMidNightTimeStamp(new Date().getTime())),
      dayasUpToToday
    ),
    endDate: new Date(getNextMidNightTimeStamp(new Date().getTime())),
    key: 'selection',
  };
};
