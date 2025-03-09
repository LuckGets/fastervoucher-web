import {
  getManyProductQueriesOptionMapper,
  IGetManyProductQueriesOptions,
} from '@/data-schema/product.type';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { productApi } from './product.api';

export const PRODUCT_QUERY_KEY = 'products';

export const PRODUCT_INFINITE_QUERY_KEY = 'products-infinity';

function getManyProductQuery(options: IGetManyProductQueriesOptions) {
  const queriesArr = getManyProductQueriesOptionMapper(options);

  const validQueriesArr = queriesArr.filter((query) => !!query);
  const queries = `?${validQueriesArr.join('&')}`;

  return queryOptions({
    queryKey: [PRODUCT_QUERY_KEY, ...validQueriesArr],
    queryFn: () => productApi.getMany(queries),
    placeholderData: keepPreviousData,
  });
}

function getManyProductInfiniteQuery(options: IGetManyProductQueriesOptions) {
  const queriesArr = getManyProductQueriesOptionMapper(options);
  return infiniteQueryOptions({
    queryKey: [PRODUCT_INFINITE_QUERY_KEY, ...queriesArr],
    queryFn: async ({ pageParam = 1 }) => {
      if (pageParam > 1) queriesArr.push(`p=${pageParam}`);
      const queries = `?${queriesArr.join('&')}`;
      return productApi.getMany(queries);
    },
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => (+lastPage.page ? +lastPage.page + 1 : 1),
    getPreviousPageParam: (lastPage) =>
      +lastPage.page > 1 ? +lastPage.page - 1 : 1,
  });
}

export function useGetManyProductQuery(options: IGetManyProductQueriesOptions) {
  return useQuery(getManyProductQuery(options));
}

export function useGetManyInfiniteProductQuery(
  options: IGetManyProductQueriesOptions,
) {
  return useInfiniteQuery(getManyProductInfiniteQuery(options));
}
