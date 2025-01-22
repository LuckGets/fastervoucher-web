import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '@/stores/account-store';
import useAuthStore from '@/stores/auth-store';
import { MoveLeft, Pencil } from 'lucide-react';
import { paths } from '@/config/path';
import EditProfileWrapper from '@/feature/user/components/EditProfileWrapper';
import UserAvatar from '@/feature/user/components/UserAvatar';

const EditProfile = () => {
  const { accessToken } = useAuthStore();
  const { accountInfo, actionEditInfo, actionGetMe } = useAccountStore();
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExtension = file.name.split('.').pop();
      const fileName = `profile_${Date.now()}.${fileExtension}`;

      const formData = new FormData();

      formData.append('accountImage', file, fileName);

      try {
        await actionEditInfo(formData, accountInfo?.id, accessToken);
        console.log('Upload success!');
        actionGetMe(accessToken as string);
      } catch (err) {
        console.error('Failed to upload image:', err);
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-screen flex-col px-4 text-basicGray"
      >
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
            <div className="relative right-5 top-40">
              <label
                htmlFor="upload-avatar"
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-basicGray"
              >
                <Pencil className="h-4 w-4" />
              </label>
              <input
                id="upload-avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="mt-4 px-10">
            <EditProfileWrapper />
          </div>
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

export default EditProfile;
