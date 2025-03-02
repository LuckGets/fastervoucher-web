import { ObjectHelper } from '@/utils/object-helper/object-helper';
import VoucherCarousel from './VoucherCarousel';
import {
  CreateVoucherData,
  ImageWithPreviewSrcType,
} from '@/stores/voucher-store';

interface VoucherCostProps {
  voucher: CreateVoucherData;
}

const VoucherCost: React.FC<VoucherCostProps> = ({ voucher }) => {
  const { title, price, restaurantName, discountedPrice, mainImg, otherImgs } =
    voucher;

  const previewImages: ImageWithPreviewSrcType[] = [];

  if (
    !ObjectHelper.isObjectEmpty(mainImg) &&
    mainImg.srcFile instanceof File &&
    mainImg.srcStr
  )
    previewImages.push(mainImg);

  if (otherImgs && otherImgs.length > 0) previewImages.push(...otherImgs);

  return (
    <div className="flex gap-4">
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-lg font-bold text-gray-800">
          {title || 'No Information'}
        </h1>
        <h2 className="mt-1 text-sm text-gray-500">
          {restaurantName || 'No Information'}
        </h2>
        {discountedPrice && discountedPrice > 0 ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {discountedPrice.toLocaleString()} NET
          </h1>
        ) : price !== undefined ? (
          <h1 className="mb-4 mt-4 text-sm font-semibold">
            THB {price.toLocaleString()} NET
          </h1>
        ) : (
          <h1 className="mb-4 mt-4 text-sm font-semibold">No Information</h1>
        )}
        <div className="relative w-full overflow-hidden rounded-lg">
          <VoucherCarousel images={previewImages} />
        </div>
      </div>
    </div>
  );
};

export default VoucherCost;
