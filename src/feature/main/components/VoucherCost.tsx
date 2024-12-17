import useSettingStore from '@/stores/setting-store';
import VoucherCarousel from './VoucherCarousel';

const VoucherCost = () => {
  const { color } = useSettingStore();

  const textColor = color ? { color: color } : { color: '#D1D5DB' };
  return (
    <div className="flex gap-4 md:flex-row md:items-center">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800 md:text-2xl">
          Premium Sushi & Seafood Buffet Dinner
        </h1>
        <h2 className="mt-1 text-sm text-gray-500 md:text-base">
          The Emerald Coffee Shop
        </h2>
        <h1
          style={textColor}
          className="mb-4 mt-4 text-sm font-semibold md:text-xl"
        >
          THB 1,199 NET
        </h1>
        <div className="relative w-full overflow-hidden rounded-lg md:h-[15rem] md:w-[30rem]">
          <VoucherCarousel />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
