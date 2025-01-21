import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddDiscount from './AddDiscount';

interface Discount {
  name: string;
  price: number;
  startDate: string;
  endDate: string;
}

type OnChangeValue = Discount[];

interface CreateDiscountProps {
  promotion: Discount[];
  onChange: (field: string, value: OnChangeValue) => void;
}

const CreateDiscount = ({ promotion, onChange }: CreateDiscountProps) => {
  const [showAddDiscount, setShowAddDiscount] = useState(false);

  const handleAddDiscount = (newDiscount: Discount) => {
    const updatedPromotions = [...promotion, newDiscount];
    onChange('promotion', updatedPromotions);
    setShowAddDiscount(false);
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <div className="flex justify-between">
        <h1>Create Discounts</h1>
        <button
          className="flex items-center gap-1 text-[#2BB673]"
          onClick={() => setShowAddDiscount(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Add Discount</span>
        </button>
      </div>

      {promotion.length > 0 && (
        <ul className="list-disc pl-5">
          {promotion.map((discount, index) => (
            <li key={index}>
              {discount.name} - ${discount.price} (From {discount.startDate} to{' '}
              {discount.endDate})
            </li>
          ))}
        </ul>
      )}

      {showAddDiscount && <AddDiscount onAdd={handleAddDiscount} />}
    </div>
  );
};

export default CreateDiscount;
