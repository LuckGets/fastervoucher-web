import { Key, LogOut, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { paths } from '@/config/path';

const UserList = () => {
  return (
    <div className="mt-6 flex w-full flex-col items-start">
      <Link
        to={paths.user.edit.path}
        className="flex w-full gap-2 rounded-full p-4 py-3 active:bg-[#00000038]"
      >
        <Pencil />
        <p>Edit Profile</p>
      </Link>

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
