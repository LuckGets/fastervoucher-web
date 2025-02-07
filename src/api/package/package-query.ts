import {
  getManyProductQueriesOptionMapper,
  IGetManyProductQueriesOptions,
} from '@/data-schema/product.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from '@tanstack/react-query';
import { packageApi } from './package.api';
import { PackageDataSchema } from '@/data-schema/package.type';

const PACKAGE_QUERY_KEY = 'package';

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
    queryKey: [PACKAGE_QUERY_KEY, id],
    queryFn: () => packageApi.getById(id),
  });
}

function getManyPackageQuery(options: IGetManyProductQueriesOptions) {
  const queriesArr = getManyProductQueriesOptionMapper(options);
  const queries = `?${queriesArr.join('&')}`;
  return queryOptions({
    queryKey: [PACKAGE_QUERY_KEY, ...queriesArr],
    queryFn: () => {
      return packageApi.getMany(queries);
    },
    placeholderData: keepPreviousData,
  });
}

function getManyPackageInfiniteQuery(options: IGetManyProductQueriesOptions) {
  return infiniteQueryOptions({
    queryKey: [
      PACKAGE_QUERY_KEY,
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
