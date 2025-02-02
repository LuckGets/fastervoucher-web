import { useState } from 'react';
import SelectMeal from './SelectMeal';
import { Pencil } from 'lucide-react';

const VoucherMeal = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
  const [originalMeal, setOriginalMeal] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEdit = () => {
    setOriginalMeal(selectedMeal);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved restaurant:', selectedMeal);
  };

  const handleCancel = () => {
    setSelectedMeal(originalMeal);
    setIsEditing(false);
    setIsDropdownOpen(false);
    console.log('Edit cancelled');
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Voucher for meal</h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-basicGray"
          >
            <span className="flex items-center">
              <Pencil className="h-4 w-4" />
              <p>Edit</p>
            </span>
          </button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <span
              onClick={handleSave}
              className="cursor-pointer text-primary hover:underline"
            >
              Save
            </span>
            |
            <span
              onClick={handleCancel}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Cancel
            </span>
          </div>
        )}
      </div>
      <SelectMeal
        isEditing={isEditing}
        selectedMeal={selectedMeal}
        setSelectedMeal={setSelectedMeal}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
};

export default VoucherMeal;
