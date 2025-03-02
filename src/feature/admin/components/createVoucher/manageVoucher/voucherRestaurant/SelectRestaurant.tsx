import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import AddRestaurantModal from './AddRestaurant';
import { Restaurant } from '@/data-schema/restaurant.type';
import useVoucherStore from '@/stores/voucher-store';

interface SelectRestaurantProps {
  restaurants: Restaurant[];
}

const SelectRestaurant: React.FC<SelectRestaurantProps> = ({ restaurants }) => {
  const { updateCreateVoucherData, createVoucherData } = useVoucherStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectRestaurant = (
    id: Restaurant['id'],
    name: Restaurant['name'],
  ) => {
    updateCreateVoucherData('restaurantId', id);
    updateCreateVoucherData('restaurantName', name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="relative z-40 flex w-full items-center justify-between rounded-full bg-[#E1E1E1] p-2 px-5"
      >
        {createVoucherData.restaurantName || 'Select a restaurant'}
        <ChevronDown />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-30 -mt-6 w-full rounded-xl border bg-[#E1E1E1] py-2 pt-6 shadow-lg">
          {restaurants.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectRestaurant(item.id, item.name)}
              className="cursor-pointer p-2 px-5 hover:bg-[#EEEEEE]"
            >
              {item.name}
            </div>
          ))}

          <div
            onClick={() => {
              setIsModalOpen(true);
              setIsDropdownOpen(false);
            }}
            className="flex cursor-pointer items-center gap-2 p-2 px-5 hover:bg-[#EEEEEE]"
          >
            <Plus className="inline h-4 w-4" /> Add restaurant
          </div>
        </div>
      )}

      {isModalOpen && (
        <AddRestaurantModal handleCloseBtn={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default SelectRestaurant;
