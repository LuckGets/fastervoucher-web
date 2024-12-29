import useVoucherStore from '@/stores/voucher-store';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const VoucherPrice = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [newValue, setNewValue] = useState(voucher?.price || 0);

  const handlePriceChange = () => {
    if (voucher) {
      updateVoucher(voucherId, { price: newValue });
    }
  };

  if (!voucher) {
    return <div>Voucher not found</div>;
  }

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
          Net Price
        </button>
      </div>
    </div>
  );
};

export default VoucherPrice;
