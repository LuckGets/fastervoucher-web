import axios from '../../config/axios';
import { changePasswordFormdata } from './types/changePassword.type';

const ACCOUNT_BASE_API_ENDPOINT = '/account';
const ACCOUNT_API_ENDPOINTs = {
  GET_ME: `${ACCOUNT_BASE_API_ENDPOINT}/me`,
  GET_VERIFY: `${ACCOUNT_BASE_API_ENDPOINT}/verify`,
  FIRST_VERIFY: `${ACCOUNT_BASE_API_ENDPOINT}/verify`,
  EDIT_INFO: (accountId: string) => `${ACCOUNT_BASE_API_ENDPOINT}/${accountId}`,
  CHANGE_PASSWORD: (accountId: string) =>
    `${ACCOUNT_BASE_API_ENDPOINT}/${accountId}/password`,
  CONFIRM_PASSWORD: `${ACCOUNT_BASE_API_ENDPOINT}/confirm-password`,
};

export const accountApi = {
  getMe: () => axios.get(ACCOUNT_API_ENDPOINTs.GET_ME),

  getVerify: () => axios.get(ACCOUNT_API_ENDPOINTs.GET_VERIFY),

  firstVerify: (token: string) =>
    axios.patch(ACCOUNT_API_ENDPOINTs.FIRST_VERIFY, { token }),

  editInfo: (
    formData: Record<string, string | number | null> | FormData,
    accountId: string,
  ) =>
    axios.patch(ACCOUNT_API_ENDPOINTs.EDIT_INFO(accountId), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  changePassword: (formData: changePasswordFormdata, accountId: string) =>
    axios.patch(ACCOUNT_API_ENDPOINTs.CHANGE_PASSWORD(accountId), formData),
  confirmPassword: (token: string) =>
    axios.patch(ACCOUNT_API_ENDPOINTs.CONFIRM_PASSWORD, { token }),
};
