import VoucherCarousel from './VoucherCarousel';
import { VoucherDataSchema } from '@/data-schema/voucher.type';

interface VoucherCostProps {
  price: VoucherDataSchema['price'];
  images: VoucherDataSchema['images'];
  title: VoucherDataSchema['title'];
  restaurant: VoucherDataSchema['category'];
}

const VoucherCost = ({
  price,
  images,
  title,
  restaurant,
}: VoucherCostProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <h2 className="mt-1 text-sm text-gray-500">{restaurant}</h2>
        <h1 className="mb-4 mt-4 text-sm font-semibold">THB {price} NET</h1>
        <div className="relative w-full overflow-hidden rounded-lg">
          <VoucherCarousel images={images || []} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
