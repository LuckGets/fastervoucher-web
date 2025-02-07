import {
  DiscountStatusEnum,
  VoucherDataSchema,
} from '@/data-schema/voucher.type';
import React from 'react';

interface VoucherItemProps {
  voucher: VoucherDataSchema;
  handleVoucherClick: (id: VoucherDataSchema['id']) => void;
}

const VoucherItem: React.FC<VoucherItemProps> = ({
  voucher,
  handleVoucherClick,
}) => {
  const mainImg = voucher.img.filter((item) => item.mainImg)[0]?.imgPath;

  return (
    <div
      key={voucher.id}
      onClick={() => handleVoucherClick(voucher.id)}
      className="cursor-pointer rounded-xl p-2 active:bg-[#0000003a]"
    >
      <img
        src={mainImg || '/placeholder-image.png'}
        alt={voucher.title}
        width={250}
        height={250}
        className="h-[250px] w-[250px] rounded-2xl object-cover"
      />
      <h1 className="mt-2 truncate text-sm md:text-lg">{voucher.title}</h1>
      <div>
        <h2 className="text-xs text-gray-500 md:text-sm">{voucher.category}</h2>
        <div className="flex gap-2">
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
      </div>
    </div>
  );
};

export default VoucherItem;
