import { useEffect, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import AddMeal from './AddMeal';
import { DEFAULT_SELECT_MEAL } from './VoucherMeal';
import { Meal } from '@/data-schema/meal.type';
import { Restaurant } from '@/data-schema/restaurant.type';
import useVoucherStore from '@/stores/voucher-store';

interface SelectMealProps {
  meals: Meal[];
}

type ShowRestaurantWarningMsg = {
  message: string;
  isShowMsg: boolean;
  isWarningMsg: boolean;
};

const restaurantNotSelectedMsg =
  'Please select restaurant first to show the list of meal';

const mealNotSelectedMsg =
  'Please select meal which voucher belong to or create a new one.';

const SelectMeal: React.FC<SelectMealProps> = ({ meals }) => {
  // To control warning message
  const { createVoucherData, updateCreateVoucherData } = useVoucherStore();
  const shouldShowMeal =
    !!createVoucherData.restaurantId || !!(meals.length > 1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isShowRestaurantWarningMsg, setShowRestaurantWarningMsg] =
    useState<ShowRestaurantWarningMsg>({
      message: restaurantNotSelectedMsg,
      isWarningMsg: false,
      isShowMsg: !createVoucherData.mealName,
    });

  useEffect(() => {
    if (shouldShowMeal) {
      setShowRestaurantWarningMsg((prev) => ({
        ...prev,
        isWarningMsg: true,
        message: mealNotSelectedMsg,
      }));
    }
  }, [shouldShowMeal]);

  const handleOpenDropdown = () => {
    if (!shouldShowMeal) {
      return setShowRestaurantWarningMsg((prev) => ({
        ...prev,
        isWarningMsg: true,
      }));
    }
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSelectMeal = (id: Restaurant['id'], name: Restaurant['name']) => {
    // If there aren't any selected restaurant,
    // make the warning message red.
    if (!shouldShowMeal) {
      return setShowRestaurantWarningMsg((prev) => ({
        ...prev,
        isWarningMsg: true,
      }));
    }

    setShowRestaurantWarningMsg((prev) => ({
      ...prev,
      isShowMsg: false,
      isWarningMsg: false,
    }));
    updateCreateVoucherData('mealName', name);
    updateCreateVoucherData('tagId', id);
    setIsDropdownOpen(false);
  };

  const handleOpenAddMealModal = () => {
    if (!shouldShowMeal) {
      setShowRestaurantWarningMsg((prev) => ({
        ...prev,
        isWarningMsg: true,
      }));
      setIsModalOpen(false);
      setIsDropdownOpen(false);
      return;
    }
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleOpenDropdown}
        className="relative z-20 flex w-full items-center justify-between rounded-full bg-[#E1E1E1] p-2 px-5"
      >
        {createVoucherData.mealName || 'Select Meal'}
        <ChevronDown />
      </button>
      <p
        className={`${isShowRestaurantWarningMsg.isShowMsg ? (isShowRestaurantWarningMsg.isWarningMsg ? 'text-red-500' : 'text-gray-400') : 'hidden'} text-sm`}
      >
        {isShowRestaurantWarningMsg.message}
      </p>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-10 -mt-6 w-full rounded-xl border bg-[#E1E1E1] py-2 pt-6 shadow-lg">
          {meals.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectMeal(item.id, item.name)}
              className={`cursor-pointer p-2 px-5 ${item.id === DEFAULT_SELECT_MEAL.id ? 'hidden' : 'hover:bg-[#EEEEEE]'}`}
            >
              {item.name}
            </div>
          ))}

          <div
            onClick={handleOpenAddMealModal}
            className="flex cursor-pointer items-center gap-2 p-2 px-5 hover:bg-[#EEEEEE]"
          >
            <Plus className="inline h-4 w-4" /> Add Meal
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddMeal
          restaurantId={createVoucherData.restaurantId}
          handleCloseButton={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SelectMeal;
