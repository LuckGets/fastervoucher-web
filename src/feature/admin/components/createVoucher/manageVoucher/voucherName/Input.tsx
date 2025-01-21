import { Pencil } from 'lucide-react';
import { useState } from 'react';

interface InfoProps {
  inputInfo: {
    info: string;
    label: string;
  };
  onSave: (newValue: string) => void;
}

const Input = ({ inputInfo, onSave }: InfoProps) => {
  const { info, label } = inputInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(info);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(newValue);
  };

  const handleCancel = () => {
    setNewValue(info);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="mb-2">{label}</h1>
        {!isEditing && (
          <button onClick={handleEdit} className="ml-2">
            <span className="flex items-center gap-1 text-basicGray">
              <Pencil className="h-4 w-4" />
              <p>{info ? 'Edit' : 'Add'}</p>
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
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1 md:text-xl"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : (
          <h1 className="font-semibold md:text-xl">
            {newValue || 'No value yet'}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Input;
