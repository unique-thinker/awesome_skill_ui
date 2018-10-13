import localStore from '@/lib/utils/LocalStorage';

const auth = {
  isAuthenticated: (state) => {
    state.authHeaders.accessToken = state.authHeaders.accessToken || localStore.getAccessToken();
    return !!state.authHeaders.accessToken && !auth.isTokenExpired(state);
  },

  isTokenExpired: (state) => {
    const expirationDate = auth.getTokenExpirationDate(state);
    return expirationDate < new Date();
  },

  getTokenExpirationDate: (state) => {
    state.authHeaders.expiry = state.authHeaders.expiry || localStore.getTokenExpiry();
    if (!state.authHeaders.expiry) { return true; }

    const date = new Date(0);
    date.setUTCSeconds(state.authHeaders.expiry);
    return date;
  },

  authStatus: state => state.status,
};

export default auth;
