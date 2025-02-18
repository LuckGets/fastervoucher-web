import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { ChevronRight } from 'lucide-react';
import { VoucherDataSchema } from '../../../data-schema/voucher.type';
import { prependHttpsToString } from '../../../utils/function/stringToUrl';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const VoucherCarousel = ({
  images,
}: {
  images: VoucherDataSchema['images'];
}) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  if (images.length === 0) {
    return (
      <div className="text-center">
        <p>No images available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full md:h-[15rem] md:w-[30rem]">
      <AnimatePresence initial={false} custom={direction}>
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: '56.25%' }}
        >
          <motion.img
            key={page}
            src={prependHttpsToString(images[imageIndex].imgPath)}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute left-0 top-0 h-full w-full object-cover"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              console.log(e);
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </div>
      </AnimatePresence>
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={() => paginate(-1)}
      >
        <ChevronRight className="rotate-180 transform text-[#D9D9D9]" />
      </div>
      <div
        className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="text-[#D9D9D9]" />
      </div>
    </div>
  );
};

export default VoucherCarousel;
