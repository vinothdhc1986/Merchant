import superagent from 'superagent';
import config from '../config';
import store from '../redux/store';

/*
 * @function 'call' common method that makes api requests
 * @param {object} 'request' stores the request 'method','endpoint', 'payload', 'query',
 * 'token' as keys...'
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const apiCall = (apiData: {
  method: 'get' | 'put' | 'post' | 'delete';
  url?: string;
  endpoint?: string;
  payload?;
  query?;
  type?: string;
  requestType?: 'json' | 'image';
  isAuthEndPoint?: boolean;
  isPayoutsEndpoint?: boolean;
}) => {
  const {
    method = 'get',
    url,
    endpoint,
    payload,
    query,
    // type = 'application/json',
    requestType = 'json',
    isAuthEndPoint = false,
    isPayoutsEndpoint = false,
  } = apiData;

  const _url = isAuthEndPoint
    ? `${config.API.API_AUTH_URL}/${endpoint}`
    : isPayoutsEndpoint
    ? `${config.API.API_PAYOUTS_URL}/${endpoint}`
    : `${config.API.API_BASE_URL}/${endpoint}`;

  const authToken = store.getState().loginReducer.loginState.token;
  const request = superagent(method, endpoint ? _url : url);
  if (requestType !== 'image') {
    // request.set('Content-Type', type);
  }
  if (authToken) {
    request.set('Authorization', `Bearer ${authToken}`);
  }

  return request.send(payload).withCredentials().query(query);
};

export default apiCall;
