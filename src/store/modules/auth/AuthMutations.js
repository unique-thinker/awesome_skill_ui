import types from '@/store/modules/auth/AuthMutationTypes';

export default {
  [types.AUTH_LOGIN](state) {
    state.status = 'loading';
  },

  [types.AUTH_SIGNUP](state) {
    state.status = 'loading';
  },

  [types.RECEIVE_AUTH_SUCCESS](state, payload) {
    Object.assign(state, {
      status: 'success',
      authHeaders: payload.headers,
      user: payload.user,
    });
  },

  [types.RECEIVE_AUTH_ERROR](state) {
    state.status = 'error';
  },

  [types.AUTH_LOGOUT](state) {
    state.status = '';
    state.authHeaders.accessToken = '';
    state.authHeaders.tokenType = '';
    state.authHeaders.client = '';
    state.authHeaders.uid = '';
    state.authHeaders.expiry = '';
  },
};
