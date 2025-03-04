export const paths = {
  main: {
    home: {
      label: 'Home',
      path: '/',
    },
    cart: {
      label: 'Cart',
      path: '/cart',
    },
    history: {
      label: 'History',
      path: '/history',
    },
    user: {
      label: 'User',
      path: '/user',
    },
  },

  payment: {
    label: 'Payment',
    path: '/cart/payment',
  },

  auth: {
    login: {
      label: 'Login',
      path: '/auth/login',
    },
    register: {
      label: 'Register',
      path: '/auth/register',
    },
    verifyEmail: {
      label: 'Verify Email',
      path: '/confirm-email',
    },
    forgetPassword: {
      label: 'Forget Password',
      path: '/auth/forget-password',
    },
    resetPassword: {
      label: 'Reset Password',
      path: '/auth/reset-password',
    },
    loginGoogleSuccess: {
      label: 'Login Google Success',
      path: '/google-success',
    },
  },

  user: {
    path: '/user',
    edit: {
      label: 'Edit Profile',
      path: '/user/edit-profile',
    },
    changePassword: {
      label: 'Change Password',
      path: '/user/change-password',
    },
    changePasswordVerify: {
      label: 'Change Password Verify',
      path: '/change-password',
    },
  },

  redeem: {
    path: '/redeem',
  },

  admin: {
    path: '/admin',
    dashboard: {
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    manage: {
      label: 'Manage Order',
      path: '/admin/manage',
    },
    affiliate: {
      label: 'Affiliate Program',
      path: '/admin/affiliate',
    },
    voucher: {
      label: 'Manage Voucher',
      path: '/admin/voucher',
    },
    createVoucher: {
      label: 'Create Voucher',
      path: '/admin/create-voucher',
    },
    voucherSetting: {
      label: 'Voucher Setting',
      path: '/admin/voucher/:id',
    },
    setting: {
      label: 'Setting Store',
      path: '/admin/setting',
    },
  },
} as const;
