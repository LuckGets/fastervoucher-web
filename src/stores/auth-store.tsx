import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { authApi } from '../api/auth/auth.api';
import { AxiosError } from 'axios';
import { loginGoogle } from '../api/authGoogle/authGoogle';
import { LoginForm, RegisterForm } from '../data-schema/auth.type';

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
      },

      actionLogin: async (form: LoginForm) => {
        set({ errorLogin: '' });
        try {
          const result = await authApi.login(form);
          console.log(result.data);
          const accessToken = result?.data?.data?.accessToken;

          if (!accessToken) {
            console.error('Access Token not found:', result.data);
            throw new Error('Access Token is undefined');
          }

          set({ accessToken });

          return result.data.data;
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
          const result = await authApi.register(form);
          return result.data.data;
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
          await authApi.logout();
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
          const response = await authApi.refresh();
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
          const result = await loginGoogle();
          const accessToken = result?.data?.data?.accessToken;

          console.log('login :>> ', result);

          if (!accessToken) {
            console.error('Access Token not found:', result.data);
            throw new Error('Access Token is undefined');
          }

          set({ accessToken });

          return result.data.data; // Correct return value
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
