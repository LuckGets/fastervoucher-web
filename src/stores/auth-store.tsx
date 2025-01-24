import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { login, logout, refresh, register } from '../api/auth/auth';
import { LoginForm } from '@/api/auth/types/login-form.types';
import { RegisterForm } from '@/api/auth/types/register-form.types';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loginGoogle } from '@/api/authGoogle/authGoogle';

interface LoginResponse {
  accessToken: string;
}

interface RegisterResponse {
  accessToken: string;
}

export interface AuthState {
  accessToken: string | null;
  errorLogin?: string;
  errorRegister?: string;
  setTokens: (accessToken: string) => void;
  actionLogin: (form: LoginForm) => Promise<LoginResponse>;
  actionRegister: (form: RegisterForm) => Promise<RegisterResponse>;
  actionLogout: () => Promise<void>;
  actionRefreshToken: () => Promise<string | null>;
  actionLoginGoogle: () => Promise<LoginResponse>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      errorLogin: undefined,
      errorRegister: undefined,
      setTokens: (accessToken) => {
        set({ accessToken });
        const decodedToken = jwtDecode(accessToken);

        let expirationTime;
        if (decodedToken && decodedToken.exp) {
          expirationTime = decodedToken.exp * 1000;
        } else {
          console.warn(
            'Access token does not have an expiration time (exp), setting default expiration to 15 minutes.',
          );
          expirationTime = Date.now() + 15 * 60 * 1000;
        }

        const currentTime = Date.now();
        const timeRemaining = expirationTime - currentTime;

        if (timeRemaining > 0) {
          setTimeout(() => {
            useAuthStore.getState().actionRefreshToken();
          }, timeRemaining);
        }
      },

      actionLogin: async (form: LoginForm) => {
        set({ errorLogin: '' });
        try {
          const result = await login(form);
          const accessToken = result?.data?.data?.accessToken;

          if (!accessToken) {
            console.error('Access Token not found:', result.data);
            throw new Error('Access Token is undefined');
          }

          set({ accessToken });

          return result.data as LoginResponse;
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionLogin error:', err);
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
          set({ accessToken: null });
        } catch (error) {
          console.error('Logout failed:', error);
          throw error;
        }
      },

      actionRefreshToken: async () => {
        const { accessToken } = useAuthStore.getState();

        if (!accessToken) {
          console.error('No access token available.');
          return null;
        }

        try {
          const response = await refresh();
          const newAccessToken = response.data.data.accessToken;

          useAuthStore.getState().setTokens(newAccessToken);

          return newAccessToken;
        } catch (error) {
          console.error('Failed to refresh token:', error);
          return null;
        }
      },

      actionLoginGoogle: async () => {
        try {
          const login = await loginGoogle();
          const result = await loginGoogle();
          const accessToken = result?.data?.data?.accessToken;

          console.log('login :>> ', login);

          if (!accessToken) {
            console.error('Access Token not found:', result.data);
            throw new Error('Access Token is undefined');
          }

          set({ accessToken });

          return result.data as LoginResponse;
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionLogin error:', err);
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
