import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { restaurantApi } from './restaurant.api';
import {
  CreateRestaurantInput,
  Restaurant,
} from '../../data-schema/restaurant.type';
import { AxiosResponse } from 'axios';
import { ResponseData, ResponseDataList } from '../../data-schema/common.type';

export const RESTAURANT_QUERY_KEY = {
  BASE: 'restaurant',
  CREATE: 'create',
};

export const RestaurantQueryFunc = {
  getMany: () => getManyRestaurantQuery(),
};

function getManyRestaurantQuery() {
  return queryOptions<AxiosResponse<ResponseDataList<Restaurant[]>>>({
    queryKey: [RESTAURANT_QUERY_KEY.BASE],
    queryFn: restaurantApi.getMany,
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [RESTAURANT_QUERY_KEY.BASE, RESTAURANT_QUERY_KEY.CREATE],
    mutationFn: (
      data: CreateRestaurantInput,
    ): Promise<AxiosResponse<ResponseData<Restaurant>>> =>
      restaurantApi.create(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [RESTAURANT_QUERY_KEY.BASE],
      }),
  });
}

export function useFetchRestaurantFromId(restaurantId: Restaurant['id']) {
  return useQuery({
    queryKey: [RESTAURANT_QUERY_KEY.BASE, restaurantId],
    queryFn: () => restaurantApi.getById(restaurantId),
    enabled: !!restaurantId,
  });
}
