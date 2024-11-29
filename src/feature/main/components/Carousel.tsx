import { useState } from 'react';
import { carouselImages } from '../../../utils/main/carouselImg';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + carouselImages.length) % carouselImages.length,
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStart === null) return;

    const touchEnd = e.changedTouches[0].clientX;
    const touchDifference = touchStart - touchEnd;

    if (touchDifference > 50) {
      nextImage();
    }

    if (touchDifference < -50) {
      prevImage();
    }

    setTouchStart(null);
  };

  return (
    <div
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-60 overflow-hidden md:h-96 lg:h-[35rem]">
        <div className="relative duration-700 ease-in-out">
          <img
            src={carouselImages[currentIndex].src}
            className="absolute block h-60 w-full object-cover md:h-96 lg:h-[35rem]"
            alt={`Image ${currentIndex + 1}`}
          />
        </div>
      </div>

      <button
        type="button"
        className="group absolute left-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center focus:outline-none"
        onClick={prevImage}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        className="group absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center focus:outline-none"
        onClick={nextImage}
      >
        <span className="inline-flex h-10 w-10 items-center justify-center">
          <svg
            className="h-4 w-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
};

export default Carousel;
