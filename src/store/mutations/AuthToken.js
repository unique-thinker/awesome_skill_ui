import {
  SET_AUTH_TOKEN,
  RESET_AUTH_TOKEN,
} from '@/store/mutations/types/AuthToken';

export default {
  [SET_AUTH_TOKEN]: (state, headers) => {
    localStorage.setItem('access-token', headers.accessToken);
    localStorage.setItem('token-type', headers.tokenType);
    localStorage.setItem('client', headers.client);
    localStorage.setItem('uid', headers.uid);
    localStorage.setItem('expiry', headers.expiry);
  },
  [RESET_AUTH_TOKEN]: () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('token-type');
    localStorage.removeItem('client');
    localStorage.removeItem('uid');
    localStorage.removeItem('expiry');
  },
};
