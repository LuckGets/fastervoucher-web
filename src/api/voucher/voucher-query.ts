import { IPaginationOption, ResponseDataList } from '@/data-schema/common.type';
import {
  getManyVoucherQueriesOptionMapper,
  VoucherDataSchema,
} from '@/data-schema/voucher.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { voucherApi } from './voucher.api';
import { Meal, Restaurant } from '@/data-schema/restaurant.type';
import NullableType from '@/utils/types/nullable.type';

const VOUCHER_QUERY_KEY = 'voucher';

const VOUCHER_INFINITE_QUERY_KEY = 'infinite';

export enum VoucherStatusQueryEnum {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum VoucherSellDateQueryEnum {
  ALL = 'ALL',
  EXPIRED = 'EXPIRED',
  NOW = 'NOW',
}

export enum VoucherDiscountQueryEnum {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  NONE = 'NONE',
}

export interface IGetManyVoucherQueryOption extends IPaginationOption {
  status?: VoucherStatusQueryEnum;
  discount?: VoucherDiscountQueryEnum;
  sellDate?: VoucherSellDateQueryEnum;
  restaurantId?: Restaurant['name'];
  meal?: Meal['id'];
}

export const VoucherQueryFunc = {
  getMany: (options?: IGetManyVoucherQueryOption) =>
    getManyVouchersQuery(options),
  getManyInifinite: (options: IGetManyVoucherQueryOption) =>
    getManyVouchersInfiniteQuery(options),
  getById: (id: VoucherDataSchema['id']) => getVoucherByIdQuery(id),
};

function getManyVouchersQuery(
  options: IGetManyVoucherQueryOption = { page: 1 },
) {
  const queriesArr = getManyVoucherQueriesOptionMapper(options);
  const queries = `?${queriesArr.join('&')}`;
  return queryOptions({
    queryKey: [VOUCHER_QUERY_KEY, ...queriesArr],
    queryFn: () => {
      return voucherApi.getVouchers(queries);
    },
    placeholderData: keepPreviousData,
  });
}

function getManyVouchersInfiniteQuery(options: IGetManyVoucherQueryOption) {
  return infiniteQueryOptions<
    AxiosResponse<ResponseDataList<VoucherDataSchema[]>>
  >({
    queryKey: [
      VOUCHER_QUERY_KEY,
      VOUCHER_INFINITE_QUERY_KEY,
      ...getManyVoucherQueriesOptionMapper(options),
    ],
    queryFn: async ({ pageParam = '' }) => {
      // 1. Generate the base query params from `options` every time
      //    so we start fresh each invocation.
      const queriesArr = getManyVoucherQueriesOptionMapper(options);

      // 2. If we have a cursor from the previous page, add it with
      //    the param name.
      if (pageParam) {
        queriesArr.push(`csr=${pageParam}`);
      }

      const queries = `?${queriesArr.join('&')}`;
      return voucherApi.getVouchers(queries);
    },
    getNextPageParam: (lastPage) => {
      // 3. Return the next cursor from the latest response
      //    so React Query can feed it back in `pageParam`.
      return lastPage?.data?.cursor || undefined;
    },
    initialPageParam: '',
    placeholderData: keepPreviousData,
  });
}

function getVoucherByIdQuery(id: VoucherDataSchema['id']) {
  return queryOptions<
    AxiosResponse<ResponseDataList<NullableType<VoucherDataSchema>>>
  >({
    queryKey: [VOUCHER_QUERY_KEY, id],
    queryFn: () => voucherApi.getVoucherById(id),
    enabled: !!id,
  });
}
