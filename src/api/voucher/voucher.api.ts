import { ResponseDataList } from '../../data-schema/common.type';
import axios from '../../config/axios';
import {
  CreateVoucherDataSchema,
  VoucherDataSchema,
} from '../../data-schema/voucher.type';
import { AxiosResponse } from 'axios';

const VOUCHER_BASE_API_ENDPOINT = {
  BASE: '/vouchers',
} as const;

const VOUCHER_API_ENDPOINTs = {
  GET_MANY: `${VOUCHER_BASE_API_ENDPOINT.BASE}`,
  GET_BY_ID: function (voucherId: string): string {
    return `${VOUCHER_BASE_API_ENDPOINT.BASE}/${voucherId}`;
  },
  CREATE: `${VOUCHER_BASE_API_ENDPOINT.BASE}`,
  UPDATE: function (voucherId: string): string {
    return `${VOUCHER_BASE_API_ENDPOINT.BASE}/${voucherId}`;
  },
  DELETE: function (voucherId: string): string {
    return `${VOUCHER_BASE_API_ENDPOINT.BASE}/${voucherId}`;
  },
};

export const voucherApi = {
  getVouchers: (
    queryOptions: string = '',
  ): Promise<AxiosResponse<ResponseDataList<VoucherDataSchema[]>>> =>
    axios.get(`${VOUCHER_API_ENDPOINTs.GET_MANY}${queryOptions}`),
  getVoucherById: (
    id: VoucherDataSchema['id'],
  ): Promise<AxiosResponse<ResponseDataList<VoucherDataSchema>>> =>
    axios.get(`${VOUCHER_API_ENDPOINTs.GET_BY_ID(id)}`),
  createVoucher: (
    data: CreateVoucherDataSchema,
  ): Promise<AxiosResponse<ResponseDataList<VoucherDataSchema>>> =>
    axios.post(`${VOUCHER_API_ENDPOINTs.CREATE}`, data),
};
