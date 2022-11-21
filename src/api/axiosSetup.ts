import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const onFulfilled = (response: AxiosResponse) => {
  return response;
};

const onRejected = (error: AxiosError) => {
  return Promise.reject(error);
};

const initialization = (config: AxiosRequestConfig) => {
  const axiosInstance = axios.create(config);
  axiosInstance.interceptors.request.use(async (existedConfig) => {
    return existedConfig;
  });

  axiosInstance.interceptors.response.use(onFulfilled, onRejected);

  return axiosInstance;
};

export default initialization;
