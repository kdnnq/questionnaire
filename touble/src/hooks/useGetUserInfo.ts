import { useSelector, shallowEqual } from 'react-redux';
import type { StateType } from '../store';

function useGetUserInfo() {
  const { username, nickname } = useSelector(
    (state: StateType) => ({
      username: state.user.username,
      nickname: state.user.nickname,
    }),
    shallowEqual,
  );
  return { username, nickname };
}
export default useGetUserInfo;
