import { CreateVoucherDataSchema } from '@/data-schema/voucher.type';
import { useState } from 'react';
import Swal from 'sweetalert2';

interface VoucherPriceProps {
  price: number;
  promotionPrice: number | undefined;
  onChange: (
    field: keyof Pick<CreateVoucherDataSchema, 'price' | 'discountedPrice'>,
    value: number,
  ) => void;
  onDeletePromotionField: () => void;
}

const VoucherPrice: React.FC<VoucherPriceProps> = ({
  price,
  promotionPrice,
  onChange,
  onDeletePromotionField,
}) => {
  const [newValue, setNewValue] = useState(price || 0);
  const [promoValue, setPromoValue] = useState(promotionPrice || 0);
  const [hasPromotion, setHasPromotion] = useState((promotionPrice ?? 0) > 0);

  const handlePriceChange = () => {
    if (newValue > 0) {
      onChange('price', newValue);
      Swal.fire({
        icon: 'success',
        title: 'Price Updated!',
        text: `Normal price set to ${newValue}`,
        confirmButtonColor: '#006838',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Price',
        text: 'Please enter a valid price',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handlePromoChange = () => {
    if (promoValue > 0 && promoValue < newValue) {
      onChange('discountedPrice', promoValue);
      Swal.fire({
        icon: 'success',
        title: 'Promotion Price Updated!',
        text: `Promotion price set to ${promoValue}`,
        confirmButtonColor: '#006838',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Promotion Price',
        text:
          promoValue > 0
            ? 'Promotion price must be lower than the normal price'
            : 'Promotion price should not be zero.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Normal Price</h1>
      <div className="flex gap-1">
        <input
          type="number"
          className="flex-grow rounded-full bg-[#D9D9D9] px-4"
          value={newValue}
          onChange={(e) => setNewValue(Number(e.target.value))}
        />
        <button
          className="rounded-full bg-[#D9D9D9] px-4 py-2 hover:bg-[#b4b4b4]"
          onClick={handlePriceChange}
        >
          Set Price
        </button>
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={hasPromotion}
          onChange={(e) => {
            setHasPromotion(e.target.checked);
            if (!e.target.checked) {
              setPromoValue(0);
              onDeletePromotionField();
            }
          }}
          className="flex h-5 w-5 appearance-none items-center justify-center rounded-md border-2 border-gray-400 text-center before:text-sm before:text-white before:opacity-0 before:content-['✔'] checked:border-[#006838] checked:bg-[#006838] checked:before:opacity-100"
        />
        Promotion Price
      </label>

      {hasPromotion && (
        <div className="flex gap-1">
          <input
            type="number"
            className="flex-grow rounded-full bg-[#D9D9D9] px-4"
            value={promoValue}
            onChange={(e) => setPromoValue(Number(e.target.value))}
          />
          <button
            className="rounded-full bg-[#D9D9D9] px-4 py-2 hover:bg-[#b4b4b4]"
            onClick={handlePromoChange}
          >
            Set Price
          </button>
        </div>
      )}
    </div>
  );
};

export default VoucherPrice;
