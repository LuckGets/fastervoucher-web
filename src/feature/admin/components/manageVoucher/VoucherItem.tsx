import { ProductDiscountEnum } from '../../../../data-schema/product.type';
import { VoucherDataSchema } from '../../../../data-schema/voucher.type';
import React, { useState } from 'react';

interface VoucherItemProps {
  voucher: VoucherDataSchema;
  handleVoucherClick: (id: VoucherDataSchema['id']) => void;
}

const VoucherItem: React.FC<VoucherItemProps> = ({
  voucher,
  handleVoucherClick,
}) => {
  const mainImg = voucher?.images?.find((item) => item.mainImg)?.imgPath;
  const [voucherStatus, setVoucherStatus] = useState(
    voucher?.status === 'ACTIVE',
  );

  // Toggle function
  const toggleVoucherStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVoucherStatus(event.target.checked);
  };

  return (
    <div className="relative cursor-pointer rounded-xl p-2 active:bg-[#0000003a]">
      {/* Toggle Switch on Top Right of Image */}
      <div className="absolute right-5 top-4 z-10">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={voucherStatus}
            onChange={toggleVoucherStatus}
            className="peer sr-only"
          />
          <div className="h-6 w-11 rounded-full bg-gray-200 before:absolute before:left-[2px] before:top-[2px] before:h-5 before:w-5 before:rounded-full before:border before:bg-gray-500 before:transition-all peer-checked:bg-green-500 peer-checked:before:translate-x-full peer-checked:before:bg-white peer-focus:ring-2"></div>
        </label>
      </div>

      <img
        src={mainImg || '/placeholder-image.png'}
        alt={voucher.title}
        width={250}
        height={250}
        className="h-[250px] w-[250px] rounded-2xl object-cover"
      />

      <h1
        onClick={() => handleVoucherClick(voucher.id)}
        className="mt-2 cursor-pointer truncate text-sm hover:underline md:text-lg"
      >
        {voucher.title}
      </h1>

      <div>
        <div className="flex gap-2">
          {voucher?.discount?.status === ProductDiscountEnum.ACTIVE ? (
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
