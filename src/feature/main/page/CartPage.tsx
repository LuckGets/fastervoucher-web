import CartItems from '@/feature/cart/components/CartItems';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <CartItems />
      </motion.div>
    </AnimatePresence>
  );
};

export default CartPage;
