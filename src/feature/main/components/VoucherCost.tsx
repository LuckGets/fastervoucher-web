import useVoucherStore from '@/stores/voucher-store';
import VoucherCarousel from './VoucherCarousel';

interface VoucherCostProps {
  id: number;
}

const VoucherCost = ({ id }: VoucherCostProps) => {
  const vouchers = useVoucherStore((state) => state.vouchers);
  const voucher = vouchers.find((v) => v.id === id);

  if (!voucher) {
    return (
      <div className="text-center">
        <p>Voucher not found</p>
      </div>
    );
  }

  const { name, price, promotionPrice, restaurant, carouselImages } = voucher;

  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800">{name}</h1>
        <h2 className="mt-1 text-sm text-gray-500">{restaurant}</h2>
        {promotionPrice ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {promotionPrice.toLocaleString()} NET
          </h1>
        ) : (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {price.toLocaleString()} NET
          </h1>
        )}
        <div className="relative w-full overflow-hidden rounded-lg">
          <VoucherCarousel images={carouselImages || []} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
