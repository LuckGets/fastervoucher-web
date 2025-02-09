import axios from '../../config/axios';
import { changePasswordFormdata } from './types/changePassword.type';

export const getMe = () => axios.get('/account/me');

export const getVerify = () => axios.get('/account/verify');

export const firstVerify = (token: string) =>
  axios.patch('/account/verify', token);

export const editInfo = (
  formData: Record<string, string | number | null> | FormData,
  accountId: string,
) =>
  axios.patch(`/account/${accountId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const changePassword = (
  formData: changePasswordFormdata,
  accountId: string,
) => axios.patch(`/account/${accountId}/password`, formData);
