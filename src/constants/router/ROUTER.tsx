import { createBrowserRouter } from 'react-router-dom';
import { LogInPage } from 'src/pages/LogInPage.tsx';
import { MainPage } from 'src/pages/MainPage.tsx';
import { SignUpPage } from 'src/pages/SignUpPage.tsx';

export const PATH_ROOT = '/' as const;

export const PATH_MAIN = '/main' as const;

export const PATH_SIGNUP = '/signup' as const;

export const PATH_LOGIN = '/login' as const;

export const ROUTER = createBrowserRouter([
  {
    path: PATH_ROOT,
    element: <LogInPage />,
  },
  {
    path: PATH_SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: PATH_LOGIN,
    element: <LogInPage />,
  },
  {
    path: PATH_MAIN,
    element: <MainPage />,
  },
]);
