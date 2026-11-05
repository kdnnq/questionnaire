import axios from './ajax';
import type { ResDataType } from './ajax';

export async function getQuestionStatListService(
  questionId: string,
  opt: { page: number; pageSize: number },
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}`;
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

// 单个组件的统计
export async function getComponentStatService(
  questionId: string,
  componentId: string,
): Promise<ResDataType> {
  const url = `/api/stat/${questionId}/${componentId}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

// 首页统计数据
export async function getHomeStatService(): Promise<ResDataType> {
  const url = '/api/stat/home/data';
  const data = (await axios.get(url)) as ResDataType;
  return data;
}
