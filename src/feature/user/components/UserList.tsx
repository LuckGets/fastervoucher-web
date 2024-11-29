import { Key, LogOut, Pencil } from 'lucide-react';
import { useState } from 'react';
import EditProfileWrapper from './EditProfileWrapper';

const UserList = () => {
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
  };

  return (
    <div className="mt-6 flex w-full flex-col items-start">
      <button
        onClick={handleOpenEdit}
        className="flex w-full gap-2 rounded-full py-3 active:bg-[#00000038]"
      >
        <Pencil />
        <p>Edit Profile</p>
      </button>

      {openEdit && (
        <div className="mt-4 w-full transition-all duration-300 ease-in-out">
          <EditProfileWrapper />
        </div>
      )}

      <button className="flex w-full gap-2 rounded-full py-3 active:bg-[#00000038]">
        <Key />
        <p>Change Password</p>
      </button>
      <button className="flex w-full gap-2 rounded-full py-3 active:bg-[#00000038]">
        <LogOut />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default UserList;
