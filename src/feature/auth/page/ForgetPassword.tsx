import ForgetPassInput from '../components/forgetPassword/ForgetPassInput';
import { motion, AnimatePresence } from 'framer-motion';

const ForgetPassword = () => {
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
          Forgot Your Password?
        </h1>
        <div className="mb-6 text-center text-sm text-gray-500">
          <p>Enter the email address associated with your account.</p>
          <p>
            We’ll send you a One-Time Password (OTP) to reset your password.
          </p>
        </div>
        <ForgetPassInput />
      </motion.div>
    </AnimatePresence>
  );
};

export default ForgetPassword;
