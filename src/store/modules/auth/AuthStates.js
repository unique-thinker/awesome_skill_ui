export default {
  accessToken: localStorage.getItem('access-token') || '',
  tokenType: localStorage.getItem('token-type') || '',
  client: localStorage.getItem('client') || '',
  uid: localStorage.getItem('uid') || '',
  expiry: localStorage.getItem('expiry') || '',
  status: '',
};
