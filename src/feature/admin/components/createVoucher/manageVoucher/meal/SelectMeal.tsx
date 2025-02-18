import { useState } from 'react';
import { ChevronDown, Plus, X } from 'lucide-react';
import useVoucherStore from '../../../../../../stores/voucher-store';

interface SelectMealProps {
  meal: string | string[];
  onSelectMeal: (field: 'meal', value: string | string[]) => void;
}

interface Restaurant {
  name: string;
  id: number;
}

const SelectMeal: React.FC<SelectMealProps> = ({ meal, onSelectMeal }) => {
  const { meals } = useVoucherStore();
  const { setMeal } = useVoucherStore();

  const [newMeal, setNewMeal] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(
    meal ? (Array.isArray(meal) ? meal[0] : meal) : null,
  );

  const handleSelectMeal = (name: string) => {
    setSelectedMeal(name);
    onSelectMeal('meal', name);
    setIsDropdownOpen(false);
  };

  const handleAddMeal = () => {
    if (newMeal.trim() === '') return;

    const newMealObj: Restaurant = {
      name: newMeal,
      id: meals.length + 1,
    };

    const updatedMeals = Array.isArray(meal)
      ? [
          ...meal.map((m) =>
            typeof m === 'string' ? { name: m, id: meals.length + 1 } : m,
          ),
          newMealObj,
        ]
      : [newMealObj];
    console.log('updatedMeals :>> ', updatedMeals);

    setMeal(updatedMeals);

    setNewMeal('');
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="relative z-20 flex w-full items-center justify-between rounded-full bg-[#E1E1E1] p-2 px-5"
      >
        {selectedMeal || 'Select Meal'}
        <ChevronDown />
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full z-10 -mt-6 w-full rounded-xl border bg-[#E1E1E1] py-2 pt-6 shadow-lg">
          {meals.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSelectMeal(item.name)}
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
            <Plus className="inline h-4 w-4" /> Add Meal
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex w-[30%] flex-col items-center gap-3 rounded-lg bg-[#F7F3ED] px-10 py-14 shadow-lg">
            <button
              className="absolute right-2 top-2 text-gray-400 hover:text-black"
              onClick={() => setIsModalOpen(false)}
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
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddMeal}
                className="rounded-full bg-[#2BB673] px-8 py-2 text-white"
              >
                Add Meal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectMeal;
