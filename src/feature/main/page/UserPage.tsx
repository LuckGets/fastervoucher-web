import UserAvatar from '@/feature/user/components/UserAvatar';
import UserList from '@/feature/user/components/UserList';
import { userInfo } from '@/utils/user/userinfo';

const UserPage = () => {
  return (
    <div className="flex w-screen flex-col items-center px-14 text-[#3F3F3F] md:px-8 lg:px-16">
      <div className="flex w-full max-w-4xl flex-col items-center">
        <UserAvatar />
        <h1 className="mt-6 text-xl font-semibold md:text-3xl">
          {userInfo.name}
        </h1>
        <h2 className="text-sm font-semibold text-[#888888] md:text-lg">
          {userInfo.email}
        </h2>
      </div>
      <div className="mt-4 flex w-full max-w-4xl justify-start">
        <UserList />
      </div>
    </div>
  );
};

export default UserPage;
