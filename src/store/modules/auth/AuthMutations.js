import types from '@/store/modules/auth/AuthMutationTypes';
import axios from '@/utils/Axios';

export default {
  [types.AUTH_LOGIN](state) {
    state.status = 'loading';
  },
  [types.AUTH_SIGNUP](state) {
    state.status = 'loading';
  },
  [types.RECEIVE_AUTH_SUCCESS](state, payload) {
    state.status = 'success';
    state.accessToken = payload.accessToken;
    state.tokenType = payload.tokenType;
    state.client = payload.client;
    state.uid = payload.uid;
    state.expiry = payload.expiry;
  },
  [types.RECEIVE_AUTH_ERROR](state) {
    state.status = 'error';
  },
  [types.AUTH_LOGOUT](state) {
    state.accessToken = '';
    state.tokenType = '';
    state.client = '';
    state.uid = '';
    state.expiry = '';
  },
  [types.SET_REQUEST_HEADER](state) {
    axios.defaults.headers.common['access-token'] = state.accessToken;
    axios.defaults.headers.common['token-type'] = state.tokenType;
    axios.defaults.headers.common.client = state.client;
    axios.defaults.headers.common.uid = state.uid;
    axios.defaults.headers.common.expiry = state.expiry;
  },
  [types.RESET_REQUEST_HEADER]() {
    axios.defaults.headers.common['access-token'] = '';
    axios.defaults.headers.common['token-type'] = '';
    axios.defaults.headers.common.client = '';
    axios.defaults.headers.common.uid = '';
    axios.defaults.headers.common.expiry = '';
  },
};
