import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/guest/HomePage';
import { paths } from '@/config/path';

// Import lazy loading page
const GuestLayout = lazy(() => import('../layouts/GuestLayout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));

const router = createBrowserRouter([
  {
    path: paths.app.home.path,
    lazy: async () => {
      return { Component: GuestLayout };
    },
    children: [
      { index: true, element: <HomePage /> },
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
      <RouterProvider router={router} />
    </div>
  );
}
