import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddDiscount from './AddDiscount';
import PromotionItem from './PromotionItem';
import useVoucherStore from '../../../../../stores/voucher-store';

const CreateDiscount = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = id || '0';
  const { vouchers } = useVoucherStore();
  const [showAddDiscount, setShowAddDiscount] = useState(false);

  const voucher = vouchers.find((v) => v.id === voucherId);

  const handleAddDiscountClick = () => {
    setShowAddDiscount(true);
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <div className="flex justify-between">
        <h1>Create discount</h1>
        <button
          className="flex items-center gap-1 text-[#2BB673]"
          onClick={handleAddDiscountClick}
        >
          <Plus className="h-4 w-4" />
          <h1>Add discount</h1>
        </button>
      </div>
      {showAddDiscount && <AddDiscount />}

      {voucher &&
      Array.isArray(voucher.discount) &&
      voucher.discount.length > 0 ? (
        <div className="mt-2 rounded-xl bg-[#E1E1E1] p-2">
          {voucher.discount.map((promo, index) => (
            <PromotionItem
              key={index}
              promo={promo}
              index={index}
              voucherId={voucherId}
            />
          ))}
        </div>
      ) : (
        <p>No promotions available for this voucher.</p>
      )}
    </div>
  );
};

export default CreateDiscount;
