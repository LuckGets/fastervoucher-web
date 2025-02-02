/* eslint-disable react/prop-types */
import useVoucherStore from '@/stores/voucher-store';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface VoucherTypesProps {
  voucherType: 'single' | 'package';
  onChange: (value: 'single' | 'package') => void;
  onPackageChange: (data: {
    package?: { id: number; name: string; quantity: number }[];
    freeVoucher?: { id: number; name: string; quantity: number }[];
  }) => void;
}

const VoucherTypes: React.FC<VoucherTypesProps> = ({
  voucherType,
  onChange,
  onPackageChange,
}) => {
  const { vouchers } = useVoucherStore();
  const [selectedVoucher, setSelectedVoucher] = useState<{
    id: number;
    quantity: number;
  } | null>(null);
  const [freeVoucher, setFreeVoucher] = useState<{
    id: number;
    quantity: number;
  } | null>(null);
  const [isVoucherAdded, setIsVoucherAdded] = useState(false);

  const handleVoucherSelection = (voucherId: number) => {
    const selected = vouchers.find((voucher) => voucher.id === voucherId);
    setSelectedVoucher(selected ? { id: selected.id, quantity: 1 } : null);
  };
  console.log('isVoucherAdded :>> ', isVoucherAdded);

  const handleQuantityChange = (quantity: number, isFreeVoucher: boolean) => {
    if (isFreeVoucher && freeVoucher) {
      const updatedFreeVoucher = { ...freeVoucher, quantity };
      setFreeVoucher(updatedFreeVoucher);

      onPackageChange({
        freeVoucher: [
          {
            id: updatedFreeVoucher.id,
            name: getVoucherName(updatedFreeVoucher.id),
            quantity: updatedFreeVoucher.quantity,
          },
        ],
      });
    } else if (selectedVoucher) {
      const updatedVoucher = { ...selectedVoucher, quantity };
      setSelectedVoucher(updatedVoucher);

      onPackageChange({
        package: [
          {
            id: updatedVoucher.id,
            name: getVoucherName(updatedVoucher.id),
            quantity: updatedVoucher.quantity,
          },
        ],
      });
    }
  };

  const handleVoucherDelete = () => {
    setSelectedVoucher(null);
    onPackageChange({ package: [] });
  };

  const handleVoucherFreeDelete = () => {
    setFreeVoucher(null);
    onPackageChange({ freeVoucher: [] });
  };

  const handleAddFreeVoucher = () => {
    if (vouchers && vouchers.length > 0) {
      setFreeVoucher({ id: vouchers[0].id, quantity: 1 });
      setIsVoucherAdded(true);
    }
  };

  const handleFreeVoucherSelection = (voucherId: number) => {
    const selected = vouchers.find((voucher) => voucher.id === voucherId);
    const updatedFreeVoucher = selected
      ? { id: selected.id, quantity: 1 }
      : null;
    setFreeVoucher(updatedFreeVoucher);

    onPackageChange({
      freeVoucher: updatedFreeVoucher
        ? [
            {
              id: updatedFreeVoucher.id,
              name: getVoucherName(updatedFreeVoucher.id),
              quantity: updatedFreeVoucher.quantity,
            },
          ]
        : [],
    });
  };

  const getVoucherName = (voucherId: number) => {
    const voucher = vouchers.find((voucher) => voucher.id === voucherId);
    return voucher ? voucher.name : 'Unknown Voucher';
  };

  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <label className="text-lg font-medium">Select Voucher Type:</label>
      <div className="flex justify-between px-5">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="voucherType"
            value="single"
            checked={voucherType === 'single'}
            onChange={(e) => onChange(e.target.value as 'single' | 'package')}
            className="form-radio h-4 w-4 bg-[#D9D9D9] accent-[#006838]"
          />
          Single Voucher
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="voucherType"
            value="package"
            checked={voucherType === 'package'}
            onChange={(e) => onChange(e.target.value as 'single' | 'package')}
            className="form-radio h-4 w-4 bg-[#D9D9D9] accent-[#006838]"
          />
          Voucher Package
        </label>
      </div>

      {voucherType === 'package' && (
        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Add Vouchers to Package</label>
          <div className="mt-4 flex items-center gap-3">
            {vouchers && vouchers.length > 0 ? (
              <div className="w-5/6">
                <select
                  className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
                  onChange={(e) =>
                    handleVoucherSelection(Number(e.target.value))
                  }
                  value={selectedVoucher ? selectedVoucher.id : ''}
                >
                  <option value="" disabled>
                    Select Voucher
                  </option>
                  {vouchers.map((voucher) => (
                    <option key={voucher.id} value={voucher.id}>
                      {voucher.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-gray-500">No available vouchers</p>
            )}

            <div className="flex w-1/6">
              <input
                type="number"
                value={selectedVoucher?.quantity || ''}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(Number(e.target.value), false)
                }
                className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
              />
            </div>

            {selectedVoucher && (
              <div onClick={handleVoucherDelete} className="cursor-pointer">
                <Trash2 />
              </div>
            )}
          </div>
          {!freeVoucher && (
            <button
              onClick={handleAddFreeVoucher}
              className="flex w-full items-center justify-center gap-2 rounded-full border bg-[#E1E1E1] p-2 pl-7 text-[#888888]"
            >
              <Plus className="h-5 w-5" />
              Add Voucher Free
            </button>
          )}

          {freeVoucher && (
            <div>
              <label className="text-lg font-medium">Voucher Free</label>
              <div className="mt-4 flex items-center gap-3">
                <select
                  className="h-10 w-full rounded-full border bg-[#E1E1E1] pl-4"
                  onChange={(e) =>
                    handleFreeVoucherSelection(Number(e.target.value))
                  }
                  value={freeVoucher ? freeVoucher.id : ''}
                >
                  <option value="" disabled>
                    Select Voucher
                  </option>
                  {vouchers.map((voucher) => (
                    <option key={voucher.id} value={voucher.id}>
                      {voucher.name}
                    </option>
                  ))}
                </select>
                <div className="flex w-1/6">
                  <input
                    type="number"
                    value={freeVoucher?.quantity || ''}
                    min="1"
                    onChange={(e) =>
                      handleQuantityChange(Number(e.target.value), true)
                    }
                    className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
                  />
                </div>

                {freeVoucher && (
                  <div
                    onClick={handleVoucherFreeDelete}
                    className="cursor-pointer"
                  >
                    <Trash2 />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-2">
        {selectedVoucher && (
          <div className="flex justify-between text-[#888888]">
            <span>{getVoucherName(selectedVoucher.id)}</span>
            <span>X {selectedVoucher.quantity}</span>
          </div>
        )}

        {freeVoucher && (
          <div className="flex justify-between pt-2 text-[#888888]">
            <span>{getVoucherName(freeVoucher.id)}</span>
            <span>voucher free X {freeVoucher.quantity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoucherTypes;
