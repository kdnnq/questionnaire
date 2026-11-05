import axios from './ajax';
import type { ResDataType } from './ajax';

export async function getUserInfoService(): Promise<ResDataType> {
  const url = '/api/auth/profile';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
// 注册
export async function RegisterService(
  username: string,
  nickname: string,
  password: string,
): Promise<ResDataType> {
  const url = '/api/user/register';
  const body = { username, password, nickname: nickname || username };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}
// 登录
export async function LoginService(username: string, password: string): Promise<ResDataType> {
  const url = '/api/auth/login';
  const body = { username, password };
  const data = (await axios.post(url, body)) as ResDataType;
  return data;
}
