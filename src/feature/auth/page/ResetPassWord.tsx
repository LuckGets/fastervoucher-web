import ResetPassInput from '../components/resetPassword/ResetPassInput';
import { motion, AnimatePresence } from 'framer-motion';

const ResetPassWord = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-screen flex-col items-center justify-center px-6"
      >
        <h1 className="mb-4 mt-6 text-2xl font-semibold text-basicGray">
          Reset Your Password
        </h1>
        <div className="mb-6 text-center text-sm text-gray-500">
          <p>Please enter your new password (6-20 characters).</p>
        </div>
        <ResetPassInput />
      </motion.div>
    </AnimatePresence>
  );
};

export default ResetPassWord;
