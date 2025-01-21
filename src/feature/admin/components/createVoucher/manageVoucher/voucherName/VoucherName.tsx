/* eslint-disable react/prop-types */
import Input from './Input';

interface VoucherNameProps {
  name: string;
  passcode?: string;
  onChange: (field: string, value: string) => void;
}

const VoucherName: React.FC<VoucherNameProps> = ({
  name,
  passcode,
  onChange,
}) => {
  return (
    <div className="flex w-[90%] flex-col gap-6 rounded-2xl border border-[#888888] p-6 px-8">
      <Input
        inputInfo={{
          info: name,
          label: 'Voucher Name',
        }}
        onSave={(value) => onChange('name', value)}
      />
      <Input
        inputInfo={{
          info: passcode || 'No passcode',
          label: 'Voucher Passcode',
        }}
        onSave={(value) => onChange('passcode', value)}
      />
    </div>
  );
};

export default VoucherName;
