import { Restaurant } from './restaurant.type';

export type Meal = {
  id: string;
  name: string;
  categoryId?: string;
};

export type CreateMealInput = {
  categoryId: Restaurant['id'];
  name: Meal['name'];
};

export type CreateMealResponseDataType = {
  category: Restaurant['name'];
  id: Meal['id'];
  name: Meal['name'];
};
