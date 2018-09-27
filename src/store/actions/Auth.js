import axios from '@/store/modules/plugins/Axios';
import {
  AUTH_LOGIN,
  AUTH_SIGNUP,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
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
        // dispatch(USER_REQUEST);
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
        // dispatch(USER_REQUEST);
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
};
