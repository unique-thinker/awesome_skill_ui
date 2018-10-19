import axios from '@/lib/utils/Axios';
import localStore from '@/lib/utils/LocalStorage';
import types from '@/store/modules/auth/AuthMutationTypes';

const loginPath = '/auth/sign_in';
const signupPath = '/auth';
const logoutPath = '/auth/sign_out';
const passwordResetPath = '/auth/password';
const newPasswordPath = '/auth/password';
const tokenValidate = '/auth/validate_token';

export const transformAuthResponse = resp => ({
  headers: {
    accessToken: resp.headers['access-token'],
    tokenType: resp.headers['token-type'],
    client: resp.headers.client,
    uid: resp.headers.uid,
    expiry: resp.headers.expiry,
  },
  user: {
    username: resp.data.data.username,
    email: resp.data.data.email,
  },
});

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

  authTokenValidate({}) {
    const tokenData = {
      'access-token': localStore.getAccessToken(),
      client: localStore.getTokenClient(),
      uid: localStore.getTokenUid(),
    };

    return axios({ url: tokenValidate, data: tokenData, method: 'GET' })
      .then()
      .catch();
  },

  receiveAuthSuccess({ dispatch, commit }, resp) {
    const authData = transformAuthResponse(resp);
    dispatch('setAuthToken', authData.headers);
    commit(types.RECEIVE_AUTH_SUCCESS, authData);
  },

  receiveAuthError({ dispatch, commit }) {
    dispatch('removeAuthToken');
    commit(types.RECEIVE_AUTH_ERROR);
  },

  destroySession({ dispatch, commit }) {
    commit(types.AUTH_LOGOUT);
    dispatch('removeAuthToken');
  },

  setAuthToken({}, headers) {
    localStore.setAccessToken(headers.accessToken);
    localStore.setTokenType(headers.tokenType);
    localStore.setTokenClient(headers.client);
    localStore.setTokenUid(headers.uid);
    localStore.setTokenExpiry(headers.expiry);
  },
  removeAuthToken() {
    localStore.removeAccessToken();
    localStore.removeTokenType();
    localStore.removeTokenClient();
    localStore.removeTokenUid();
    localStore.removeTokenExpiry();
  },

};
