import SelectMeal from './SelectMeal';
import { useFetchRestaurantFromId } from '@/api/restaurant/restaurant-query';
import { Meal } from '@/data-schema/meal.type';
import useVoucherStore from '@/stores/voucher-store';

export const DEFAULT_SELECT_MEAL: Meal = {
  id: 'DEFAULT',
  name: 'Select Meal',
  categoryId: 'DEFAULT',
};

const VoucherMeal: React.FC = () => {
  const { createVoucherData } = useVoucherStore();
  const {
    data: mealAxiosData,
    isError,
    error,
  } = useFetchRestaurantFromId(createVoucherData.restaurantId);
  const mealsList = mealAxiosData?.data?.data?.VoucherTags || [];

  if (isError) throw new Error(error?.message);

  const meals: Meal[] = [DEFAULT_SELECT_MEAL, ...mealsList];

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Voucher for Meal</h1>
      <SelectMeal meals={meals} />
    </div>
  );
};

export default VoucherMeal;
