import { useParams } from 'react-router-dom';
import { getQuestionService } from '../services/question';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetComponents, type ComponentInfoType } from '../store/componentsReducer';
import { resetPageInfo } from '../store/pageInfoReducer';

type QuestionDataType = {
  componentList?: ComponentInfoType[];
  title?: string;
  isPublished?: boolean;
  desc?: string;
  css?: string;
  js?: string;
};

export const useLoadQuestionData = () => {
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id');
      const data = await getQuestionService(id);
      return data;
    },
    {
      manual: true,
    },
  );
  //  根据获取的data设置redux store
  useEffect(() => {
    if (!data) return;
    const {
      componentList = [],
      title = '',
      isPublished = false,
      desc = '',
      css = '',
      js = '',
    } = data as QuestionDataType;
    dispatch(resetComponents({ componentList, selectedId: '', copiedComponent: null }));
    dispatch(resetPageInfo({ title, desc, css, js, isPublished }));
  }, [data]);
  //  判断id变化，执行ajax加载问卷数据
  useEffect(() => {
    run(id);
  }, [id]);

  return { loading, error };
};
