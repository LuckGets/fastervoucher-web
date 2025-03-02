import {
  CreateRestaurantInput,
  Restaurant,
} from '../../data-schema/restaurant.type';
import axios from '../../config/axios';
import { AxiosResponse } from 'axios';
import { ResponseData, ResponseDataList } from '../../data-schema/common.type';
import NullableType from '../../utils/types/nullable.type';

export const RESTAURANT_BASE_API_ENDPOINT = {
  BASE: '/categories',
} as const;

export const RESTAURANT_API_ENDPOINT = {
  GET_MANY: `${RESTAURANT_BASE_API_ENDPOINT.BASE}`,
  GET_BY_ID: function (categoryId: string): string {
    return `${RESTAURANT_BASE_API_ENDPOINT.BASE}/${categoryId}`;
  },
  CREATE: `${RESTAURANT_BASE_API_ENDPOINT.BASE}`,
  UPDATE: function (categoryId: string): string {
    return `${RESTAURANT_BASE_API_ENDPOINT.BASE}/${categoryId}`;
  },
  DELETE: function (categoryId: string): string {
    return `${RESTAURANT_BASE_API_ENDPOINT.BASE}/${categoryId}`;
  },
};

export const restaurantApi = {
  getMany: (): Promise<AxiosResponse<ResponseDataList<Restaurant[]>>> =>
    axios.get(RESTAURANT_API_ENDPOINT.GET_MANY),
  getById: function (
    categoryId: string,
  ): Promise<AxiosResponse<ResponseData<NullableType<Restaurant>>>> {
    return axios.get(RESTAURANT_API_ENDPOINT.GET_BY_ID(categoryId));
  },
  create: function (
    data: CreateRestaurantInput,
  ): Promise<AxiosResponse<ResponseData<Restaurant>>> {
    return axios.post(RESTAURANT_API_ENDPOINT.CREATE, data);
  },
  update: (
    categoryId: string,
    data: unknown,
  ): Promise<AxiosResponse<ResponseData<Restaurant>>> =>
    axios.patch(RESTAURANT_API_ENDPOINT.UPDATE(categoryId), data),
};
