import { voucherApi } from '@/api/voucher/voucher.api';
import { Meal, Restaurant } from '@/data-schema/restaurant.type';
import { VoucherDataSchema } from '@/data-schema/voucher.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  id: string;
  imgPath: string;
  mainImg: boolean;
}

enum DiscountStatusEnum {
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
  images?: Images | null;
  carouselImages?: Image[] | null;
  details?: string;
  package?: { id: number; name: string; quantity: number }[];
  freeVoucher?: { id: number; name: string; quantity: number }[];
}

interface SettingState {
  vouchers: VoucherDataSchema[];
  restaurants: Restaurant[];
  meals: Meal[];
  actionGetVouchers: () => void;
  actionGetVoucherById: (voucherId: string) => void;
  actionGetCategoriesAndTags: () => void;
  setRestaurant: (restaurant: Restaurant[]) => void;
  setMeal: (meal: Restaurant[]) => void;
  setVoucher: (voucher: VoucherDataSchema[]) => void;
  addVoucher: (voucher: VoucherDataSchema) => void;
  filteredVouchers: Voucher[];
}

const useVoucherStore = create<SettingState>()(
  persist(
    (set) => ({
      voucherById: null,
      vouchers: [
        // {
        //   id: 1,
        //   name: 'Premium Sushi & Seafood Buffet Dinner',
        //   voucherType: 'single',
        //   price: 1800,
        //   stockAmount: 1000,
        //   restaurant: 'Coffee Shop',
        //   meal: 'dinner',
        //   passcode: 'UsePass',
        //   src: 'https://i.imgur.com/41ygasy.png',
        //   carouselImages: [
        //     {
        //       id: 1,
        //       src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
        //     },
        //     {
        //       id: 2,
        //       src: 'https://i.imgur.com/UelGops.jpeg',
        //     },
        //     {
        //       id: 3,
        //       src: 'https://i.imgur.com/hw3L8oP.jpeg',
        //     },
        //   ],
        //   details:
        //     'อาหารเช้า ซิกเนเจอร์ เคมปินสกี้ รวมเครื่องดื่มสปาร์คกลิ้งไวน์อย่างไม่จำกัด สำหรับ 2 ท่าน (วันจันทร์ – วันพฤหัสบดี) ราคาปกติ 2,942.50 บาทสุทธิ',
        // },
        // {
        //   id: 2,
        //   name: 'Premium Sushi & Seafood Buffet Dinner',
        //   voucherType: 'single',
        //   price: 1800,
        //   stockAmount: 1000,
        //   restaurant: 'Coffee Shop',
        //   meal: 'dinner',
        //   src: 'https://i.imgur.com/41ygasy.png',
        // },
        // {
        //   id: 3,
        //   name: 'Premium Sushi & Seafood Buffet Dinner',
        //   voucherType: 'single',
        //   price: 1800,
        //   stockAmount: 10,
        //   restaurant: 'Yok Chinese Restaurant',
        //   meal: 'dinner',
        //   passcode: 'saddxc',
        //   src: 'https://i.imgur.com/K6t4Xue.png',
        // },
        // {
        //   id: 4,
        //   name: 'Premium Sushi & Seafood Buffet Dinner',
        //   voucherType: 'single',
        //   promotionPrice: 1299,
        //   stockAmount: 9,
        //   price: 1800,
        //   restaurant: 'Yok Chinese Restaurant',
        //   meal: 'dinner',
        //   src: 'https://i.imgur.com/DmSDV96.png',
        // },
      ],
      restaurants: [],
      meals: [
        // { name: 'lunch' }, { name: 'dinner' }, { name: 'brunch' }
      ],
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
      filteredVouchers: [],
      // filterVouchers: (searchTerm) => {
      //   set((state) => {
      //     const filtered = state.vouchers.filter(
      //       (voucher: Voucher) =>
      //         voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //         voucher.restaurant
      //           .toLowerCase()
      //           .includes(searchTerm.toLowerCase()),
      //     );
      //     return { filteredVouchers: filtered };
      //   });
      // },
    }),
    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
