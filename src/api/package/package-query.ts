import {
  getManyProductQueriesOptionMapper,
  IGetManyProductQueriesOptions,
} from '../../data-schema/product.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { packageApi } from './package.api';
import { PackageDataSchema } from '../../data-schema/package.type';
import { AxiosResponse } from 'axios';
import { ResponseData } from '@/data-schema/common.type';
import { PRODUCT_INFINITE_QUERY_KEY } from '../products/product-query';

const PACKAGE_QUERY_KEY = {
  BASE: 'package',
  CREATE: 'create-package',
};

const PACKAGE_INFINITE_QUERY_KEY = 'infinite';

export const PackageQueryFunc = {
  getById: (id: PackageDataSchema['id']) => getByIdPackageQuery(id),
  getMany: (options: IGetManyProductQueriesOptions) =>
    getManyPackageQuery(options),
  getManyInfinite: (options: IGetManyProductQueriesOptions) =>
    getManyPackageInfiniteQuery(options),
};

function getByIdPackageQuery(id: string) {
  return queryOptions({
    queryKey: [PACKAGE_QUERY_KEY.BASE, id],
    queryFn: () => packageApi.getById(id),
  });
}

function getManyPackageQuery(options: IGetManyProductQueriesOptions) {
  const queriesArr = getManyProductQueriesOptionMapper(options);

  const validQueriesArr = queriesArr.filter(
    (query) => query !== 'undefined' && query !== undefined,
  );
  const queries = `?${validQueriesArr.join('&')}`;

  return queryOptions({
    queryKey: [PACKAGE_QUERY_KEY.BASE, ...validQueriesArr],
    queryFn: () => {
      return packageApi.getMany(queries);
    },
    placeholderData: keepPreviousData,
  });
}

function getManyPackageInfiniteQuery(options: IGetManyProductQueriesOptions) {
  return infiniteQueryOptions({
    queryKey: [
      PACKAGE_QUERY_KEY.BASE,
      PACKAGE_INFINITE_QUERY_KEY,
      ...getManyProductQueriesOptionMapper(options),
    ],
    queryFn: async ({ pageParam = '' }) => {
      const queriesArr = getManyProductQueriesOptionMapper(options);

      if (pageParam) queriesArr.push(`csr=${pageParam}`);
      const queries = `?${queriesArr.join('&')}`;
      return packageApi.getMany(queries);
    },
    initialPageParam: '',
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => lastPage.data.cursor ?? undefined,
  });
}

export function useCreatePackageVoucher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [PACKAGE_QUERY_KEY.CREATE],
    mutationFn: (
      data: FormData,
    ): Promise<AxiosResponse<ResponseData<PackageDataSchema>>> =>
      packageApi.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [PRODUCT_INFINITE_QUERY_KEY] }),
  });
}
