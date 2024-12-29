import useSettingStore from '@/stores/setting-store';
import { PencilLine, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

const HotelRestaurant = () => {
  const restaurant = useSettingStore((state) => state.restaurant);
  const setRestaurant = useSettingStore((state) => state.setRestaurant);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [newValue, setNewValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index: number) => {
    setIsEditing(index);
    setNewValue(restaurant[index].name);
  };

  const handleSave = () => {
    if (isEditing !== null) {
      const updatedRestaurants = [...restaurant];
      updatedRestaurants[isEditing].name = newValue;
      setRestaurant(updatedRestaurants);
    }
    setIsEditing(null);
  };

  const handleCancel = () => {
    setNewValue('');
    setIsEditing(null);
  };

  const handleDelete = (index: number) => {
    const updatedRestaurants = restaurant.filter((_, i) => i !== index);
    setRestaurant(updatedRestaurants);
  };

  const handleAddRestaurant = () => {
    setIsAdding(true);
  };

  const handleSaveNewRestaurant = () => {
    if (newValue.trim()) {
      const updatedRestaurants = [...restaurant, { name: newValue }];
      setRestaurant(updatedRestaurants);
      setNewValue('');
      setIsAdding(false);
    }
  };

  const handleCancelAdd = () => {
    setNewValue('');
    setIsAdding(false);
  };

  return (
    <div className="my-2 flex flex-col gap-3">
      {restaurant.map((restaurantItem, index) => (
        <div
          key={index}
          className="h-18 flex w-[90%] items-center justify-around rounded-xl bg-[#D9D9D9] px-5 hover:bg-[#a3a3a3a0]"
        >
          <div className="flex h-14 w-28 flex-grow items-center overflow-hidden rounded-xl">
            {isEditing === index ? (
              <input
                type="text"
                className="w-full rounded-full bg-[#ececec] p-4 px-2 py-1"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            ) : (
              <h1>{restaurantItem.name}</h1>
            )}
          </div>
          <div className="flex gap-6 text-basicGray">
            {isEditing !== index && (
              <>
                <label
                  onClick={() => handleEdit(index)}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite"
                >
                  <PencilLine />
                </label>
                <label
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-[#888888] hover:text-textWhite"
                  onClick={() => handleDelete(index)}
                >
                  <Trash2 className="cursor-pointer" />
                </label>
              </>
            )}
          </div>

          {isEditing === index && (
            <div className="flex gap-2 pl-2">
              <button
                onClick={handleSave}
                className="cursor-pointer text-primary hover:underline"
              >
                Save
              </button>
              |
              <button
                onClick={handleCancel}
                className="cursor-pointer text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
      <div
        className="flex h-12 w-[90%] cursor-pointer items-center justify-around rounded-xl bg-[#D9D9D9] text-basicGray hover:bg-[#a3a3a3a0]"
        onClick={handleAddRestaurant}
      >
        <label className="flex cursor-pointer">
          <Plus />
          <h1 className="ml-2">Add restaurant</h1>
        </label>
      </div>

      {isAdding && (
        <div className="h-18 flex w-[90%] items-center justify-around rounded-xl bg-[#D9D9D9] px-5">
          <div className="flex h-14 w-28 flex-grow items-center overflow-hidden rounded-xl">
            <input
              type="text"
              className="w-full rounded-full bg-[#ececec] p-4 px-2 py-1"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter restaurant name"
            />
            <div className="flex gap-2 pl-2">
              <button
                onClick={handleSaveNewRestaurant}
                className="cursor-pointer text-primary hover:underline"
              >
                Save
              </button>
              |
              <button
                onClick={handleCancelAdd}
                className="cursor-pointer text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelRestaurant;