/* eslint-disable react/prop-types */
import { Voucher } from '@/stores/voucher-store';
import VoucherCarousel from './VoucherCarousel';

interface VoucherCostProps {
  voucher: Voucher;
}

const VoucherCost: React.FC<VoucherCostProps> = ({ voucher }) => {
  const { name, price, promotion, restaurant, carouselImages } = voucher;

  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800">
          {name || 'No Information'}
        </h1>
        <h2 className="mt-1 text-sm text-gray-500">
          {restaurant || 'No Information'}
        </h2>
        {promotion && promotion.length > 0 ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {promotion[0].price.toLocaleString()} NET
          </h1>
        ) : price !== undefined ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {price.toLocaleString()} NET
          </h1>
        ) : (
          <h1 className="mb-4 mt-4 text-sm font-semibold">No Information</h1>
        )}
        <div className="relative w-full overflow-hidden rounded-lg">
          <VoucherCarousel images={carouselImages || []} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
