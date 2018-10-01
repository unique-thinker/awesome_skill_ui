import axios from '@/store/modules/plugins/Axios';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_PASSWORD_RESET,
  AUTH_NEW_PASSWORD,
  SET_REQUEST_HEADER,
  RESET_REQUEST_HEADER,
} from '@/store/mutations/types/Auth';
import {
  SET_AUTH_TOKEN,
  RESET_AUTH_TOKEN,
} from '@/store/mutations/types/AuthToken';
import getters from '@/store/getters/Auth';

export default {

  [AUTH_LOGIN]: ({ commit }, user) => new Promise((resolve, reject) => {
    commit(AUTH_LOGIN);
    axios({ url: '/auth/sign_in', data: user, method: 'POST' })
      .then((resp) => {
        const responseHeader = getters.header(resp.headers);
        commit(SET_AUTH_TOKEN, responseHeader);
        commit(AUTH_SUCCESS, responseHeader);
        commit(SET_REQUEST_HEADER);
        resolve();
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        commit(RESET_AUTH_TOKEN);
        commit(RESET_REQUEST_HEADER);
        reject(err.response.data);
      });
  }),

  [AUTH_SIGNUP]: ({ commit }, user) => new Promise((resolve, reject) => {
    commit(AUTH_SIGNUP);
    axios({ url: '/auth', data: user, method: 'POST' })
      .then((resp) => {
        const responseHeader = getters.header(resp.headers);
        commit(SET_AUTH_TOKEN, responseHeader);
        commit(AUTH_SUCCESS, responseHeader);
        commit(SET_REQUEST_HEADER);
        resolve();
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        commit(RESET_AUTH_TOKEN);
        commit(RESET_REQUEST_HEADER);
        reject(err.response.data);
      });
  }),

  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    axios({ url: '/auth/sign_out', method: 'DELETE' })
      .then(() => {
        commit(RESET_AUTH_TOKEN);
        commit(AUTH_LOGOUT);
        commit(RESET_REQUEST_HEADER);
        resolve();
      });
  }),

  [AUTH_PASSWORD_RESET]: ({}, passwordResetData) => new Promise((resolve, reject) => {
    axios({ url: '/auth/password', data: passwordResetData, method: 'POST' })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  }),

  [AUTH_NEW_PASSWORD]: ({}, payload) => new Promise((resolve, reject) => {
    axios({
      url: '/auth/password', data: payload.newPassword, headers: payload.headers, method: 'PUT',
    })
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err.response.data);
      });
  }),
};
