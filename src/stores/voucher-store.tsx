import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Image {
  id: number;
  src: string;
}

interface Promotion {
  name: string;
  price: number;
  startDate: string;
  endDate: string;
}

export interface Voucher {
  id: number;
  name: string;
  price: number;
  saleStartDate?: string;
  saleEndDate?: string;
  useDateStart?: string;
  useDateEnd?: string;
  promotion?: Promotion[];
  restaurant: string;
  meal: string;
  passcode?: string;
  src?: string;
  carouselImages?: Image[];
  detailsTh?: string;
  detailsEng?: string;
  conditionsTh?: Condition[];
  conditionsEng?: Condition[];
}

interface Restaurant {
  name: string;
}

export interface Condition {
  id: number;
  condition: string;
}

interface SettingState {
  vouchers: Voucher[];
  restaurants: Restaurant[];
  meals: Restaurant[];
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
          price: 1800,
          promotion: [
            {
              name: 'ไทยเที่ยวไทยครั้งที่ 77',
              price: 1299,
              startDate: '2024-12-25 00:00:00',
              endDate: '2025-03-01 11:59:00',
            },
          ],
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
          detailsTh:
            'อาหารเช้า ซิกเนเจอร์ เคมปินสกี้ รวมเครื่องดื่มสปาร์คกลิ้งไวน์อย่างไม่จำกัด สำหรับ 2 ท่าน (วันจันทร์ – วันพฤหัสบดี) ราคาปกติ 2,942.50 บาทสุทธิ',
          detailsEng:
            'Signature Kempinski Breakfast with free-flow sparkling wine for 2 persons (Monday–Thursday) Regular price THB 2,942.50 net',
          conditionsTh: [
            {
              id: 1,
              condition:
                'บัตรกำนัล E-voucher ราคานี้รวมค่าบริการ 10% และภาษีมูลค่าเพิ่ม 7%',
            },
            {
              id: 2,
              condition:
                'บัตรกำนัล E-voucher ไม่สามารถขอคืนเงิน ยกเลิก แลกเปลี่ยนหรือทอนเป็นเงินสดได้',
            },
            {
              id: 3,
              condition:
                'บัตรกำนัล E-voucher ไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นๆ และขอสงวนสิทธิ์ไม่ร่วมรายการในวันที่มีกิจกรรมพิเศษของห้องอาหาร',
            },
            {
              id: 4,
              condition:
                'บัตรกำนัลนี้ใช้ได้วันจันทร์ – วันพฤหัสบดี เวลา 06:30 - 11:00 น. ในกรณีสำรองที่นั่งล่วงหน้าได้ระหว่างเวลา 06:30 - 08:00 น. หลังจากนั้นจะเป็นการรอคิวตามลำดับที่หน้าห้องอาหาร',
            },
            {
              id: 5,
              condition: 'บัตรกำนัล E-voucher ใช้ได้ถึง 30 ธันวาคม 2567',
            },
            {
              id: 6,
              condition:
                'กรุณาสำรองที่นั่งล่วงหน้า โทร. 02 162 9000 และแสดงบัตรกำนัลต่อเจ้าหน้าที่ ณ วันที่ใช้บริการ',
            },
            {
              id: 7,
              condition:
                'บัตรกำนัล E-voucher ไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นๆ และขอสงวนสิทธิ์ไม่ร่วมรายการในวันที่มีกิจกรรมพิเศษของห้องอาหาร',
            },
          ],
          conditionsEng: [
            {
              id: 1,
              condition:
                'The e-voucher includes a 10% service charge and a 7% government tax.',
            },
            {
              id: 2,
              condition:
                'The e-voucher is non-refundable and cannot be redeemed for cash.',
            },
            {
              id: 3,
              condition:
                'The e-voucher is not valid during special events and cannot be combined with other discounts or third-party promotions.',
            },
            {
              id: 4,
              condition:
                'The e-voucher can be used from Monday to Thursday between 6:30 and 11:00. Advanced reservation is accepted between 6:30 and 08:00. After this time, walk-in options will be on a first-come, first-served basis.',
            },
            {
              id: 5,
              condition: 'The e-voucher is valid until 31 December 2024.',
            },
            {
              id: 6,
              condition:
                'Advanced reservations are required. Please call Hotel Guest Services at 02 162 9000. Presentation of the e-voucher is required upon redemption.',
            },
          ],
        },
        {
          id: 2,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          price: 1800,
          restaurant: 'Coffee Shop',
          meal: 'dinner',
          src: 'https://i.imgur.com/41ygasy.png',
          promotion: [],
        },
        {
          id: 3,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          price: 1800,
          restaurant: 'Yok Chinese Restaurant',
          meal: 'dinner',
          passcode: 'saddxc',
          src: 'https://i.imgur.com/K6t4Xue.png',
          promotion: [],
        },
        {
          id: 4,
          name: 'Premium Sushi & Seafood Buffet Dinner',
          price: 1800,
          promotion: [
            {
              name: 'ไทยเที่ยวไทยครั้งที่ 77',
              price: 1299,
              startDate: '2024-12-25 00:00:00',
              endDate: '2025-03-01 23:59:00',
            },
          ],
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
                promotion: v.promotion || [],
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
