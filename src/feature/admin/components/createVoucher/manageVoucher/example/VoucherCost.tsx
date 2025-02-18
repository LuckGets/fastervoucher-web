import { Voucher } from '../../../../../../stores/voucher-store';
import VoucherCarousel from './VoucherCarousel';

interface VoucherCostProps {
  voucher: Voucher;
}

const VoucherCost: React.FC<VoucherCostProps> = ({ voucher }) => {
  const { title, price, discount, images, restaurant } = voucher;

  const image = images?.filter((item) => item.mainImg)[0];

  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800">
          {title || 'No Information'}
        </h1>
        <h2 className="mt-1 text-sm text-gray-500">
          {restaurant || 'No Information'}
        </h2>
        {discount && discount?.discountedPrice > 0 ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {discount?.discountedPrice.toLocaleString()} NET
          </h1>
        ) : price !== undefined ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {price.toLocaleString()} NET
          </h1>
        ) : (
          <h1 className="mb-4 mt-4 text-sm font-semibold">No Information</h1>
        )}
        <div className="relative w-full overflow-hidden rounded-lg">
          <VoucherCarousel images={image || []} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
