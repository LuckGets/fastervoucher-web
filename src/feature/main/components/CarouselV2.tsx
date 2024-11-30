import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import { carouselImages } from '@/utils/main/carouselImg';
import { ChevronRight } from 'lucide-react';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const CarouselV2 = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, carouselImages.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative w-full">
      <AnimatePresence initial={false} custom={direction}>
        <div className="relative h-60 overflow-hidden md:h-96 lg:h-[35rem]">
          <motion.img
            key={page}
            src={carouselImages[imageIndex].src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute block h-60 w-full object-cover md:h-96 lg:h-[35rem]"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
              console.log(e);
            }}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </AnimatePresence>
      <div className="next" onClick={() => paginate(1)}>
        <ChevronRight />
      </div>
      <div className="prev" onClick={() => paginate(-1)}>
        <ChevronRight />
      </div>
    </div>
  );
};

export default CarouselV2;