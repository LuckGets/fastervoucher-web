import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import useVoucherStore from '../../../../../stores/voucher-store';

interface Promotion {
  name: string;
  price: number;
  startDate?: string;
  endDate?: string;
}

interface PromotionItemProps {
  promo: Promotion;
  index: number;
  voucherId: string;
}

const PromotionItem: React.FC<PromotionItemProps> = ({
  promo,
  index,
  voucherId,
}) => {
  const { vouchers } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const [isEditing, setIsEditing] = useState(false);
  const [editedPromo, setEditedPromo] = useState<Promotion>({
    ...promo,
    startDate: promo.startDate || '',
    endDate: promo.endDate || '',
  });

  const handleSaveClick = () => {
    if (voucher) {
      const updatedPromotions = [...(voucher?.discount?.discountedPrice || 0)];
      updatedPromotions[index] = {
        ...editedPromo,
        startDate: editedPromo.startDate || '',
        endDate: editedPromo.endDate || '',
      };
      // updateVoucher(voucherId, { promotion: updatedPromotions });
    }
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (voucher) {
      const filteredPromotions = (voucher?.promotion || []).filter(
        (_, i) => i !== index,
      );
      updateVoucher(voucherId, { promotion: filteredPromotions });
    }
  };

  return (
    <div className="mb-2 flex flex-col gap-2 border-b pb-2">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          {/* Promotion Name */}
          <input
            type="text"
            value={editedPromo.name}
            onChange={(e) =>
              setEditedPromo({ ...editedPromo, name: e.target.value })
            }
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
            placeholder="Promotion Name"
          />
          {/* Price */}
          <input
            type="number"
            value={editedPromo.price}
            onChange={(e) =>
              setEditedPromo({
                ...editedPromo,
                price: parseFloat(e.target.value),
              })
            }
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
            placeholder="Price"
          />
          {/* Start Date */}
          <input
            type="datetime-local"
            value={editedPromo.startDate ?? ''}
            onChange={(e) =>
              setEditedPromo({
                ...editedPromo,
                startDate: e.target.value || '',
              })
            }
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
          />
          {/* End Date */}
          <input
            type="datetime-local"
            value={editedPromo.endDate ?? ''}
            onChange={(e) =>
              setEditedPromo({
                ...editedPromo,
                endDate: e.target.value || '',
              })
            }
            className="w-full rounded-full bg-[#D9D9D9] p-4 px-2 py-1"
          />
          {/* Save and Cancel Buttons */}
          <div className="flex gap-2">
            <button
              className="rounded bg-[#2BB673] px-4 py-1 text-white"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="rounded bg-red-500 px-4 py-1 text-white"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="font-medium">{promo.name}</p>
            <div className="flex gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#cccccc]">
                <Pencil
                  className="cursor-pointer text-[#888888]"
                  onClick={() => setIsEditing(true)}
                />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#cccccc]">
                <Trash2
                  className="cursor-pointer text-[#888888]"
                  onClick={handleDeleteClick}
                />
              </div>
            </div>
          </div>
          <p>Price: {promo.price} THB</p>
          <div className="flex gap-5 text-sm">
            <p>
              Start:{' '}
              {promo.startDate
                ? new Date(promo.startDate).toLocaleDateString()
                : 'N/A'}
            </p>
            <p>
              End:{' '}
              {promo.endDate
                ? new Date(promo.endDate).toLocaleDateString()
                : 'N/A'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionItem;
