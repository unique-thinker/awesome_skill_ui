export default {
  isAuthenticated: state => !!state.accessToken,
  authStatus: state => state.status,
  header: headers => ({
    accessToken: headers['access-token'],
    tokenType: headers['token-type'],
    client: headers.client,
    uid: headers.uid,
    expiry: headers.expiry,
  }),
};
