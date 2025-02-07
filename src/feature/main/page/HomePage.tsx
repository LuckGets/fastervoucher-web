import CarouselV2 from '../components/CarouselV2';
import { motion, AnimatePresence } from 'framer-motion';
import ProductWrapper from '../components/ProductWrapper';

const HomePage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CarouselV2 />
        <ProductWrapper />
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
