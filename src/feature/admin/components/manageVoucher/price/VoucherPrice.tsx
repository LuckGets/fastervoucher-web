import useVoucherStore from '../../../../../stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

const VoucherPrice = () => {
  const { voucherById } = useVoucherStore();

  const [newValue, setNewValue] = useState(voucherById?.price || 0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (voucherById?.price) {
      setNewValue(voucherById.price);
    }
  }, [voucherById?.price]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (voucherById) {
      // updateVoucher(voucherId, { price: newValue });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewValue(voucherById?.price || 0);
    setIsEditing(false);
  };

  if (!voucherById) {
    return <div>Voucher not found</div>;
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Normal Price</h1>
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
        <h2>THB {voucherById.price.toLocaleString()} NET</h2>
      )}
    </div>
  );
};

export default VoucherPrice;
