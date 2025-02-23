import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { paths } from '../config/path';
import Loading from '../components/Loading';
import ErrorBoundary from '../pages/error/ErrorBoundary';
import ProtectRoute from './ProtectRoute';

const GuestLayout = lazy(() => import('../layouts/GuestLayout'));
const RedeemLayout = lazy(() => import('../layouts/RedeemLayout'));
const AdminLayout = lazy(() => import('../layouts/AdminLayout'));
const HomePage = lazy(() => import('../feature/main/page/HomePage'));
const HistoryPage = lazy(() => import('../feature/main/page/HistoryPage'));
const UserPage = lazy(() => import('../feature/main/page/UserPage'));
const CartPage = lazy(() => import('../feature/main/page/CartPage'));
const Register = lazy(() => import('../feature/auth/page/Register'));
const Login = lazy(() => import('../feature/auth/page/Login'));
const LoginGoogle = lazy(
  () => import('../feature/auth/components/login/GoogleCallBack'),
);
const VerifyEmail = lazy(() => import('../feature/auth/page/VerifyEmail'));
const ConfirmChangPassword = lazy(
  () => import('../pages/user/ConfirmChangPassword'),
);
const ForgetPassword = lazy(
  () => import('../feature/auth/page/ForgetPassword'),
);
const ResetPassWord = lazy(() => import('../feature/auth/page/ResetPassWord'));
const EditProfile = lazy(() => import('../pages/user/EditProfile'));
const RedeemVoucher = lazy(
  () => import('../feature/redeem/page/RedeemVoucher'),
);
const ChangePassword = lazy(() => import('../pages/user/ChangePassword'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const LoginAdmin = lazy(() => import('../pages/admin/LoginAdmin'));
const Setting = lazy(() => import('../pages/admin/Setting'));
const ManageOrder = lazy(() => import('../pages/admin/ManageOrder'));
const ManageVoucher = lazy(() => import('../pages/admin/ManageVoucher'));
const CreateVoucher = lazy(() => import('../pages/admin/CreateVoucher'));
const VoucherSetting = lazy(() => import('../pages/admin/VoucherSetting'));
const Affiliate = lazy(() => import('../pages/admin/Affiliate'));
const Payment = lazy(() => import('../feature/payment/page/PayMent'));

const router = createBrowserRouter([
  {
    path: paths.main.home.path,
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <GuestLayout />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: paths.main.cart.path, element: <CartPage /> },
      { path: paths.payment.path, element: <Payment /> },
      { path: paths.main.history.path, element: <HistoryPage /> },
      { path: paths.main.user.path, element: <UserPage /> },
      { path: paths.user.edit.path, element: <EditProfile /> },
      { path: paths.user.changePassword.path, element: <ChangePassword /> },
      {
        path: paths.user.changePasswordVerify.path,
        element: <ConfirmChangPassword />,
      },
      { path: paths.auth.register.path, element: <Register /> },
      { path: paths.auth.login.path, element: <Login /> },
      { path: paths.auth.loginGoogleSuccess.path, element: <LoginGoogle /> },
      { path: paths.redeem.path, element: <RedeemVoucher /> },
      { path: paths.auth.verifyEmail.path, element: <VerifyEmail /> },
      { path: paths.auth.forgetPassword.path, element: <ForgetPassword /> },
      { path: paths.auth.resetPassword.path, element: <ResetPassWord /> },
    ],
  },
  {
    path: paths.redeem.path,
    element: (
      <Suspense fallback={<Loading />}>
        <RedeemLayout />
      </Suspense>
    ),
    children: [{ index: true, element: <RedeemVoucher /> }],
  },
  {
    path: paths.admin.path,
    element: (
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          {/* <AdminLayout /> */}
          <ProtectRoute element={<AdminLayout />} allow={['ADMIN']} />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      { index: true, element: <LoginAdmin /> },
      { path: paths.admin.dashboard.path, element: <Dashboard /> },
      { path: paths.admin.manage.path, element: <ManageOrder /> },
      { path: paths.admin.affiliate.path, element: <Affiliate /> },
      { path: paths.admin.voucher.path, element: <ManageVoucher /> },
      { path: paths.admin.createVoucher.path, element: <CreateVoucher /> },
      { path: paths.admin.voucherSetting.path, element: <VoucherSetting /> },
      { path: paths.admin.setting.path, element: <Setting /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export default function AppRouter() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
