import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  SET_REQUEST_HEADER,
  RESET_REQUEST_HEADER,
} from '@/store/mutations/types/Auth';
import axios from '@/store/modules/plugins/Axios';

export default {
  [AUTH_LOGIN]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SIGNUP]: (state) => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state, payload) => {
    state.status = 'success';
    state.accessToken = payload.accessToken;
    state.tokenType = payload.tokenType;
    state.client = payload.client;
    state.uid = payload.uid;
    state.expiry = payload.expiry;
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
  },
  [AUTH_LOGOUT]: (state) => {
    state.accessToken = '';
    state.tokenType = '';
    state.client = '';
    state.uid = '';
    state.expiry = '';
  },
  [SET_REQUEST_HEADER]: (state) => {
    axios.defaults.headers.common['access-token'] = state.accessToken;
    axios.defaults.headers.common['token-type'] = state.tokenType;
    axios.defaults.headers.common.client = state.client;
    axios.defaults.headers.common.uid = state.uid;
    axios.defaults.headers.common.expiry = state.expiry;
  },
  [RESET_REQUEST_HEADER]: () => {
    axios.defaults.headers.common['access-token'] = '';
    axios.defaults.headers.common['token-type'] = '';
    axios.defaults.headers.common.client = '';
    axios.defaults.headers.common.uid = '';
    axios.defaults.headers.common.expiry = '';
  },
};
