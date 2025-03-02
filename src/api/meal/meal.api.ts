import { AxiosResponse } from 'axios';
import axios from '../../config/axios';
import { RESTAURANT_BASE_API_ENDPOINT } from '../restaurant/restaurant.api';
import { ResponseData, ResponseDataList } from '@/data-schema/common.type';
import { CreateMealResponseDataType, Meal } from '@/data-schema/meal.type';

const restaurantBaseAPI = RESTAURANT_BASE_API_ENDPOINT.BASE;

const MEAL_BASE_API_ENDPOINT = {
  BASE: '/tags',
} as const;

const MEAL_API_ENDPOINTS = {
  GET_MANY: `${restaurantBaseAPI}${MEAL_BASE_API_ENDPOINT.BASE}`,
  AFTER_CATEGORY: function (categoryId: string): string {
    return `${restaurantBaseAPI}/${categoryId}${MEAL_BASE_API_ENDPOINT.BASE}`;
  },
  CREATE: function (categoryId: string): string {
    return this.AFTER_CATEGORY(categoryId);
  },
  UPDATE: function (categoryId: string): string {
    return this.AFTER_CATEGORY(categoryId);
  },
  DELETE: function (categoryId: string): string {
    return `${restaurantBaseAPI}/${categoryId}`;
  },
};

export const mealApi = {
  getMany: (): Promise<AxiosResponse<ResponseDataList<Meal[]>>> =>
    axios.get(MEAL_API_ENDPOINTS.GET_MANY),
  create: (
    categoryId: string,
    data: unknown,
  ): Promise<AxiosResponse<ResponseData<CreateMealResponseDataType>>> =>
    axios.post(MEAL_API_ENDPOINTS.CREATE(categoryId), data),
  update: function (
    categoryId: string,
    data: unknown,
  ): Promise<AxiosResponse<ResponseData<Meal>>> {
    return axios.patch(MEAL_API_ENDPOINTS.UPDATE(categoryId), data);
  },
};
