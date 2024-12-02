import { Key, LogOut, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paths } from '@/config/path';
// import { useState } from 'react';
// import EditProfileWrapper from './EditProfileWrapper';

const UserList = () => {
  // const [openEdit, setOpenEdit] = useState(false);

  // const handleOpenEdit = () => {
  //   setOpenEdit(!openEdit);
  // };

  return (
    <div className="mt-6 flex w-full flex-col items-start">
      <Link
        to={paths.user.edit.path}
        // onClick={handleOpenEdit}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <Pencil />
        <p>Edit Profile</p>
      </Link>

      {/* {openEdit && (
        <div className="mt-4 w-full transition-all duration-300 ease-in-out">
          <EditProfileWrapper />
        </div>
      )} */}

      <Link
        to={paths.user.changePassword.path}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <Key />
        <p>Change Password</p>
      </Link>
      <button className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]">
        <LogOut />
        <p>Logout</p>
      </button>
    </div>
  );
};

export default UserList;
