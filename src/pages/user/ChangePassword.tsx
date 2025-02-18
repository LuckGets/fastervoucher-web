import { paths } from '../../config/path';
import ChangePassForm from '../../feature/user/components/ChangePassForm';
import { MoveLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence mode="wait">
      <motion.div
        className="mt-4 w-screen px-6 text-text"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
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
          <div className="fixed bottom-5 right-28 mb-24 mt-14 md:hidden">
            <Link
              to={paths.main.user.path}
              className="flex h-14 w-48 items-center justify-center gap-2 rounded-full bg-[#D9DFD7] p-2"
            >
              <MoveLeft /> Go back
            </Link>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ChangePassword;
