import { ResponseData } from '@/data-schema/common.type';
import { Restaurant } from '@/data-schema/restaurant.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { mealApi } from './meal.api';
import {
  CreateMealInput,
  CreateMealResponseDataType,
} from '@/data-schema/meal.type';
import { RESTAURANT_QUERY_KEY } from '../restaurant/restaurant-query';

const MEAL_QUERY_KEY = {
  BASE: 'meal',
  CREATE: 'create',
};

export function useCreateMeal(restaurantId: Restaurant['id']) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [
      RESTAURANT_QUERY_KEY.BASE,
      MEAL_QUERY_KEY.BASE,
      MEAL_QUERY_KEY.CREATE,
    ],
    mutationFn: (
      data: CreateMealInput,
    ): Promise<AxiosResponse<ResponseData<CreateMealResponseDataType>>> =>
      mealApi.create(restaurantId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [RESTAURANT_QUERY_KEY.BASE, restaurantId],
      }),
  });
}
