import { getVouchers } from '@/api/voucher/voucher';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  id: number;
  src: string;
}

export interface Voucher {
  id: number;
  name: string;
  price: number;
  voucherType: 'single' | 'package';
  promotionPrice?: number;
  stockAmount?: number;
  saleStartDate?: string;
  saleEndDate?: string;
  useDateStart?: string;
  useDateEnd?: string;
  restaurant: string;
  meal: string;
  passcode?: string;
  src?: string;
  carouselImages?: Image[];
  details?: string;
  conditions?: string;
  package?: { id: number; name: string; quantity: number }[];
  freeVoucher?: { id: number; name: string; quantity: number }[];
}

interface Restaurant {
  name: string;
}

interface SettingState {
  vouchers: Voucher[];
  restaurants: Restaurant[];
  meals: Restaurant[];
  actionGetVouchers: () => void;
  setRestaurant: (restaurant: Restaurant[]) => void;
  setMeal: (meal: Restaurant[]) => void;
  addVoucher: (voucher: Voucher) => void;
  updateVoucher: (id: number, updatedVoucher: Partial<Voucher>) => void;
  removeVoucher: (id: number) => void;
  createVoucher: (newVoucher: Omit<Voucher, 'id'>) => void;
  filteredVouchers: Voucher[];
  filterVouchers: (searchTerm: string) => void;
}

const useVoucherStore = create<SettingState>()(
  persist(
    (set) => ({
      vouchers: [
        {
          id: 1,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          voucherType: 'single',
          price: 1800,
          stockAmount: 1000,
          restaurant: 'Coffee Shop',
          meal: 'dinner',
          passcode: 'UsePass',
          src: 'https://i.imgur.com/41ygasy.png',
          carouselImages: [
            {
              id: 1,
              src: 'https://d24lh18o04muiz.cloudfront.net/66db2a49e8085191a7af970f/images/797a056c-c0e1-70ab-0a05-20391f0c3b39/1728443022-d7ygVEBB.jpg',
            },
            {
              id: 2,
              src: 'https://i.imgur.com/UelGops.jpeg',
            },
            {
              id: 3,
              src: 'https://i.imgur.com/hw3L8oP.jpeg',
            },
          ],
          details:
            'อาหารเช้า ซิกเนเจอร์ เคมปินสกี้ รวมเครื่องดื่มสปาร์คกลิ้งไวน์อย่างไม่จำกัด สำหรับ 2 ท่าน (วันจันทร์ – วันพฤหัสบดี) ราคาปกติ 2,942.50 บาทสุทธิ',
        },
        {
          id: 2,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          voucherType: 'single',
          price: 1800,
          stockAmount: 1000,
          restaurant: 'Coffee Shop',
          meal: 'dinner',
          src: 'https://i.imgur.com/41ygasy.png',
        },
        {
          id: 3,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          voucherType: 'single',
          price: 1800,
          stockAmount: 10,
          restaurant: 'Yok Chinese Restaurant',
          meal: 'dinner',
          passcode: 'saddxc',
          src: 'https://i.imgur.com/K6t4Xue.png',
        },
        {
          id: 4,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          voucherType: 'single',
          promotionPrice: 1299,
          stockAmount: 9,
          price: 1800,
          restaurant: 'Yok Chinese Restaurant',
          meal: 'dinner',
          src: 'https://i.imgur.com/DmSDV96.png',
        },
      ],
      restaurants: [
        { name: 'Coffee Shop' },
        { name: 'Yok Chinese Restaurant' },
        { name: 'Health club' },
      ],
      meals: [{ name: 'lunch' }, { name: 'dinner' }, { name: 'brunch' }],
      actionGetVouchers: async () => {
        try {
          const result = await getVouchers();
          const data = result?.data?.data;

          if (data) {
            set({ vouchers: data });
          } else {
            console.log('ไม่สามารถดึงข้อมูลได้ ใช้ข้อมูลเดิม');
            set({ vouchers: useVoucherStore.getState().vouchers });
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.log('actionGetVouchers error:', err);
          set({ vouchers: useVoucherStore.getState().vouchers });
        }
      },
      setRestaurant: (restaurants: Restaurant[]) => set({ restaurants }),
      setMeal: (meals: Restaurant[]) => set({ meals }),
      addVoucher: (voucher: Voucher) =>
        set((state) => ({ vouchers: [...state.vouchers, voucher] })),
      updateVoucher: (id: number, updatedVoucher: Partial<Voucher>) =>
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
      removeVoucher: (id: number) =>
        set((state) => ({
          vouchers: state.vouchers.filter((v) => v.id !== id),
        })),
      createVoucher: (newVoucher: Omit<Voucher, 'id'>) =>
        set((state) => {
          const newId = Math.max(0, ...state.vouchers.map((v) => v.id)) + 1;
          const voucherWithId = { id: newId, ...newVoucher };

          return { vouchers: [...state.vouchers, voucherWithId] };
        }),
      filteredVouchers: [],
      filterVouchers: (searchTerm) => {
        set((state) => {
          const filtered = state.vouchers.filter(
            (voucher: Voucher) =>
              voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              voucher.restaurant
                .toLowerCase()
                .includes(searchTerm.toLowerCase()),
          );
          return { filteredVouchers: filtered };
        });
      },
    }),

    {
      name: 'voucher-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useVoucherStore;
