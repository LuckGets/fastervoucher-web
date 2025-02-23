import { accountApi } from '../api/accounts/account';
import { changePasswordFormdata } from '../api/accounts/types/changePassword.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Account {
  id: string;
  fullname: string;
  phone: string;
  email: string;
  photo?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  verifiedAt: string | null;
}

export interface AccountState {
  accountInfo: Account | null;
  setAccountInfo: (accountInfo: Account | null) => void;
  actionGetMe: () => Promise<Account | null>;
  actionEditInfo: (
    formData: FormData | Record<string, string | number | null>,
    accountId: string | undefined,
  ) => Promise<void>;
  actionChangePassword: (
    body: changePasswordFormdata,
    accountId: string,
  ) => Promise<void>;
  actionFirstVerify: (token: string) => Promise<void>;
}

const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accountInfo: null,
      setAccountInfo: (accountInfo) => set({ accountInfo }),
      actionGetMe: async () => {
        try {
          const result = await accountApi.getMe();
          const data = result?.data?.data;

          if (data) {
            set({ accountInfo: data });
          }
          return data;
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionGetMe error:', err);
        }
      },
      actionEditInfo: async (
        formData: FormData | Record<string, string | number | null>,
        accountId: string | undefined,
      ) => {
        try {
          const result = await accountApi.editInfo(formData, accountId || '');

          set((state) => ({
            accountInfo: {
              ...state.accountInfo,
              ...formData,
            } as Account,
          }));

          console.log('result actionEditInfo:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionEditInfo error:', err);
        }
      },

      actionChangePassword: async (body, accountId) => {
        try {
          console.log('body :>> ', body);
          const result = await accountApi.changePassword(body, accountId);
          console.log('result actionChangePassword:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionChangePassword error:', err);
        }
      },

      actionGetVerify: async () => {
        try {
          const result = await accountApi.getVerify();
          console.log('result :>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionGetVerify error:', err);
        }
      },

      actionFirstVerify: async (token: string) => {
        try {
          const result = await accountApi.firstVerify(token);
          console.log('result actionChangePassword:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionFirstVerify error:', err);
        }
      },
    }),
    {
      name: 'account-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAccountStore;
