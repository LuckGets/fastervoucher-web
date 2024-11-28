import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from '../layouts/GuestLayout';
import HomePage from '../pages/main/HomePage';
import PageNotFound from '../pages/PageNotFound';
import HistoryPage from '@/pages/main/HistoryPage';
import UserPage from '@/pages/main/UserPage';
import CartPage from '@/pages/main/CartPage';
import Register from '@/pages/auth/Register';
import Login from '@/pages/auth/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'user', element: <UserPage /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
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
