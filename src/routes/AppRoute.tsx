import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '@/config/path';
import Loading from '@/components/Loading';

const GuestLayout = lazy(() => import('../layouts/GuestLayout'));
const HomePage = lazy(() => import('@/feature/main/page/HomePage'));
const HistoryPage = lazy(() => import('@/feature/main/page/HistoryPage'));
const UserPage = lazy(() => import('@/feature/main/page/UserPage'));
const CartPage = lazy(() => import('@/feature/main/page/CartPage'));
const Register = lazy(() => import('@/feature/auth/page/Register'));
const Login = lazy(() => import('@/feature/auth/page/Login'));
const VerifyEmail = lazy(() => import('@/feature/auth/page/VerifyEmail'));
const ForgetPassword = lazy(() => import('@/feature/auth/page/ForgetPassword'));
const ResetPassWord = lazy(() => import('@/feature/auth/page/ResetPassWord'));
const EditProfile = lazy(() => import('@/pages/user/EditProfile'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const router = createBrowserRouter([
  {
    path: paths.main.home.path,
    element: (
      <Suspense fallback={<Loading />}>
        <GuestLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.main.cart.path, element: <CartPage /> },
      { path: paths.main.history.path, element: <HistoryPage /> },
      { path: paths.main.user.path, element: <UserPage /> },
      { path: paths.user.edit.path, element: <EditProfile /> },
      { path: paths.auth.register.path, element: <Register /> },
      { path: paths.auth.login.path, element: <Login /> },
      { path: paths.auth.verifyEmail.path, element: <VerifyEmail /> },
      { path: paths.auth.forgetPassword.path, element: <ForgetPassword /> },
      { path: paths.auth.resetPassword.path, element: <ResetPassWord /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
  {
    path: '*',
    lazy: async () => {
      return { Component: PageNotFound };
    },
  },
]);

export default function AppRouter() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}
