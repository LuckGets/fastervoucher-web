export const paths = {
  app: {
    home: {
      path: '/',
    },
    cart: {
      path: '/cart',
    },
    history: {
      path: '/history',
    },
    user: {
      path: '/user',
    },
  },

  auth: {
    login: {
      path: '/auth/login',
    },
    register: {
      path: '/auth/register',
    },
  },

  user: {
    edit: {
      path: '/edit',
    },
  },
} as const;
