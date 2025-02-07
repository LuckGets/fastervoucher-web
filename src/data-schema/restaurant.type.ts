export const ALL_RESTAURNT = 'All';

export type Restaurant = {
  id: string;
  name: string;
  VoucherTags: Meal[];
};

export type CreateRestaurantInput = {
  name: string;
};

export type Meal = {
  id: string;
  name: string;
  categoryId?: string;
};
