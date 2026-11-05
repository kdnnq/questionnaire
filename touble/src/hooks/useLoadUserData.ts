import useGetUserInfo from './useGetUserInfo';
import { useRequest } from 'ahooks';
import { getUserInfoService } from '../services/user';
import { useDispatch } from 'react-redux';
import { loginReducer } from '../store/userReducer';
import { getToken } from '../utils/user-token';

function useLoadUserData() {
  const { username } = useGetUserInfo();
  const dispatch = useDispatch();
  const token = getToken();

  // ready: 只有存在 token 时才发起请求，避免无 token 时的无效请求和错误提示
  // refreshDeps: token 变化时自动重新获取用户信息（登录/登出都会触发）
  const { loading } = useRequest(getUserInfoService, {
    refreshDeps: [token],
    ready: !!token,
    onSuccess(result) {
      const { username, nickname } = result as { username: string; nickname: string };
      dispatch(loginReducer({ username, nickname }));
    },
  });

  // 没有 username 且正在请求中，才视为等待用户数据
  const waitingUserData = !username && loading;

  return { waitingUserData };
}
export default useLoadUserData;
