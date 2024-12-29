import { useState } from 'react';
import Voucher from '@/feature/main/components/Voucher';
import CarouselV2 from '../components/CarouselV2';
import FilterRestaurant from '../components/FilterRestaurant';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null,
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CarouselV2 />
        <FilterRestaurant
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
        />
        <Voucher selectedRestaurant={selectedRestaurant} />
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
