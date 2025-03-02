import { CreatePackageQuotaVoucherData } from '@/stores/voucher-store';
import { Trash2 } from 'lucide-react';

interface SelectedQuotaVoucherProps {
  voucher: CreatePackageQuotaVoucherData;
  handleQuantityChange: (
    value: CreatePackageQuotaVoucherData['amount'],
  ) => void;
  handleRemoveVoucher: () => void;
}

const SelectedQuotaVoucher: React.FC<SelectedQuotaVoucherProps> = ({
  voucher,
  handleQuantityChange,
  handleRemoveVoucher,
}) => {
  return (
    <>
      <div>{voucher.title}</div>
      <div className="flex w-1/6">
        <input
          type="number"
          value={voucher.amount || ''}
          min="1"
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
          className="w-full rounded-full border bg-[#E1E1E1] p-2 pl-6"
        />
        <div onClick={handleRemoveVoucher} className="cursor-pointer">
          <Trash2 />
        </div>
      </div>
    </>
  );
};
export default SelectedQuotaVoucher;
