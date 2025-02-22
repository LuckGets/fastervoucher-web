import { useEffect } from 'react';
import UserAvatar from '../../../feature/user/components/UserAvatar';
import UserList from '../../../feature/user/components/UserList';
import useAuthStore from '../../../stores/auth-store';
import { motion, AnimatePresence } from 'framer-motion';
import { paths } from '../../../config/path';
import { useNavigate } from 'react-router-dom';
import useAccountStore from '../../../stores/account-store';

const UserPage = () => {
  const { accountInfo, actionGetMe } = useAccountStore();
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await actionGetMe();
      } catch (error) {
        console.log('error details :>> ', error);
      }

      if (!accessToken) {
        navigate(paths.auth.login.path);
      }
    };

    fetchData();
  }, [accessToken, actionGetMe, navigate]);

  console.log('accountInfo :>> ', accountInfo);

  if (!accessToken) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-screen flex-col items-center px-14 text-[#3F3F3F] md:px-8 lg:px-16"
      >
        <div className="mt-4 flex w-full max-w-4xl flex-col items-center">
          <UserAvatar />
          <h1 className="mt-6 text-xl font-semibold md:text-3xl">
            {accountInfo?.fullname}
          </h1>
          <h2 className="text-sm font-semibold text-[#888888] md:text-lg">
            {accountInfo?.email}
          </h2>
        </div>
        <div className="mt-4 flex w-full max-w-4xl justify-start">
          <UserList />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserPage;
