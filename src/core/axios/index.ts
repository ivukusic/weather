// tslint:disable: no-console

import Axios from 'axios';

export const BASE_URL = process.env.REACT_APP_WEATHER_BASE_URL;
const APP_ID = process.env.REACT_APP_WEATHER_APP_ID;
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
      if (error.response.status === 401) {
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
