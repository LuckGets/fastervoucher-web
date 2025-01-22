import { useState } from 'react';
import { Pencil } from 'lucide-react';
import useAccountStore, { Account } from '@/stores/account-store';
import useAuthStore from '@/stores/auth-store';

interface ProfileInfoProps {
  userInfo: {
    info: string | null;
    label: string | null;
    field: keyof Account;
  };
}

const ProfileInfo = ({ userInfo }: ProfileInfoProps) => {
  const { info, label, field } = userInfo;
  const { accountInfo, actionEditInfo } = useAccountStore();
  const { accessToken } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState<string>(info ?? '');
  const [loading, setLoading] = useState(false);

  const accountId = accountInfo?.id || '';

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (loading) return;
    if (newValue !== undefined && newValue !== null && newValue !== info) {
      setLoading(true);
      try {
        await actionEditInfo(
          [{ field, value: newValue }],
          accountId,
          accessToken as string,
        );
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to save changes:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn('No valid data to save');
    }
  };

  const handleCancel = () => {
    setNewValue(info ?? '');
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>{label}</h1>
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
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
            value={newValue ?? ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                setNewValue(value);
              }
            }}
          />
        ) : (
          <h1 className="font-semibold">{newValue}</h1>
        )}
        {!isEditing && (
          <button onClick={handleEdit} className="ml-2">
            <Pencil className="h-5 w-5 text-basicGray" />
          </button>
        )}
        {loading && (
          <span className="ml-2 text-sm text-gray-500">Saving...</span>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
