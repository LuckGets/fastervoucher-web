import { getCategories, getTag } from '../api/category/category';
import { voucherApi } from '../api/voucher/voucher.api';
import { Meal, Restaurant } from '../data-schema/restaurant.type';
import {
  CreateVoucherDataSchema,
  VoucherDataSchema,
} from '../data-schema/voucher.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  id: string;
  imgPath: string;
  mainImg: boolean;
}

export enum DiscountStatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'inactive',
}

type Discount = {
  id: string;
  discountedPrice: number;
  status: DiscountStatusEnum;
};

export interface Voucher {
  id: number;
  title: string;
  price: number;
  promotionPrice?: number;
  voucherType: 'single' | 'package';
  discount?: Discount;
  stockAmount: number;
  sellStartAt?: string;
  sellExpiredAt?: string;
  usableAt?: string;
  usableExpiredAt?: string;
  restaurant: string;
  meal: string;
  passcode?: string;
  images?: Image | null;
  carouselImages?: Image[] | null;
  details?: string;
  termAndCond: string;
  package?: { id: number; name: string; quantity: number }[];
  freeVoucher?: { id: number; name: string; quantity: number }[];
}

interface SettingState {
  voucherById: VoucherDataSchema | null;
  vouchers: VoucherDataSchema[];
  restaurants: Restaurant[];
  meals: Meal[];
  actionGetVouchers: () => void;
  actionGetVoucherById: (voucherId: string) => void;
  actionGetCategoriesAndTags: () => void;
  actionCreateVoucher: (data: CreateVoucherDataSchema) => void;
  setRestaurant: (restaurant: Restaurant[]) => void;
  setMeal: (meal: Restaurant[]) => void;
  setVoucher: (voucher: VoucherDataSchema[]) => void;
  addVoucher: (voucher: VoucherDataSchema) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const useVoucherStore = create<SettingState>()(
  persist(
    (set) => ({
      voucherById: null,
      vouchers: [],
      restaurants: [],
      meals: [],
      actionGetVouchers: async () => {
        try {
          const result = await voucherApi.getVouchers();
          const data = result?.data?.data;

          if (data && Array.isArray(data)) {
            set({ vouchers: data });
          } else {
            console.log('Voucher information not correct');
            set({ vouchers: useVoucherStore.getState().vouchers });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher data:', err?.message || err);
          set({ vouchers: useVoucherStore.getState().vouchers });
        }
      },
      actionGetVoucherById: async (voucherId: string) => {
        try {
          const result = await voucherApi.getVoucherById(voucherId);
          const data = result?.data?.data;

          if (data) {
            set({ voucherById: data });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      actionGetCategoriesAndTags: async () => {
        try {
          const categories = await getCategories();
          const tags = await getTag();

          const categoriesData = categories?.data?.data;
          if (categoriesData) {
            set({ restaurants: categoriesData });
          }
          const tagsData = tags?.data?.data;
          if (tagsData) {
            set({ meals: tagsData });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      actionCreateVoucher: async (data) => {
        try {
          const result = await voucherApi.createVoucher(data);

          console.log('result :>> ', result);
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      setVoucher: (vouchers: VoucherDataSchema[]) => set({ vouchers }),
      setRestaurant: (restaurants: Restaurant[]) => set({ restaurants }),
      setMeal: (meals: Restaurant[]) => set({ meals }),
      addVoucher: (voucher: VoucherDataSchema) =>
        set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      // updateVoucher: (id: number, updatedVoucher: Partial<Voucher>) =>
      //   set((state) => ({
      //     vouchers: state.vouchers.map((v) => {
      //       if (v.id === id) {
      //         return {
      //           ...v,
      //           ...updatedVoucher,
      //         };
      //       }
      //       return v;
      //     }),
      //   })),

      // createVoucher: (newVoucher: Omit<Voucher, 'id'>) =>
      //   set((state) => {
      //     const newId = Math.max(0, ...state.vouchers.map((v) => v.id)) + 1;
      //     const voucherWithId = { id: newId, ...newVoucher };

      //     return { vouchers: [...state.vouchers, voucherWithId] };
      //   }),
      searchTerm: '',
      setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    }),
    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
