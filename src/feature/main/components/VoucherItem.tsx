import {
  DiscountStatusEnum,
  VoucherDataSchema,
} from '@/data-schema/voucher.type';
import { FC } from 'react';

interface VoucherItemProps {
  voucher: VoucherDataSchema;
  handleOnClick: (id: VoucherDataSchema['id']) => void;
}

const VoucherItem: FC<VoucherItemProps> = ({ voucher, handleOnClick }) => {
  const defaultStockAmountWarningNumber: number = 20;
  const mainImg = voucher.img[0].imgPath;
  return (
    <div
      key={voucher.id}
      onClick={() => handleOnClick(voucher.id)}
      className="cursor-pointer rounded-xl p-2 active:bg-[#0000003a]"
    >
      <img
        src={mainImg || '/placeholder-image.png'}
        alt={voucher.title}
        className="h-[250px] w-[250px] rounded-2xl object-cover"
      />
      <h1 className="mt-2 truncate text-sm md:text-lg">{voucher.title}</h1>
      <div className="flex items-center">
        {voucher.discount &&
        voucher.discount.status === DiscountStatusEnum.ACTIVE ? (
          <>
            <h2 className="text-[11px] text-gray-500 line-through md:text-sm">
              THB {voucher.price} ++
            </h2>
            <span className="ml-2 text-[11px] text-red-500 md:text-sm">
              THB {voucher.discount.discountedPrice.toLocaleString()} NET
            </span>
          </>
        ) : (
          <h2 className="text-xs text-gray-500 md:text-sm">
            THB {voucher.price.toLocaleString()} ++
          </h2>
        )}
      </div>
      {voucher?.stockAmount !== undefined &&
        voucher?.stockAmount !== null &&
        voucher?.stockAmount < defaultStockAmountWarningNumber && (
          <p className="mt-2 text-[10px] text-red-500 md:text-xs">
            Only {voucher.stockAmount} left!
          </p>
        )}
    </div>
  );
};

export default VoucherItem;
