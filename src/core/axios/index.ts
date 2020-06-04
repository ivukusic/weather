// tslint:disable: no-console

import Axios from 'axios';
import { URLS } from 'library/common/constants/Url.constants';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
const APP_ID = process.env.REACT_APP_APP_ID;

const axiosInstance = Axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async config => {
  const clonedConfig = config;
  config.url = `${config.url}&appid=${APP_ID}`;
  return clonedConfig;
});

axiosInstance.interceptors.response.use(
  config => config,
  error => {
    if (error.response) {
      console.log('Error response: ', error.response);
      const loginURL = BASE_URL + URLS.login;
      if (error.response.status === 401 && error.response.config.url !== loginURL) {
        // EXPIRE SESSION
      }
    } else if (error.request) {
      console.log('Error request: ', error.request);
    } else {
      console.log('Error message: ', error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
