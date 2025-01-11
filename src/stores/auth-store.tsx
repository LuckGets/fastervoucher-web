import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, logout, register } from '../api/auth/auth';
import { LoginForm } from '@/api/auth/types/login-form.types';
import { RegisterForm } from '@/api/auth/types/register-form.types';
import { AxiosError } from 'axios';

interface LoginResponse {
  accessToken: string;
}

interface RegisterResponse {
  accessToken: string;
}

export interface AuthState {
  accessToken: string;
  errorLogin?: string;
  errorRegister?: string;
  actionLogin: (form: LoginForm) => Promise<LoginResponse>;
  actionRegister: (form: RegisterForm) => Promise<RegisterResponse>;
  actionLogout: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      errorLogin: undefined,
      errorRegister: undefined,

      actionLogin: async (form: LoginForm) => {
        set({ errorLogin: '' });
        try {
          const result = await login(form);
          const accessToken = result?.data?.data?.accessToken;

          if (!accessToken) {
            console.error('Access Token not found:', result.data);
            throw new Error('Access Token is undefined');
          }

          console.log('Access Token:', accessToken);
          set({ accessToken });

          return result.data as LoginResponse;
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('Full error:', err);

          if (err.response) {
            set({ errorLogin: err.response.data.message });
          } else {
            set({ errorLogin: 'An unexpected error occurred' });
          }

          throw err;
        }
      },

      actionRegister: async (form: RegisterForm) => {
        set({ errorRegister: '' });
        try {
          const result = await register(form);
          const accessToken = result?.data?.data?.accessToken;

          if (!accessToken) {
            console.error(
              'Access Token not found during register:',
              result.data,
            );
            throw new Error('Access Token is undefined');
          }

          set({ accessToken });

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

      actionLogout: async () => {
        set({ errorLogin: '', errorRegister: '' });
        try {
          await logout();
          set({ accessToken: '' });
        } catch (error) {
          console.error('Logout failed:', error);
          throw error;
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
