import { useState } from 'react';
import SelectRestaurant from './SelectRestaurant';
import { Pencil } from 'lucide-react';

const VoucherRestaurant = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null,
  );
  const [originalRestaurant, setOriginalRestaurant] = useState<string | null>(
    null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEdit = () => {
    setOriginalRestaurant(selectedRestaurant);
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved restaurant:', selectedRestaurant);
  };

  const handleCancel = () => {
    setSelectedRestaurant(originalRestaurant);
    setIsEditing(false);
    setIsDropdownOpen(false);
    console.log('Edit cancelled');
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Voucher for the restaurant</h1>
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
      <SelectRestaurant
        isEditing={isEditing}
        selectedRestaurant={selectedRestaurant}
        setSelectedRestaurant={setSelectedRestaurant}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </div>
  );
};

export default VoucherRestaurant;
