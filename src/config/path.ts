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
