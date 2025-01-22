import Verify from '../components/verifyEmail/Verify';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '@/stores/account-store';

const VerifyEmail = () => {
  const { accountInfo } = useAccountStore();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-screen flex-col items-center justify-center"
      >
        <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
          Verify Email
        </h1>
        <div className="mb-6 text-center text-sm text-gray-500">
          <p>An OTP has been sent to your email address</p>
          <p className="font-semibold">
            {accountInfo?.email} <p>Please check your inbox.</p>
          </p>
        </div>
        <Verify />
      </motion.div>
    </AnimatePresence>
  );
};

export default VerifyEmail;
