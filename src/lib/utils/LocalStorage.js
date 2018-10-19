export default {
  // Auth token methods
  setAccessToken(accessToken) {
    return localStorage.setItem('accessToken', accessToken);
  },

  setTokenType(tokenType) {
    return localStorage.setItem('tokenType', tokenType);
  },

  setTokenClient(client) {
    return localStorage.setItem('client', client);
  },

  setTokenUid(uid) {
    return localStorage.setItem('uid', uid);
  },

  setTokenExpiry(expiry) {
    return localStorage.setItem('expiry', expiry);
  },

  getAccessToken() {
    return localStorage.getItem('accessToken');
  },

  getTokenType() {
    return localStorage.getItem('tokenType');
  },

  getTokenClient() {
    return localStorage.getItem('client');
  },

  getTokenUid() {
    return localStorage.getItem('uid');
  },

  getTokenExpiry() {
    return localStorage.getItem('expiry');
  },

  removeAccessToken() {
    return localStorage.removeItem('accessToken');
  },

  removeTokenType() {
    return localStorage.removeItem('tokenType');
  },

  removeTokenClient() {
    return localStorage.removeItem('client');
  },

  removeTokenUid() {
    return localStorage.removeItem('uid');
  },

  removeTokenExpiry() {
    return localStorage.removeItem('expiry');
  },
};
