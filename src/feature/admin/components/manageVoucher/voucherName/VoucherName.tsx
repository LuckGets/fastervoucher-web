import useVoucherStore from '../../../../../stores/voucher-store';
import Input from './Input';

const VoucherName = () => {
  const { voucherById } = useVoucherStore();

  const handleSaveVoucherName = (newName: string) => {
    if (voucherById) {
      // updateVoucher(voucher.id, { name: newName });
      console.log('newName :>> ', newName);
    }
  };

  const handleSaveVoucherPasscode = (newPasscode: string) => {
    if (voucherById) {
      // updateVoucher(voucher.id, { passcode: newPasscode });
      console.log('newPasscode :>> ', newPasscode);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl">
      {voucherById && (
        <>
          <Input
            inputInfo={{
              info: voucherById?.title,
              label: 'Voucher Name',
            }}
            onSave={handleSaveVoucherName}
          />
          <Input
            inputInfo={{
              info: voucherById?.passcode || 'No passcode',
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
