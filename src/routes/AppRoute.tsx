import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '@/config/path';

const GuestLayout = lazy(() => import('../layouts/GuestLayout'));
const HomePage = lazy(() => import('@/feature/main/page/HomePage'));
const HistoryPage = lazy(() => import('@/feature/main/page/HistoryPage'));
const UserPage = lazy(() => import('@/feature/main/page/UserPage'));
const CartPage = lazy(() => import('@/feature/main/page/CartPage'));
const Register = lazy(() => import('@/feature/auth/page/Register'));
const Login = lazy(() => import('@/feature/auth/page/Login'));
const PageNotFound = lazy(() => import('./PageNotFound'));

const router = createBrowserRouter([
  {
    path: paths.app.home.path,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <GuestLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.app.cart.path, element: <CartPage /> },
      { path: paths.app.history.path, element: <HistoryPage /> },
      { path: paths.app.user.path, element: <UserPage /> },
      { path: paths.auth.register.path, element: <Register /> },
      { path: paths.auth.login.path, element: <Login /> },
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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}
