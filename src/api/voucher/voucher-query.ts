import { ResponseDataList } from '../../data-schema/common.type';
import { VoucherDataSchema } from '../../data-schema/voucher.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { voucherApi } from './voucher.api';
import NullableType from '../../utils/types/nullable.type';
import {
  getManyProductQueriesOptionMapper,
  IGetManyProductQueriesOptions,
} from '../../data-schema/product.type';

const VOUCHER_QUERY_KEY = 'voucher';

const VOUCHER_INFINITE_QUERY_KEY = 'infinite';
export const VoucherQueryFunc = {
  getMany: (options?: IGetManyProductQueriesOptions) =>
    getManyVouchersQuery(options),
  getManyInifinite: (options: IGetManyProductQueriesOptions) =>
    getManyVouchersInfiniteQuery(options),
  getById: (id: VoucherDataSchema['id']) => getVoucherByIdQuery(id),
};

function getManyVouchersQuery(
  options: IGetManyProductQueriesOptions = { page: 1 },
) {
  const queriesArr = getManyProductQueriesOptionMapper(options);
  const queries = `?${queriesArr.join('&')}`;
  return queryOptions({
    queryKey: [VOUCHER_QUERY_KEY, ...queriesArr],
    queryFn: () => {
      return voucherApi.getVouchers(queries);
    },
    placeholderData: keepPreviousData,
  });
}

function getManyVouchersInfiniteQuery(options: IGetManyProductQueriesOptions) {
  return infiniteQueryOptions<
    AxiosResponse<ResponseDataList<VoucherDataSchema[]>>
  >({
    queryKey: [
      VOUCHER_QUERY_KEY,
      VOUCHER_INFINITE_QUERY_KEY,
      ...getManyProductQueriesOptionMapper(options),
    ],
    queryFn: async ({ pageParam = '' }) => {
      // Generate the base query params from `options` every time
      //    so we start fresh each invocation.
      const queriesArr = getManyProductQueriesOptionMapper(options);

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
  });
}
