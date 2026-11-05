import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {
  isLoginOrRegister,
  isNONeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router';

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();
  useEffect(() => {
    if (waitingUserData) return;

    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME, { replace: true });
      }
      return;
    }

    if (!isNONeedUserInfo(pathname)) {
      nav(LOGIN_PATHNAME, { replace: true });
    }
  }, [waitingUserData, username, pathname, nav]);
}

export default useNavPage;
