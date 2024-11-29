import { userLinks } from '@/utils/user/userLinks';
import { LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserList = () => {
  return (
    <div className="mt-6 flex w-full flex-col items-start">
      {userLinks.map((i, index) => (
        <div
          key={index}
          className={`flex w-full items-center justify-start rounded-full py-3 active:bg-[#00000038]`}
        >
          <Link to={i.href} className="flex items-center gap-2">
            <img src={i.icon} alt={i.label} width={20} height={20} />
            <p className="">{i.label}</p>
          </Link>
        </div>
      ))}
      <button className="flex w-full gap-2 rounded-full py-3 active:bg-[#00000038]">
        <LogOut />
        <p className="">Logout</p>
      </button>
    </div>
  );
};

export default UserList;
