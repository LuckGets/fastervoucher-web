import { login } from '@/data-schema/auth.type';
import axios from '../../config/axios';
import { AxiosResponse } from 'axios';

const GOOGLE_BASE_API_ENDPOINT = '/auth/google/';

const AUTH_API_ENDPOINTs = {
  LOGIN: `${GOOGLE_BASE_API_ENDPOINT}/login`,
  CALLBACK: `${GOOGLE_BASE_API_ENDPOINT}/callback`,
};

export const googleAuthApi = {
  loginGoogle: (): Promise<AxiosResponse<login>> =>
    axios.post(AUTH_API_ENDPOINTs.LOGIN),

  loginGoogleCallBack: (): Promise<AxiosResponse<login>> =>
    axios.get(AUTH_API_ENDPOINTs.CALLBACK),
};
