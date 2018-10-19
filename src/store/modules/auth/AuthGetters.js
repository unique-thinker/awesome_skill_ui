import localStore from '@/lib/utils/LocalStorage';

const auth = {
  isAuthenticated: (state) => {
    const accessToken = state.authHeaders.accessToken || localStore.getAccessToken();
    return !!accessToken && !auth.isTokenExpired(state);
  },

  isTokenExpired: (state) => {
    const expirationDate = auth.getTokenExpirationDate(state);
    return expirationDate < new Date();
  },

  getTokenExpirationDate: (state) => {
    const expiry = state.authHeaders.expiry || localStore.getTokenExpiry();
    if (!expiry) { return true; }

    const date = new Date(0);
    date.setUTCSeconds(expiry);
    return date;
  },

  authStatus: state => state.status,
};

export default auth;
