import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { carouselImages } from '@/utils/main/carouselImg';

const MainCarousel = () => {
  return (
    <div>
      <Carousel className="h-52 overflow-hidden md:h-96 lg:h-[30rem]">
        <CarouselContent className="border-none p-0">
          {carouselImages.map((i, index) => (
            <CarouselItem key={index}>
              <div>
                <Card className="border-none p-0 shadow-none">
                  <CardContent className="flex h-52 overflow-hidden p-0 md:h-96 lg:h-[30rem]">
                    <img
                      src={i.src}
                      className="absolute block h-52 w-full object-cover md:h-96 lg:h-[30rem]"
                      alt="pic"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <button
        type="button"
        className="group absolute left-0 top-48 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center focus:outline-none lg:top-96"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center">
          <svg
            className="h-3 w-3 text-black md:h-5 md:w-5 rtl:rotate-180"
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
        className="group absolute right-0 top-48 z-30 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center focus:outline-none lg:top-96"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center">
          <svg
            className="h-3 w-3 text-black md:h-5 md:w-5 rtl:rotate-180"
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

export default MainCarousel;
