import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import HomePage from '../pages/guest/HomePage';
import PageNotFound from '../pages/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
