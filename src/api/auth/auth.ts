import axios from '../../config/axios';
import { LoginForm } from './types/login-form.types';
import { RegisterForm } from './types/register-form.types';

export const register = (form: RegisterForm) =>
  axios.post('/auth/register', form);

export const login = (form: LoginForm) => axios.post('/auth/login', form);

export const refresh = (refreshToken: string) =>
  axios.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    withCredentials: true,
  });

export const logout = () => axios.get('/auth/logout');
