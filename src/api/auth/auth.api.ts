import { ResponseData } from '@/data-schema/common.type';
import axios from '../../config/axios';
import { AxiosResponse } from 'axios';
import { RegisterForm, LoginForm, login } from '@/data-schema/auth.type';

const AUTH_BASE_API_ENDPOINT = '/auth';
const AUTH_API_ENDPOINTs = {
  REGISTER: `${AUTH_BASE_API_ENDPOINT}/register`,
  LOGIN: `${AUTH_BASE_API_ENDPOINT}/login`,
  REFRESH: `${AUTH_BASE_API_ENDPOINT}/refresh`,
  LOGOUT: `${AUTH_BASE_API_ENDPOINT}/logout`,
};

export const authApi = {
  register: (form: RegisterForm): Promise<AxiosResponse> =>
    axios.post(AUTH_API_ENDPOINTs.REGISTER, form),

  login: (form: LoginForm): Promise<AxiosResponse<ResponseData<login>>> =>
    axios.post(AUTH_API_ENDPOINTs.LOGIN, form),

  refresh: (): Promise<AxiosResponse<login>> =>
    axios.get(AUTH_API_ENDPOINTs.REFRESH, { withCredentials: true }),

  logout: (): Promise<AxiosResponse> => axios.get(AUTH_API_ENDPOINTs.LOGOUT),
};
