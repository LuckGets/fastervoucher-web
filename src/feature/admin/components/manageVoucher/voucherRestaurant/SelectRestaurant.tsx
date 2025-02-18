import useVoucherStore from '@/stores/voucher-store';
import { ChevronDown, Plus, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const SelectRestaurant = ({
  isEditing,
  selectedRestaurant,
  setSelectedRestaurant,
  isDropdownOpen,
  setIsDropdownOpen,
}: {
  isEditing: boolean;
  selectedRestaurant: string | null;
  setSelectedRestaurant: (value: string | null) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
}) => {
  const { voucherById, restaurants } = useVoucherStore();

  const [newRestaurant, setNewRestaurant] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (voucherById?.category) {
      setSelectedRestaurant(voucherById.category);
    }
  }, [voucherById, setSelectedRestaurant]);

  const handleAddRestaurant = () => {
    if (newRestaurant.trim() === '') return;
    // const updatedRestaurants = [...restaurants, { name: newRestaurant }];
    // setRestaurant(updatedRestaurants);
    setNewRestaurant('');
    setIsModalOpen(false);

    if (voucherById) {
      // updateVoucher(voucher.id, { restaurant: newRestaurant });
    }
  };

  const handleSelectRestaurant = (name: string) => {
    setSelectedRestaurant(name);
    setIsDropdownOpen(false);

    if (voucherById) {
      // updateVoucher(voucher.id, { restaurant: name });
    }
  };

  return (
    <div className="relative w-full">
      {isEditing ? (
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="relative z-50 flex w-full items-center justify-between rounded-full bg-[#E1E1E1] p-2 px-5"
        >
          {selectedRestaurant || 'Select a restaurant'}
          <ChevronDown />
        </button>
      ) : (
        <div>{selectedRestaurant || 'No restaurant selected'}</div>
      )}

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-40 -mt-6 w-full rounded-xl border bg-[#E1E1E1] py-2 pt-6 shadow-lg">
          {restaurants.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectRestaurant(item.name)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex w-[30%] flex-col items-center gap-3 rounded-lg bg-[#F7F3ED] px-10 py-14 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-400 hover:text-black"
              onClick={() => setIsModalOpen(false)}
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
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddRestaurant}
                className="rounded-full bg-[#2BB673] px-8 py-2 text-white"
              >
                Add restaurant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectRestaurant;
