import { getCategories, getTag } from '@/api/category/category';
import {
  getVoucherById,
  getVouchers,
  getVouchersBySearch,
} from '@/api/voucher/voucher';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  id: string;
  src: string;
}

interface Discount {
  discountedPrice: number;
  status: string;
}

interface Images {
  id: string;
  imgPath: string;
  mainImg: boolean;
}

export interface Voucher {
  id: string;
  title: string;
  price: number;
  promotionPrice?: number;
  voucherType: 'single' | 'package';
  discount?: Discount;
  stockAmount?: number;
  sellStartedAt?: string;
  sellExpiredAt?: string;
  termAndCondition?: string;
  status?: string;
  usableAt?: string;
  usableExpiredAt?: string;
  category: string;
  tag: string;
  passcode?: string;
  images?: Images | null;
  carouselImages?: Image[] | null;
  details?: string;
  package?: { id: number; name: string; quantity: number }[];
  freeVoucher?: { id: number; name: string; quantity: number }[];
}

interface Restaurant {
  name: string;
}

interface SettingState {
  voucherById: Voucher | null;
  vouchers: Voucher[];
  categories: Restaurant[];
  tags: Restaurant[];
  actionGetVouchers: () => void;
  actionGetVoucherById: (voucherId: string) => void;
  actionGetCategoriesAndTags: () => void;
  setRestaurant: (restaurant: Restaurant[]) => void;
  setTags: (tags: Restaurant[]) => void;
  addVoucher: (voucher: Voucher) => void;
  updateVoucher: (id: string, updatedVoucher: Partial<Voucher>) => void;
  removeVoucher: (id: string) => void;
  createVoucher: (newVoucher: Omit<Voucher, 'id'>) => void;
  filteredVouchers: Voucher[];
  filterVouchers: (searchTerm: string) => void;
}

const useVoucherStore = create<SettingState>()(
  persist(
    (set) => ({
      voucherById: null,
      vouchers: [
        {
          id: '1',
          title: 'Premium Sushi & Seafood Buffet Dinner',
          voucherType: 'single',
          price: 1800,
          stockAmount: 1000,
          category: 'Coffee Shop',
          tag: 'dinner',
          passcode: 'UsePass',
          img: { id: '1', imgPath: 'https://i.imgur.com/41ygasy.png' },
          carouselImages: [
            {
              id: '1',
              src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
            },
            {
              id: '2',
              src: 'https://i.imgur.com/UelGops.jpeg',
            },
            {
              id: '3',
              src: 'https://i.imgur.com/hw3L8oP.jpeg',
            },
          ],
          details:
            'อาหารเช้า ซิกเนเจอร์ เคมปินสกี้ รวมเครื่องดื่มสปาร์คกลิ้งไวน์อย่างไม่จำกัด สำหรับ 2 ท่าน (วันจันทร์ – วันพฤหัสบดี) ราคาปกติ 2,942.50 บาทสุทธิ',
        },
      ],
      categories: [
        { name: 'Coffee Shop' },
        { name: 'Yok Chinese Restaurant' },
        { name: 'Health club' },
      ],
      tags: [{ name: 'lunch' }, { name: 'dinner' }, { name: 'brunch' }],
      actionGetVouchers: async () => {
        try {
          const result = await getVouchers();
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
          const result = await getVoucherById(voucherId);
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
            set({ categories: categoriesData });
          }
          const tagsData = tags?.data?.data;
          if (tagsData) {
            set({ tags: tagsData });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
      setRestaurant: (categories: Restaurant[]) => set({ categories }),
      setTags: (tags: Restaurant[]) => set({ tags }),
      addVoucher: (voucher: Voucher) =>
        set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      updateVoucher: (id: string, updatedVoucher: Partial<Voucher>) =>
        set((state) => ({
          vouchers: state.vouchers.map((v) => {
            if (v.id === id) {
              return {
                ...v,
                ...updatedVoucher,
              };
            }
            return v;
          }),
        })),
      removeVoucher: (id: string) =>
        set((state) => ({
          vouchers: state.vouchers.filter((v) => v.id !== id),
        })),
      createVoucher: (newVoucher: Omit<Voucher, 'id'>) =>
        set((state) => {
          const newId = `${Date.now()}`;
          const voucherWithId = { id: newId, ...newVoucher };

          return { vouchers: [...state.vouchers, voucherWithId] };
        }),
      filteredVouchers: [],
      filterVouchers: async (searchTerm) => {
        try {
          if (!searchTerm) {
            set({ vouchers: useVoucherStore.getState().vouchers });
          } else {
            const result = await getVouchersBySearch(searchTerm);
            const data = result?.data?.data;

            if (data && Array.isArray(data)) {
              set({ vouchers: data });
            } else {
              console.log('Voucher information not correct');
              set({ vouchers: useVoucherStore.getState().vouchers });
            }
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher data:', err?.message || err);
        }
      },
    }),
    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
