import { useCreateRestaurant } from '@/api/restaurant/restaurant-query';
import SuccessNotification from '@/components/notifications/SuccessNotification';
import { ErrorResponse } from '@/data-schema/common.type';
import { CreateRestaurantInput } from '@/data-schema/restaurant.type';
import ErrorNotification from '@/pages/error/ErrorNotification';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddRestaurantProps {
  handleCloseBtn: () => void;
}

const AddRestaurantModal: React.FC<AddRestaurantProps> = ({
  handleCloseBtn,
}) => {
  const [newRestaurant, setNewRestaurant] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const createRestaurantMutation = useCreateRestaurant();

  const handleSubmitAddNewRestaurant = async (
    restaurantName: CreateRestaurantInput['name'],
  ) => {
    if (!restaurantName || !restaurantName.trim())
      return setErrorMsg(
        `The provided new restaurant name: ${restaurantName ? restaurantName : 'blank space'} is not valid. Please try again`,
      );

    const createRestaurantInput: CreateRestaurantInput = {
      name: restaurantName,
    };

    try {
      const createRestResponse = await createRestaurantMutation.mutateAsync(
        createRestaurantInput,
      );
      if (createRestResponse.status >= 400) {
        throw new Error();
      }

      SuccessNotification({
        text: `Add new restaurant: ${restaurantName} successful!`,
        title: `Add new restaurant successful!`,
      });
    } catch (err) {
      console.error(err);
      const error = err as AxiosError<ErrorResponse>;
      const { response } = error;
      const errMsg = response?.data?.message;
      ErrorNotification({
        title: 'Error while creating new restaurant.',
        text: errMsg ?? error.message,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative flex w-[30%] flex-col items-center gap-3 rounded-lg bg-[#F7F3ED] px-10 py-14 shadow-lg">
        <button
          className="absolute right-2 top-2 text-gray-400 hover:text-black"
          onClick={handleCloseBtn}
        >
          <X />
        </button>
        <h2 className="mb-4 text-center text-xl font-semibold">
          Add restaurant
        </h2>
        <input
          type="text"
          value={newRestaurant}
          onChange={(e) => setNewRestaurant(e.target.value)}
          className="w-full rounded-full border bg-[#E1E1E1] p-2"
        />
        <p className="text-red-500">{errorMsg}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => handleSubmitAddNewRestaurant(newRestaurant)}
            className="rounded-full bg-[#2BB673] px-8 py-2 text-white"
          >
            Add restaurant
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantModal;
