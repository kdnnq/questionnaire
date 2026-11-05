import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { produce } from 'immer';

export type PageInfoType = {
  title: string;
  desc?: string;
  css?: string;
  js?: string;
  isPublished?: boolean;
};

const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  css: '',
  js: '',
};

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    // 加载问卷时重置页面信息
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
      return action.payload;
    },
    // 修改页面信息
    changePageInfo: produce((draft: PageInfoType, action: PayloadAction<Partial<PageInfoType>>) => {
      return { ...draft, ...action.payload };
    }),
  },
});

export const { resetPageInfo, changePageInfo } = pageInfoSlice.actions;
export default pageInfoSlice.reducer;
