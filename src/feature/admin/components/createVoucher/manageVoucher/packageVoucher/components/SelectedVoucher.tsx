import InputFileType from '@/components/InputFileType';
import { CreatePackageSelectedVoucherData } from '@/stores/voucher-store';
import NullableType from '@/utils/types/nullable.type';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface SelectedVoucherProps {
  voucher: CreatePackageSelectedVoucherData;
  handleQuantityChange: (
    value: CreatePackageSelectedVoucherData['amount'],
  ) => void;
  handleRemoveVoucher: () => void;
  handleEditVoucherImg: NullableType<(file: File) => void>;
}

const SelectedVoucher: React.FC<SelectedVoucherProps> = ({
  voucher,
  handleQuantityChange,
  handleRemoveVoucher,
  handleEditVoucherImg,
}) => {
  const handleCalculateFromAmount = (operation: 'plus' | 'minus') => {
    let currAmount = voucher.amount;
    switch (operation) {
      case 'plus':
        handleQuantityChange(++currAmount);
        break;
      case 'minus':
        handleQuantityChange(--currAmount);
    }
  };

  const previewImg =
    voucher.previewImg?.srcFile instanceof File
      ? voucher.previewImg.srcStr
        ? voucher.previewImg.srcStr
        : voucher.img
      : voucher.img;

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 bg-[#E1E1E1] px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`group relative h-20 w-20 rounded-md object-cover hover:bg-gray-400 ${
            handleEditVoucherImg
              ? 'cursor-pointer transition duration-200 ease-in-out group-hover:opacity-50'
              : ''
          }`}
        >
          {handleEditVoucherImg && (
            <label className="absolute inset-0 cursor-pointer">
              <InputFileType
                className="z-50 h-full w-full opacity-0"
                onChange={handleEditVoucherImg}
              />
              <Plus className="absolute right-3 top-2 z-10 hidden h-6 w-6 text-white group-hover:flex" />
            </label>
          )}
          <img
            src={previewImg}
            alt={voucher.title}
            className={`-z-10 h-full w-full rounded-md object-cover ${
              handleEditVoucherImg
                ? 'transition duration-200 ease-in-out group-hover:opacity-50'
                : ''
            }`}
          />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-800">
            {voucher.title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Plus onClick={() => handleCalculateFromAmount('plus')} />
        <input
          type="number"
          value={voucher.amount || ''}
          min="1"
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-16 rounded-full bg-white py-1 text-center outline-none"
        />
        <Minus onClick={() => handleCalculateFromAmount('minus')} />
      </div>

      <button
        onClick={handleRemoveVoucher}
        className="text-gray-400 transition-colors hover:text-black"
      >
        <Trash2 />
      </button>
    </div>
  );
};
export default SelectedVoucher;
