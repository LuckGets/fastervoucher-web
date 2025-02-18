import RegisterWrapper from '../../../feature/auth/components/register/RegisterWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-full flex-col items-center justify-center overflow-x-hidden px-4 py-8"
      >
        <RegisterWrapper />
      </motion.div>
    </AnimatePresence>
  );
};

export default Register;
