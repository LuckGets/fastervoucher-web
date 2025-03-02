import { ResponseData, ResponseDataList } from '../../data-schema/common.type';
import { VoucherDataSchema } from '../../data-schema/voucher.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { voucherApi } from './voucher.api';
import NullableType from '../../utils/types/nullable.type';
import {
  getManyProductQueriesOptionMapper,
  IGetManyProductQueriesOptions,
} from '../../data-schema/product.type';

const VOUCHER_QUERY_KEY = {
  BASE: 'voucher',
  CREATE: 'create',
  INFINITE: 'infinite',
};

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
    queryKey: [VOUCHER_QUERY_KEY.BASE, ...queriesArr],
    queryFn: () => {
      return voucherApi.getVouchers(queries);
    },
    placeholderData: keepPreviousData,
  });
}

function getManyVouchersInfiniteQuery(options: IGetManyProductQueriesOptions) {
  return infiniteQueryOptions({
    queryKey: [
      VOUCHER_QUERY_KEY.BASE,
      VOUCHER_QUERY_KEY.INFINITE,
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
      return lastPage?.cursor || undefined;
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

export function useCreateVoucher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [VOUCHER_QUERY_KEY.CREATE],
    mutationFn: (
      data: FormData,
    ): Promise<AxiosResponse<ResponseData<VoucherDataSchema>>> =>
      voucherApi.createVoucher(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [VOUCHER_QUERY_KEY.BASE],
      }),
  });
}

export function useFetchedVouchers<T>(
  options: IGetManyProductQueriesOptions,
  enableAttr: T,
) {
  const queryOption = { ...getManyVouchersQuery(options) };
  if (enableAttr) queryOption.enabled = !!enableAttr;
  return useQuery(queryOption);
}

export function useFetchedInfiniteVouchers<T>(
  options: IGetManyProductQueriesOptions,
  enableAttr: T,
) {
  const queryOption = { ...getManyVouchersInfiniteQuery(options) };
  if (enableAttr) queryOption.enabled = !!enableAttr;
  return useInfiniteQuery(queryOption);
}
