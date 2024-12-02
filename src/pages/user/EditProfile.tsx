import { paths } from '@/config/path';
import EditProfileWrapper from '@/feature/user/components/EditProfileWrapper';
import UserAvatar from '@/feature/user/components/UserAvatar';
import { MoveLeft, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
  const [isTallScreen, setIsTallScreen] = useState(false);

  useEffect(() => {
    const checkScreenHeight = () => {
      setIsTallScreen(window.innerHeight > 700);
    };

    checkScreenHeight();

    window.addEventListener('resize', checkScreenHeight);

    return () => {
      window.removeEventListener('resize', checkScreenHeight);
    };
  }, []);

  return (
    <div className="flex w-screen flex-col px-4 text-basicGray">
      <div>
        <div className="flex w-full flex-col gap-2">
          <Link
            to={paths.main.user.path}
            className="flex h-14 w-48 items-center gap-2 rounded-full px-6 text-basicGray hover:bg-[#0000002e]"
          >
            <MoveLeft /> Go back
          </Link>
          <hr />
        </div>
        <div className="mt-4 flex justify-center">
          <div>
            <h1>Profile</h1>
            <UserAvatar />
          </div>
          <div className="relative right-5 top-40 flex h-6 w-6 items-center justify-center rounded-full text-basicGray">
            <Pencil className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-4 px-10">
          <EditProfileWrapper />
        </div>
      </div>
      {isTallScreen && (
        <div className="fixed bottom-5 right-28 mb-24 mt-14">
          <Link
            to={paths.main.user.path}
            className="flex h-14 w-48 items-center justify-center gap-2 rounded-full bg-[#D9DFD7] p-2"
          >
            <MoveLeft /> Go back
          </Link>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
