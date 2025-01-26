import axios from '../../config/axios';
import { changePasswordFormdata } from './types/changePassword.type';

export const getMe = () => axios.get('/account/me', { withCredentials: true });

export const getVerify = () =>
  axios.get('/account/verify', { withCredentials: true });

export const firstVerify = (token: string) =>
  axios.patch('/account/verify', token, { withCredentials: true });

export const editInfo = (
  formData: Record<string, string | number | null> | FormData,
  accountId: string,
) =>
  axios.patch(`/account/${accountId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

export const changePassword = (
  formData: changePasswordFormdata,
  accountId: string,
) =>
  axios.patch(`/account/${accountId}/password`, formData, {
    withCredentials: true,
  });
