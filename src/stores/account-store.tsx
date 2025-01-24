import { changePassword, editInfo, getMe } from '@/api/accounts/account';
import { changePasswordFormdata } from '@/api/accounts/types/changePassword.type';
import { EditInfoBody } from '@/api/accounts/types/editInfo-body.type';
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
}

export interface AccountState {
  accountInfo: Account | null;
  actionGetMe: (accessToken: string) => Promise<Account | null>;
  actionEditInfo: (
    formData: EditInfoBody[],
    accountId: string | undefined,
    accessToken: string | null,
  ) => Promise<void>;
  actionChangePassword: (
    body: changePasswordFormdata,
    accountId: string,
    accessToken: string,
  ) => Promise<void>;
}

const useAccountStore = create<AccountState>()(
  persist(
    (set) => ({
      accountInfo: null,
      actionGetMe: async () => {
        try {
          const result = await getMe();
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
        formData: EditInfoBody[],
        accountId: string | undefined,
      ) => {
        try {
          const result = await editInfo(formData, accountId || '');

          const updatedAccountInfo = formData.reduce(
            (acc, item) => {
              const value =
                item.value instanceof File
                  ? item.value.name
                  : typeof item.value === 'number'
                    ? item.value.toString()
                    : (item.value ?? null);

              acc[item.field] = value as string | null;
              return acc;
            },
            {} as Record<string, string | null>,
          );

          set((state) => {
            const currentAccountInfo = state.accountInfo || {};
            return {
              accountInfo: {
                ...currentAccountInfo,
                ...updatedAccountInfo,
              } as Account,
            };
          });

          console.log('result actionEditInfo:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionEditInfo error:', err);
        }
      },

      actionChangePassword: async (formData, accountId) => {
        try {
          const result = await changePassword(formData, accountId);
          console.log('result actionChangePassword:>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionGetMe error:', err);
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
