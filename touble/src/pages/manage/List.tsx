import styles from './Common.module.scss';
import { QuestionCard } from '../../components/QuestionCard';
import { useDebounceFn, useRequest, useTitle } from 'ahooks';
import { Empty, Spin, Typography } from 'antd';
import { ListSearch } from '../../components/ListSearch';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getQuestionListService } from '../../services/question';
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '../../constant';

type QuestionType = {
  _id: string;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
};

export const List = () => {
  useTitle('小慕问卷-我的问卷');
  const { Title } = Typography;
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState<QuestionType[]>([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
  const [prevKeyword, setPrevKeyword] = useState(keyword);
  if (keyword !== prevKeyword) {
    setPrevKeyword(keyword);
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }

  // 真正触发
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result as {
          list?: QuestionType[];
          total?: number;
        };
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );
  // 触发加载-防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem == null) return;
      const domReact = elem.getBoundingClientRect();
      if (domReact == null) return;
      const { bottom } = domReact;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1,
    },
  );
  // 页面加载，url(keyword)变化，触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);
  // 页面滚动尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener('scroll', tryLoadMore);
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore);
    };
  }, [searchParams, haveMoreData]);

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {list.length > 0 &&
          list.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  );
};
