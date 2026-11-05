import axios from 'axios';
import { message } from 'antd';
import { getToken } from '../utils/user-token';
const instance = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 10 * 1000,
  headers: {},
});

// request拦截：每次请求带上token
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error),
);
// response 拦截统一处理 errno,msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;
  if (errno !== 0) {
    if (msg) {
      message.error(msg);
    }
    throw new Error(msg);
  }
  return data as ResDataType;
});
export default instance;
export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};
export type ResDataType = Record<string, unknown>;
