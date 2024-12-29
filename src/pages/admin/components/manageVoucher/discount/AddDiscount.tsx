import useVoucherStore from '@/stores/voucher-store';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddDiscount = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');

  const [promotionName, setPromotionName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [newValue, setNewValue] = useState<number>(0);

  const { updateVoucher } = useVoucherStore();

  const handleAddPromotion = () => {
    updateVoucher(voucherId, {
      promotion: [
        ...(useVoucherStore.getState().vouchers.find((v) => v.id === voucherId)
          ?.promotion || []),
        {
          name: promotionName,
          price: newValue,
          startDate,
          endDate,
        },
      ],
    });

    setPromotionName('');
    setStartDate('');
    setEndDate('');
    setNewValue(0);
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <h1>Promotion Name</h1>
      <input
        type="text"
        placeholder="Promotion name"
        value={promotionName}
        onChange={(e) => setPromotionName(e.target.value)}
        className="rounded-full border border-[#888888] bg-[#F7F3ED] p-2"
      />

      <div className="flex gap-5">
        <div className="flex w-1/2 flex-col gap-2">
          <h1>Start Date and Time</h1>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-full bg-[#D9D9D9] p-2"
          />
        </div>
        <div className="flex w-1/2 flex-col gap-2">
          <h1>End Date and Time</h1>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-full bg-[#D9D9D9] p-2"
          />
        </div>
      </div>

      <div>
        <h1>Promotion Price</h1>
        <div className="flex gap-1">
          <input
            type="number"
            className="flex-grow rounded-full bg-[#D9D9D9] px-4"
            value={newValue}
            onChange={(e) => setNewValue(Number(e.target.value))}
          />
          <button className="rounded-full bg-[#D9D9D9] px-4 py-2">
            Set Price
          </button>
        </div>
      </div>

      <button
        className="w-full rounded-full bg-[#2BB673] py-2 text-white hover:bg-[#249d5d]"
        onClick={handleAddPromotion}
      >
        Add Promotion
      </button>
    </div>
  );
};

export default AddDiscount;
