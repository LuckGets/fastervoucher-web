import { ResponseDataList } from '@/data-schema/common.type';
import { OrderDataSchema } from '@/data-schema/order.type';
import { AxiosResponse } from 'axios';
import axios from '../../config/axios';

const ORDER_BASE_API_ENDPOINT = {
  BASE: '/orders',
} as const;

const ORDER_API_ENDPOINTs = {
  GET_MANY: `${ORDER_BASE_API_ENDPOINT.BASE}`,
  GET_BY_ID: function (orderId: string): string {
    return `${ORDER_BASE_API_ENDPOINT.BASE}/${orderId}`;
  },
  CREATE: `${ORDER_BASE_API_ENDPOINT.BASE}`,
  UPDATE: function (orderId: string): string {
    return `${ORDER_BASE_API_ENDPOINT.BASE}/${orderId}`;
  },
};

export const voucherApi = {
  getOrders: (
    queryOptions: string = '',
  ): Promise<AxiosResponse<ResponseDataList<OrderDataSchema[]>>> =>
    axios.get(`${ORDER_API_ENDPOINTs.GET_MANY}${queryOptions}`),
  getOrdersById: (
    id: OrderDataSchema['id'],
  ): Promise<AxiosResponse<ResponseDataList<OrderDataSchema>>> =>
    axios.get(`${ORDER_API_ENDPOINTs.GET_BY_ID(id)}`),
  createOrder: (
    data: OrderDataSchema,
  ): Promise<AxiosResponse<ResponseDataList<OrderDataSchema>>> =>
    axios.post(`${ORDER_API_ENDPOINTs.CREATE}`, data),
};
