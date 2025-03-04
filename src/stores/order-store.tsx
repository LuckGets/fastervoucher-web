import { orderApi } from '../api/order/order.api';
import { OrderDataSchema } from '../data-schema/order.type';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OrderState {
  myOrders: OrderDataSchema[];
  actionGetMyOrder: () => void;
}

const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      myOrders: [],
      actionGetMyOrder: async () => {
        try {
          const result = await orderApi.getMyOrder();
          const data = result?.data?.data;
          if (data && Array.isArray(data)) {
            set({ myOrders: data });
          } else {
            console.log('Order information not correct');
          }
        } catch (error) {
          const err = error as AxiosError<{ message: string }>;
          console.error('Error fetching voucher by ID:', err?.message || err);
        }
      },
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useOrderStore;
