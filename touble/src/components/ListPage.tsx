import { Pagination } from 'antd';
import { type FC } from 'react';
import { LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constant';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type PropsType = {
  total: number;
};
export const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  //   从url中获取page,pageSize，并同步到Pagination中
  const [searchParams] = useSearchParams();
  const current = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1;
  const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;

  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlePageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }
  return (
    <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange} />
  );
};
