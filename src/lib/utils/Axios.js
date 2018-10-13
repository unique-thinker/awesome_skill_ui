import axios from 'axios';
import localStore from '@/lib/utils/LocalStorage';

const newAxios = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    Accept: 'application/vnd.awesome-skill.v1+json',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Add a request interceptor
newAxios.interceptors.request.use((config) => {
  const accessToken = localStore.getAccessToken();
  const tokenType = localStore.getTokenType();
  const client = localStore.getTokenClient();
  const uid = localStore.getTokenUid();
  const expiry = localStore.getTokenExpiry();

  if (accessToken && tokenType && client && uid && expiry) {
    config.headers.common['access-token'] = accessToken;
    config.headers.common['token-type'] = tokenType;
    config.headers.common.client = client;
    config.headers.common.uid = uid;
    config.headers.common.expiry = expiry;
  }
  return config;
}, error =>
// Do something with request error
  Promise.reject(error));

// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     // Do something with response data
//     return response;
//   }, function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   });

export default newAxios;
