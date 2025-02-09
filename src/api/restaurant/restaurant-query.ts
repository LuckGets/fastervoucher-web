import { queryOptions } from '@tanstack/react-query';
import { restaurantApi } from './restaurant.api';
import {
  CreateRestaurantInput,
  Restaurant,
} from '@/data-schema/restaurant.type';
import { AxiosResponse } from 'axios';
import { ResponseData, ResponseDataList } from '@/data-schema/common.type';
import { mutationOptions } from '@/config/react-query';

const RESTAURANT_QUERY_KEY = {
  BASE: 'restaurant',
  CREATE: 'create',
};

export const RestaurantQueryFunc = {
  getMany: (page: number) => getManyRestaurantQuery(page),
  create: (data: CreateRestaurantInput) => createRestaurantMutation(data),
};

function getManyRestaurantQuery(page: number = 1) {
  return queryOptions<AxiosResponse<ResponseDataList<Restaurant[]>>>({
    queryKey: [RESTAURANT_QUERY_KEY, page],
    queryFn: restaurantApi.getMany,
  });
}

function createRestaurantMutation(data: CreateRestaurantInput) {
  return mutationOptions<AxiosResponse<ResponseData<Restaurant>>>({
    mutationKey: [RESTAURANT_QUERY_KEY.BASE, RESTAURANT_QUERY_KEY.CREATE],
    // The mutationFn should be a function that returns a Promise.
    mutationFn: () => restaurantApi.create(data),
  });
}
