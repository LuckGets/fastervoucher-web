import { useCreateMeal } from '@/api/meal/meal-query';
import SuccessNotification from '@/components/notifications/SuccessNotification';
import { CreateMealInput } from '@/data-schema/meal.type';
import { Restaurant } from '@/data-schema/restaurant.type';
import handleApiError from '@/utils/error/handleApiError';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddMealProps {
  restaurantId: Restaurant['id'];
  handleCloseButton: () => void;
}

const AddMeal: React.FC<AddMealProps> = ({
  handleCloseButton,
  restaurantId,
}) => {
  const [newMeal, setNewMeal] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const createMealMutation = useCreateMeal(restaurantId);

  const handleAddNewMeal = async () => {
    if (!newMeal || !newMeal.trim())
      return setErrorMsg(`The provided meal name is not valid.`);

    const createMealInput: CreateMealInput = {
      categoryId: restaurantId,
      name: newMeal,
    };
    try {
      const { data } = await createMealMutation.mutateAsync(createMealInput);
      const meal = data?.data;

      SuccessNotification({
        text: `Add new meal: ${meal.name} for restaurant: ${meal.category}`,
        title: 'Add new meal successful!',
      });
      handleCloseButton();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[30%] flex-col items-center gap-3 rounded-lg bg-[#F7F3ED] px-10 py-14 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-black"
          onClick={handleCloseButton}
        >
          <X />
        </button>
        <h2 className="mb-4 text-center text-xl font-semibold">Add Meal</h2>
        <input
          type="text"
          value={newMeal}
          onChange={(e) => setNewMeal(e.target.value)}
          className="w-full rounded-full border bg-[#E1E1E1] p-2"
        />
        <p className="text-red-500">{errorMsg}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleAddNewMeal}
            className="rounded-full bg-[#2BB673] px-8 py-2 text-white"
          >
            Add Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
