import UserAvatar from '@/components/guest/user/UserAvatar';
import UserList from '@/components/guest/user/UserList';

const UserPage = () => {
  return (
    <div className="flex w-full flex-col text-[#3F3F3F]">
      <div className="flex flex-col items-center">
        <UserAvatar />
        <h1 className="mt-4 text-xl font-semibold md:text-3xl">
          Thawevit kittanmeteeeeee
        </h1>
        <h2 className="text-sm font-semibold text-[#888888] md:text-lg">
          thaweevit@gmail.com
        </h2>
      </div>
      <div className="mt-4 flex w-full justify-start">
        <UserList />
      </div>
    </div>
  );
};

export default UserPage;
