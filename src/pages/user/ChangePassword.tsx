import { paths } from '@/config/path';
import ChangePassForm from '@/feature/user/components/ChangePassForm';
import { MoveLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChangePassword = () => {
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
    <div className="mt-4 w-screen px-6 text-text">
      <div className="flex w-full flex-col gap-2">
        <Link
          to={paths.main.user.path}
          className="flex h-14 w-48 items-center gap-2 rounded-full px-6 text-basicGray hover:bg-[#0000002e]"
        >
          <MoveLeft /> Go back
        </Link>
        <hr />
      </div>
      <div>
        <h1 className="mt-4 text-center text-xl">Change password</h1>
      </div>
      <div>
        <ChangePassForm />
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

export default ChangePassword;
