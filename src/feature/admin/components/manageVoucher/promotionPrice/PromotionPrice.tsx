import useVoucherStore from '@/stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

const PromotionPrice = () => {
  const { voucherById } = useVoucherStore();

  const [isEditing, setIsEditing] = useState(false);
  const [usePromotion, setUsePromotion] = useState(
    !!voucherById?.discount?.discountedPrice,
  );
  const [promotionValue, setPromotionValue] = useState(
    voucherById?.discount?.discountedPrice || 0,
  );

  useEffect(() => {
    if (voucherById?.discount) {
      setPromotionValue(voucherById.discount.discountedPrice);
      setUsePromotion(true);
    } else {
      setUsePromotion(false);
    }
  }, [voucherById?.discount]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (voucherById) {
      // updateVoucher(voucherId, {
      //   promotionPrice: usePromotion ? promotionValue : undefined,
      // });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPromotionValue(voucherById?.discount?.discountedPrice || 0);
    setUsePromotion(!!voucherById?.discount?.discountedPrice);
    setIsEditing(false);
  };

  if (!voucherById) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Promotion Price</h1>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-1 text-basicGray"
          >
            <span className="flex items-center">
              <Pencil className="h-4 w-4" />
              <p>Edit</p>
            </span>
          </button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <span
              onClick={handleSave}
              className="cursor-pointer text-primary hover:underline"
            >
              Save
            </span>
            |
            <span
              onClick={handleCancel}
              className="cursor-pointer text-red-500 hover:underline"
            >
              Cancel
            </span>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={usePromotion}
              className="flex h-5 w-5 appearance-none items-center justify-center rounded-md border-2 border-gray-400 text-center before:text-sm before:text-white before:opacity-0 before:content-['✔'] checked:border-[#006838] checked:bg-[#006838] checked:before:opacity-100"
              onChange={(e) => setUsePromotion(e.target.checked)}
            />
            Use Promotion Price
          </label>

          {usePromotion && (
            <div className="flex gap-1">
              <input
                type="number"
                className="flex-grow rounded-full bg-[#D9D9D9] px-4"
                value={promotionValue}
                onChange={(e) => setPromotionValue(Number(e.target.value))}
              />
              <button
                className="rounded-full bg-[#D9D9D9] px-4 py-2 hover:bg-[#b4b4b4]"
                onClick={handleSave}
              >
                Net Price
              </button>
            </div>
          )}
        </div>
      ) : voucherById?.discount?.discountedPrice ? (
        <h2>
          THB {voucherById?.discount?.discountedPrice.toLocaleString()} NET
        </h2>
      ) : (
        <h2 className="italic text-gray-400">No Promotion Price</h2>
      )}
    </div>
  );
};

export default PromotionPrice;
