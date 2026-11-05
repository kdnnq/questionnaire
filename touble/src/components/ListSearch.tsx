import { Input } from 'antd';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARAM_KEY } from '../constant';
export const ListSearch = () => {
  const [value, setValue] = useState('');
  const { Search } = Input;
  const nav = useNavigate();
  const { pathname } = useLocation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  //   获取url参数，并设置到 input value
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
    const timer = setTimeout(() => {
      if (curVal !== value) setValue(curVal);
    }, 0);
    return () => clearTimeout(timer);
  }, [searchParams]);
  const handleSearch = (value: string) => {
    // 使用 URLSearchParams 以保留 URL 中的其他参数
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set(LIST_SEARCH_PARAM_KEY, value);
    } else {
      newSearchParams.delete(LIST_SEARCH_PARAM_KEY);
    }
    //跳转页面 添加url参数
    nav({
      pathname,
      search: newSearchParams.toString(),
    });
  };

  return (
    <Search
      placeholder="请输入关键字"
      onSearch={handleSearch}
      onChange={handleChange}
      style={{ width: '260px' }}
      value={value}
      allowClear
    />
  );
};
