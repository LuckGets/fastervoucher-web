import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '@/config/path';

const GuestLayout = lazy(() => import('../layouts/GuestLayout'));
const HomePage = lazy(() => import('../pages/main/HomePage'));
const HistoryPage = lazy(() => import('@/pages/main/HistoryPage'));
const UserPage = lazy(() => import('@/pages/main/UserPage'));
const CartPage = lazy(() => import('@/pages/main/CartPage'));
const Register = lazy(() => import('@/pages/auth/Register'));
const Login = lazy(() => import('@/pages/auth/Login'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

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
