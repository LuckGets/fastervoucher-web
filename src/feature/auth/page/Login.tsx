import LoginWrapper from '../../../feature/auth/components/login/LoginWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="flex w-full flex-col items-center justify-center overflow-x-hidden px-4 py-8"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <LoginWrapper />
      </motion.div>
    </AnimatePresence>
  );
};

export default Login;
