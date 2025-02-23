import useVoucherStore from '../../../../../stores/voucher-store';
import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';

const StockAmount = () => {
  const { voucherById } = useVoucherStore();

  const [newValue, setNewValue] = useState<string>(
    voucherById?.stockAmount?.toString() || '',
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (voucherById) {
      setNewValue(voucherById.stockAmount?.toString() || '');
    }
  }, [voucherById]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (voucherById && newValue !== '') {
      const updatedStockAmount = parseInt(newValue, 10);
      if (!isNaN(updatedStockAmount)) {
        // updateVoucher(voucherId, { stockAmount: updatedStockAmount });
      }
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewValue(voucherById?.stockAmount?.toString() || '');
    setIsEditing(false);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Stock amount</h1>
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
      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            type="number"
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
        ) : (
          <h1 className="">{newValue}</h1>
        )}
      </div>
    </div>
  );
};

export default StockAmount;
