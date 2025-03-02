import { Meal } from './meal.type';

export const ALL_RESTAURNT = 'All';

export type Restaurant = {
  id: string;
  name: string;
  VoucherTags: Meal[];
};

export type CreateRestaurantInput = {
  name: string;
};
