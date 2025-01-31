import useVoucherStore from '@/stores/voucher-store';
import Input from './Input';
import { useParams } from 'react-router-dom';

const VoucherName = () => {
  const { id } = useParams<{ id: string }>();
  const voucherId = parseInt(id || '0');
  const { vouchers, updateVoucher } = useVoucherStore();
  const voucher = vouchers.find((v) => v.id === voucherId);

  const handleSaveVoucherName = (newName: string) => {
    if (voucher) {
      updateVoucher(voucher.id, { name: newName });
    }
  };

  const handleSaveVoucherPasscode = (newPasscode: string) => {
    if (voucher) {
      updateVoucher(voucher.id, { passcode: newPasscode });
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl">
      {voucher && (
        <>
          <Input
            inputInfo={{
              info: voucher.name,
              label: 'Voucher Name',
            }}
            onSave={handleSaveVoucherName}
          />
          <Input
            inputInfo={{
              info: voucher.passcode || 'No passcode',
              label: 'Voucher Passcode',
            }}
            onSave={handleSaveVoucherPasscode}
          />
        </>
      )}
    </div>
  );
};

export default VoucherName;
