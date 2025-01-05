import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, register } from '../api/auth/auth';
import { LoginForm } from '@/api/auth/types/login-form.types';
import { RegisterForm } from '@/api/auth/types/register-form.types';
import { AxiosError } from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RegisterResponse {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  accessToken: string;
  user?: User;
  errorLogin?: string;
  errorRegister?: string;
  actionLogin: (form: LoginForm) => Promise<LoginResponse>;
  actionRegister: (form: RegisterForm) => Promise<RegisterResponse>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      user: undefined,
      errorLogin: undefined,
      errorRegister: undefined,

      actionRegister: async (form: RegisterForm) => {
        set({ errorRegister: '' });
        try {
          const result = await register(form);
          return result.data as RegisterResponse;
        } catch (error) {
          const err = error as AxiosError<{ message: string | string[] }>;
          console.log('Error detail:', err);

          if (err.response?.data?.message) {
            const errorMessage = Array.isArray(err.response.data.message)
              ? err.response.data.message.join(', ')
              : err.response.data.message;

            set({ errorRegister: errorMessage });
          } else {
            set({ errorRegister: 'An unexpected error occurred' });
          }
          throw err;
        }
      },

      actionLogin: async (form: LoginForm) => {
        set({ errorLogin: '' });
        try {
          const result = await login(form);

          if (result.data && result.data.accessToken) {
            console.log('Access Token:', result.data.accessToken);
            set({
              accessToken: result.data.accessToken,
              user: result.data.user,
            });
          }

          return result.data as LoginResponse;
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('Error detail:', err);

          if (err.response) {
            set({ errorLogin: err.response.data.message });
          } else {
            set({ errorLogin: 'An unexpected error occurred' });
          }

          throw err;
        }
      },
    }),
    {
      name: 'authenticate-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
