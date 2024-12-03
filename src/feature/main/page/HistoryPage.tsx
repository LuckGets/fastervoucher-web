import OderWrapper from '@/feature/history/components/OderWrapper';
import { motion, AnimatePresence } from 'framer-motion';

const HistoryPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="w-screen p-8"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <OderWrapper />
      </motion.div>
    </AnimatePresence>
  );
};

export default HistoryPage;
