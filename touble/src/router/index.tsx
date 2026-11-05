import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { MainLayout } from '../layout/MainLayout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { NotFound } from '../pages/NotFound';
import { ManageLayout } from '../layout/ManageLayout';
import { List } from '../pages/manage/List';
import { Star } from '../pages/manage/Star';
import { Trash } from '../pages/manage/Trash';
import { QuestionLayout } from '../layout/QuestionLayout';
import { lazy } from 'react';
// import { Edit } from '../pages/question/Edit';
// import { Stat } from '../pages/question/Stat';

const Edit = lazy(() =>
  import('../pages/question/Edit').then((module) => ({ default: module.Edit })),
);
const Stat = lazy(() =>
  import('../pages/question/Stat').then((module) => ({ default: module.Stat })),
);

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Edit />
          </Suspense>
        ),
      },
      {
        path: 'stat/:id',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Stat />
          </Suspense>
        ),
      },
    ],
  },
]);
export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
export function isNONeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
