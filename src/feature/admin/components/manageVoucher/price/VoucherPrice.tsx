import useVoucherStore from '@/stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VoucherPrice = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [newValue, setNewValue] = useState(voucher?.price || 0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (voucher?.price) {
      setNewValue(voucher.price);
    }
  }, [voucher?.price]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (voucher) {
      updateVoucher(voucherId, { price: newValue });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewValue(voucher?.price || 0);
    setIsEditing(false);
  };

  if (!voucher) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="front-semi">Normal Price</h1>
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
        <div className="flex gap-1">
          <input
            type="number"
            className="flex-grow rounded-full bg-[#D9D9D9] px-4"
            value={newValue}
            onChange={(e) => setNewValue(Number(e.target.value))}
          />
          <button
            className="rounded-full bg-[#D9D9D9] px-4 py-2 hover:bg-[#b4b4b4]"
            onClick={handleSave}
          >
            Net Price
          </button>
        </div>
      ) : (
        <h2>THB {voucher.price.toLocaleString()} NET</h2>
      )}
    </div>
  );
};

export default VoucherPrice;
