import axios from '../../config/axios';
import { changePasswordFormdata } from './types/changePassword.type';
import { EditInfoBody } from './types/editInfo-body.type';

export const getMe = () => axios.get('/account/me', { withCredentials: true });

export const editInfo = (formData: EditInfoBody[], accountId: string) =>
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
