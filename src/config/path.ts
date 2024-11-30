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
      path: '/auth/verify-email',
    },
    forgetPassword: {
      label: 'Forget Password',
      path: '/auth/forget-password',
    },
    resetPassword: {
      label: 'Reset Password',
      path: '/auth/reset-password',
    },
  },

  user: {
    path: '/user',
    edit: {
      label: 'Edit Profile',
      path: '/edit-profile',
    },
    changePassword: {
      label: 'Change Password',
      path: '/change-password',
    },
  },
} as const;
