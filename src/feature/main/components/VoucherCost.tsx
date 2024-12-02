import VoucherCarousel from './VoucherCarousel';

const VoucherCost = () => {
  return (
    <div className="flex gap-4 md:flex-row md:items-center">
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
          Premium Sushi & Seafood Buffet Dinner
        </h1>
        <h2 className="mt-1 text-sm text-gray-500 md:text-base">
          The Emerald Coffee Shop
        </h2>
        <h1 className="mb-4 mt-4 text-sm font-semibold text-primary md:text-xl">
          THB 1,199 NET
        </h1>
        <div className="h-40 flex-shrink-0 overflow-hidden rounded-lg md:h-40 md:w-40">
          <VoucherCarousel />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
