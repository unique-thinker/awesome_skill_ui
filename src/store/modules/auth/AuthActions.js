import axios from '@/utils/Axios';
import types from '@/store/modules/auth/AuthMutationTypes';
import sessionTypes from '@/store/modules/session/SessionMutationTypes';
import getters from '@/store/modules/auth/AuthGetters';

const loginPath = '/auth/sign_in';
const signupPath = '/auth';
const logoutPath = '/auth/sign_out';
const passwordResetPath = '/auth/password';
const newPasswordPath = '/auth/password';

export default {

  authLogin({ dispatch, commit }, user) {
    commit(types.AUTH_LOGIN);
    return axios({ url: loginPath, data: user, method: 'POST' })
      .then((resp) => {
        dispatch('receiveAuthSuccess', resp);
      })
      .catch((err) => {
        dispatch('receiveAuthError');
        throw err;
      });
  },

  authSignup({ dispatch, commit }, user) {
    commit(types.AUTH_SIGNUP);
    return axios({ url: signupPath, data: user, method: 'POST' })
      .then((resp) => {
        dispatch('receiveAuthSuccess', resp);
      })
      .catch((err) => {
        dispatch('receiveAuthError');
        throw err;
      });
  },

  authLogout({ dispatch }) {
    return axios({ url: logoutPath, method: 'DELETE' })
      .then(() => {
        dispatch('destroySession');
      });
  },

  authPasswordReset({}, passwordResetData) {
    return axios({ url: passwordResetPath, data: passwordResetData, method: 'POST' })
      .then()
      .catch((err) => {
        throw err;
      });
  },

  authNewPassword({}, payload) {
    return axios({
      url: newPasswordPath,
      data: payload.newPassword,
      headers: payload.headers,
      method: 'PUT',
    })
      .then()
      .catch((err) => {
        throw err;
      });
  },

  receiveAuthSuccess({ commit }, resp) {
    const responseHeader = getters.header(resp.headers);
    commit(sessionTypes.SET_AUTH_TOKEN, responseHeader);
    commit(types.RECEIVE_AUTH_SUCCESS, responseHeader);
    commit(types.SET_REQUEST_HEADER);
  },

  receiveAuthError({ commit }) {
    commit(types.RECEIVE_AUTH_ERROR);
    commit(sessionTypes.RESET_AUTH_TOKEN);
    commit(types.RESET_REQUEST_HEADER);
  },

  destroySession({ commit }) {
    commit(sessionTypes.RESET_AUTH_TOKEN);
    commit(types.AUTH_LOGOUT);
    commit(types.RESET_REQUEST_HEADER);
  },
};
