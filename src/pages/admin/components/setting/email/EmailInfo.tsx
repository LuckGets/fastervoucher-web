import { useState } from 'react';
import { Pencil } from 'lucide-react';

interface ProfileInfoProps {
  userInfo: {
    info: string;
    label: string;
  };
}

const EmailInfo = ({ userInfo }: ProfileInfoProps) => {
  const { info, label } = userInfo;
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState(info);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved Value:', newValue);
  };

  const handleCancel = () => {
    setNewValue(info);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>{label}</h1>
        {!isEditing && (
          <button onClick={handleEdit} className="ml-2">
            <span className="flex items-center gap-1 text-basicGray">
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
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="text"
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1 md:text-xl"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : (
          <h1 className="font-semibold md:text-xl">{newValue}</h1>
        )}
      </div>
    </div>
  );
};

export default EmailInfo;
